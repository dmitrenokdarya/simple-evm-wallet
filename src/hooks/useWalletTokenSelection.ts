/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';
import { useWallets } from '../context/wallets.context';
import type { WalletTokenItem } from '../types/wallets';
import { useWalletTokens } from './useWalletTokens';
import { NATIVE_CONTRACT } from '../constants/form/tokens-list.constants';
import { useWalletsTokenBalance } from './useWalletsTokenBalance';

type InitialTokenState = {
  tokenChain?: string;
  tokenAddress?: string;
} | null;

export const useWalletTokenSelection = (initialState?: InitialTokenState) => {
  const { wallets, selectedWallet } = useWallets();
  const [localSelectedWalletId, setLocalSelectedWalletId] = useState(
    selectedWallet?.id || wallets[0]?.id,
  );
  const [selectedToken, setSelectedToken] = useState<WalletTokenItem | null>(
    null,
  );

  //Текущий кошелёк
  const currentWallet = useMemo(
    () => wallets.find((w) => w.id === localSelectedWalletId) || selectedWallet,
    [wallets, localSelectedWalletId, selectedWallet],
  );

  //Загрузка данных ETH
  const { amount, price, isLoading } = useWalletTokens();
  const { data: walletsBalances } = useWalletsTokenBalance(
    wallets,
    selectedToken,
  );

  //Формируем массив токенов (один элемент — ETH)
  const items: WalletTokenItem[] = useMemo(() => {
    if (!currentWallet || !amount) return [];

    return [
      {
        chain: 'eth',
        contractAddress: NATIVE_CONTRACT,
        amount: amount,
        decimals: 18,
        symbol: 'ETH',
        name: 'Ethereum',
        price: price,
      },
    ];
  }, [currentWallet, amount, price]);

  // Выбор токена
  useEffect(() => {
    if (items.length > 0 && !selectedToken) {
      const initialToken =
        initialState?.tokenAddress && initialState?.tokenChain
          ? items.find(
              (it) =>
                it.contractAddress === initialState.tokenAddress &&
                it.chain === initialState.tokenChain,
            )
          : items[0];

      setSelectedToken(initialToken || items[0]);
    }
  }, [items, selectedToken, initialState]);

  const handleWalletSelect = (id: string) => {
    setLocalSelectedWalletId(id);
  };

  const handleTokenSelect = (token: WalletTokenItem) => {
    setSelectedToken(token);
  };

  return {
    wallets,
    currentWallet,
    selectedToken,
    items,
    isLoadingTokens: isLoading,
    walletsBalances, 
    handleWalletSelect,
    handleTokenSelect,
  };
};