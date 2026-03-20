import localforage from 'localforage';
import { decryptTextWithPassword, encryptTextWithPassword, type AesGcmEncrypted } from './password';
import type { AesGcmBox } from '../db/types';

const dekKeys = new Map<string, CryptoKey>();
const store = localforage.createInstance({ name: 'blackfort-wallet-store' });
const vaultKey = (profileId: string) => `vault:${profileId}:wrappedDEK:v1`;

//=================================================================================
//useEffect в CreateWallet для проверки хранилища и его состояния

//Проверка существования хранилища
export async function hasVault(profileId: string = 'guest'): Promise<boolean> {
  const payload = await store.getItem(vaultKey(profileId));
  return !!payload;
}

//Проверка разблокировки хранилища
export async function ensureVaultUnlocked(
  profileId: string = 'guest',
): Promise<boolean> {
  if (dekKeys.has(profileId)) return true;
  return restoreSessionDEK(profileId);
}

//Восстановление ключа из сессии
async function restoreSessionDEK(profileId: string): Promise<boolean> {
  if (dekKeys.has(profileId)) return true;
  const rawB64 = await sessionGet<string>(sessionDekKey(profileId));

  if (!rawB64) return false;
  try {
    const key = await importRawDEK(fromBase64(rawB64));
    dekKeys.set(profileId, key);
    return true;
  } catch {
    await sessionRemove(sessionDekKey(profileId));
    return false;
  }
}

//Запрос данных из sessionStorage
async function sessionGet<T>(key: string): Promise<T | null> {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

//Удаление данных из sessionStorage
async function sessionRemove(key: string): Promise<void> {
  sessionStorage.removeItem(key);
}

//Генерация ключа для sessionStorage
const sessionDekKey = (profileId: string) => `vault:${profileId}:sessionDEK:v1`;

//Превращение base64 в CryptoKey
async function importRawDEK(raw: Uint8Array): Promise<CryptoKey> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, true, [
    'encrypt',
    'decrypt',
  ]);
}

//Превращение base64 в бинарные данные
export function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}


//=================================================================================
//ensureVaultReady в CreateWallet для подготовки хранилища

//Расшифровка и подготавка ключа шифрования
export async function unlockVault(password: string, profileId: string = 'guest'): Promise<void> {
  const wrapped = await store.getItem<AesGcmEncrypted>(vaultKey(profileId));
  if (!wrapped) throw new Error('Vault is not initialized');
  const rawB64 = await decryptTextWithPassword(wrapped, password);
  const raw = fromBase64(rawB64);
  const key = await importRawDEK(raw);
  dekKeys.set(profileId, key);
  await persistSessionDEK(profileId, key);
}

//Экспорт CryptoKey в сырой формат, перевод в base64 и сохранение в sessionStorage
async function persistSessionDEK(profileId: string, key: CryptoKey): Promise<void> {
  const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key));
  await sessionSet(sessionDekKey(profileId), toBase64(raw));
}

//Сохранение значения в sessionStorage по ключу
async function sessionSet(key: string, value: string): Promise<void> {
  sessionStorage.setItem(key, value);
}

//Перевод Uint8Array в строку base64
export function toBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

////

//Генерация нового DEK, шифрование его мастер-паролем, сохранение в долговременное хранилище, в память и sessionStorage
export async function createVault(password: string, profileId: string = 'guest'): Promise<void> {
  const key = await generateDEK();
  const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key));
  const rawB64 = toBase64(raw);
  const wrapped = await encryptTextWithPassword(rawB64, password); 
  await store.setItem(vaultKey(profileId), wrapped);
  dekKeys.set(profileId, key);
  await persistSessionDEK(profileId, key);
}

//Генерирация случайного 256-битного AES-GCM ключа для шифрования данных
async function generateDEK(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}



////////////////

//Шифрование сид-фразы ключом из памяти
export async function encryptTextWithDEK(plaintext: string, profileId: string = 'guest'): Promise<AesGcmBox> {
  const key = await getDEKOrRestoreOrThrow(profileId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(plaintext);
  const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  const cipher = new Uint8Array(cipherBuf);
  return {
    algo: 'AES-GCM', version: 1, cipherB64: toBase64(cipher), ivB64: toBase64(iv),
  };
}

//Получаем ключ шифрования (DEK)
async function getDEKOrRestoreOrThrow(profileId: string = 'guest'): Promise<CryptoKey> {
  const inMemory = dekKeys.get(profileId);
  if (inMemory) return inMemory;
  const restored = await restoreSessionDEK(profileId);
  if (!restored) throw new Error('Vault is locked');
  const restoredKey = dekKeys.get(profileId);
  if (!restoredKey) throw new Error('Vault is locked');
  return restoredKey;
}