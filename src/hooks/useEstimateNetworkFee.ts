import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import type { WalletRecord } from '../db/types';
import type { WalletTokenItem } from '../types/wallets';
import { estimateEvmFee } from './transactions/estimateEvmFee';

export interface EstimateNetworkFeeProps {
  wallet?: WalletRecord | null;
  token: WalletTokenItem | null;
  to?: string;
  amountWei?: string;
  enabled?: boolean;
}

export const useEstimateNetworkFee = ({
  wallet,
  token,
  to,
  amountWei,
  enabled = true,
}: EstimateNetworkFeeProps) => {
  const { data: fees, isLoading } = useQuery({
    queryKey: [
      'estimateNetworkFee',
      token?.chain,
      wallet?.address,
      token?.contractAddress,
      to,
      amountWei,
    ],
    enabled: enabled && !!token && !!wallet && token.chain === 'eth',
    queryFn: async () => {
      const input = {
        wallet: wallet!,
        token: token!,
        to,
        amountWei,
      };

      return estimateEvmFee(input);
    },
    staleTime: 30000,
  });

  const estimatedFee = useMemo(() => {
    if (!fees || !token) return new BigNumber(0);
    
    const gasLimit = fees.fast?.gasLimit || 21000;
    const gasPrice = fees.fast?.gasPrice || fees.fast?.gasPrice || 0;
    return new BigNumber(gasLimit).multipliedBy(gasPrice);
  }, [fees, token]);

  return {
    fees,
    estimatedFee,
    isLoading,
  };
};