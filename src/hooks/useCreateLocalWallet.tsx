import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { useCallback, useState } from 'react';
import { deriveEvmAddressFromMnemonic } from '../utils/evmAddress';
import { encryptTextWithDEK } from '../utils/vault';
import type { WalletRecord } from '../db/types';
import { saveWallet } from '../db/wallets';
import { useWallets } from '../context/wallets.context';

type CreateWalletOptions = {
  name?: string;
  iconId?: string;
};

export interface UseCreateLocalWalletResult {
  createWallet: (
    opts?: CreateWalletOptions,
  ) => Promise<{ record: WalletRecord; mnemonic: string }>;
  loading: boolean;
  error: string | null;
}

const normalizeMnemonic = (m: string) =>
  m.trim().toLowerCase().replace(/\s+/g, ' ');

export function useCreateLocalWallet(): UseCreateLocalWalletResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeProfileId = 'guest';
  const { setSelectedWalletId, fetchWallets } = useWallets();

  const createWallet = useCallback(async (opts?: CreateWalletOptions) => {
    setLoading(true);
    setError(null);
    try {
      const mnemonic = generateMnemonic(wordlist, 128); //Создание сид-фразы
      const evmAddress = await deriveEvmAddressFromMnemonic(mnemonic); //Создание адреса из сид-фразы
      const encryptedMnemonic = await encryptTextWithDEK(
        mnemonic,
        activeProfileId,
      ); //Шифруем сид-фразу ключом DEK

      //Генерируем уникальный ID для кошелька
      const id = crypto.randomUUID();

      //Формируем объект кошелька для сохранения
      const record: WalletRecord = {
        id,
        profileId: activeProfileId,
        type: 'evm',
        encryptedMnemonic,
        address: evmAddress,
        name: opts?.name || 'Wallet',
        iconId: opts?.iconId,
        seedBackedUp: false,
        createdAt: Date.now(),
      };

      //Сохраняем кошелёк в IndexedDB
      const savedId = await saveWallet(record);

      await fetchWallets();

      setSelectedWalletId(savedId);

      return { record, mnemonic };
    } catch (e) {
      setError((e as Error)?.message ?? 'Failed to create wallet');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [fetchWallets, setSelectedWalletId]);

  return { createWallet, loading, error };
}

export const MnemonicUtils = { normalizeMnemonic };
