import type { WalletRecord } from "../../db/types";
import type { WalletTokenItem } from "../../types/wallets";

export interface EstimateFeeQueryInput {
  wallet: WalletRecord;
  token: WalletTokenItem;
  to?: string;
  amountWei?: string;
  btcEstimateParams?: {
    inputsAmount: number;
    outputsAmount: number;
    size?: number;
  };
  nftParams?: {
    tokenId: string;
    amount: string;
    type: string;
  };
}
