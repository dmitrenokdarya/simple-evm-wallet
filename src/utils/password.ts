import { fromBase64, toBase64 } from "./vault";

export interface KdfParams {
  name: 'PBKDF2';
  hash: 'SHA-256';
  iterations: number;
}

export interface AesGcmEncrypted {
  algo: 'AES-GCM';
  version: number;
  cipherB64: string;
  ivB64: string;
  saltB64: string;
  kdf: KdfParams;
}

//Расшифровка зашифрованных данных с помощью пароля, соли и iv
export async function decryptTextWithPassword(payload: AesGcmEncrypted, password: string): Promise<string> {
  const iv = fromBase64(payload.ivB64);
  const salt = fromBase64(payload.saltB64);
  const cipher = fromBase64(payload.cipherB64);
  const key = await deriveKey(password, salt, payload.kdf.iterations);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return textDecoder.decode(plainBuf);
}


//Создание ключа шифрования из пароля, соли и количества итераций (PBKDF2)
async function deriveKey(password: string, salt: Uint8Array, iterations: number): Promise<CryptoKey> {
  const pwKey = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      name: 'PBKDF2', hash: 'SHA-256', salt, iterations,
    },
    pwKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

//Генерирация случайныех iv и соли, создание ключа из пароля (PBKDF2) и шифрование данных
export async function encryptTextWithPassword(
  plaintext: string,
  password: string,
  iterations = 200_000,
): Promise<AesGcmEncrypted> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, salt, iterations);
  const data = textEncoder.encode(plaintext);
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data,
  );
  const cipher = new Uint8Array(cipherBuf);
  return {
    algo: 'AES-GCM',
    version: 1,
    cipherB64: toBase64(cipher),
    ivB64: toBase64(iv),
    saltB64: toBase64(salt),
    kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations },
  };
}
