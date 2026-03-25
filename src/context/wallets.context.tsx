/* eslint-disable react-hooks/set-state-in-effect */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  getWallet as dbGetWallet,
  markSeedBackedUp as dbMarkSeedBackedUp,
  saveWallet as dbSaveWallet,
  listWalletsByProfile,
} from '../db/wallets';
import type { WalletRecord } from '../db/types';

type WalletsContextValue = {
  wallets: WalletRecord[];
  selectedWalletId: string | null;
  selectedWallet: WalletRecord | null;
  setSelectedWalletId: (id: string) => void;
  fetchWallets: () => Promise<WalletRecord[]>;
  updateWallet: (
    id: string,
    update: Partial<Pick<WalletRecord, 'name' | 'iconId' | 'seedBackedUp'>>,
  ) => Promise<void>;
  markSeedBackedUp: (id: string) => Promise<void>;
};

const WalletsContext = createContext<WalletsContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = 'selected_wallet';

export const WalletsProvider = ({ children }: PropsWithChildren) => {
  const [wallets, setWallets] = useState<WalletRecord[]>([]);
  const [selectedWalletId, setSelectedWalletIdState] = useState<string | null>(
    () => {
      // Инициализация из localStorage
      if (typeof window !== 'undefined') {
        return localStorage.getItem(STORAGE_KEY);
      }
      return null;
    },
  );

  const setSelectedWalletId = useCallback((id: string) => {
    setSelectedWalletIdState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  // Загрузить все кошельки
  const fetchWallets = useCallback(async (): Promise<WalletRecord[]> => {
    try {
      // Здесь нужно получить список всех кошельков из IndexedDB
      const result = await listWalletsByProfile('guest');
      setWallets(result);
      return result;
    } catch (error) {
      console.error('Failed to fetch wallets:', error);
      return [];
    }
  }, []);

  // Загружаем кошельки при монтировании
  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  // Автовыбор кошелька, если нет выбранного
  useEffect(() => {
    if (!selectedWalletId && wallets.length > 0) {
      setSelectedWalletId(wallets[0].id);
    } else if (selectedWalletId && wallets.length > 0) {
      const exists = wallets.some((w) => w.id === selectedWalletId);
      if (!exists) {
        setSelectedWalletId(wallets[0].id);
      }
    }
  }, [selectedWalletId, wallets, setSelectedWalletId]);

  const updateWallet = useCallback(
    async (
      id: string,
      update: Partial<Pick<WalletRecord, 'name' | 'iconId'>>,
    ) => {
      const existing = await dbGetWallet(id);
      if (existing) {
        const updated = { ...existing, ...update };
        await dbSaveWallet(updated);
        await fetchWallets();
      }
    },
    [fetchWallets],
  );

  const markSeedBackedUp = useCallback(
    async (id: string) => {
      await dbMarkSeedBackedUp(id);
      await fetchWallets();
    },
    [fetchWallets],
  );

  const selectedWallet = useMemo(
    () => wallets.find((w) => w.id === selectedWalletId) || null,
    [wallets, selectedWalletId],
  );

  const value = useMemo<WalletsContextValue>(
    () => ({
      wallets,
      selectedWalletId,
      selectedWallet,
      setSelectedWalletId,
      fetchWallets,
      updateWallet,
      markSeedBackedUp,
    }),
    [
      wallets,
      selectedWalletId,
      selectedWallet,
      setSelectedWalletId,
      fetchWallets,
      updateWallet,
      markSeedBackedUp,
    ],
  );

  return (
    <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWallets = () => {
  const ctx = useContext(WalletsContext);
  if (!ctx) {
    throw new Error('useWallets must be used within WalletsProvider');
  }
  return ctx;
};

export type { WalletRecord };
