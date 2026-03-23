import { type ReactNode } from 'react';
import type { PriceWithCurrency } from '../services/api/blackfort-history-backend-api';

export type WalletTokenItem = {
  chain: 'eth';
  contractAddress: string; 
  symbol: string;
  name?: string;
  decimals: number;
  amount: string;
  prices?: PriceWithCurrency[];
  tokenIcon?: ReactNode | string;
  chainIcon?: ReactNode;
  usdAmount?: number;
  fiatAmount?: number;
  isDefault?: boolean;
  isAdded?: boolean;
  isHidden?: boolean;
};
