import { useQuery } from '@tanstack/react-query';
import type { WalletRecord } from '../db/types';
import type { WalletTokenItem } from '../types/wallets';
import historyApi from '../services/api/history.api';

export function useWalletsTokenBalance(
  wallets: WalletRecord[],
  token: WalletTokenItem | null,
) {
  const query = useQuery({
    queryKey: ['walletsTokenBalance', wallets.map((w) => w.id), token?.chain, token?.contractAddress],
    enabled: Boolean(wallets.length > 0 && token),
    queryFn: async () => {
      if (!token) return {};

      const data = wallets
        .filter((w) => w.address) 
        .map((w) => ({
          address: w.address,
          chain: token.chain,
          contractAddresses: [token.contractAddress],
        }));

      if (data.length === 0) return {};

      const fungible = await historyApi.api.tokensV2ControllerGetFungibleTokenListWithBalancesV2({ data });

      const balances: Record<string, string> = {};
      
      // Сопоставляем балансы с кошельками
      wallets.forEach((w, index) => {
        if (!w.address) return;
        
        const item = fungible?.data?.[index];
        if (item && item.amount) {
          balances[w.id] = item.amount;
        }
      });

      return balances;
    },
  });

  return query;
}