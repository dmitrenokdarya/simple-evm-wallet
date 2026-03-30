// export type FeeType = 'low' | 'average' | 'fast' | 'advanced';

import type { BxnFeeDTO } from "../services/api/blackfort-history-backend-api";

// export interface FeeData {
//   gasLimit: string;
//   gasPrice: string;
//   data?: string;
// }

export interface EvmTransactionFeesResponse {
  average: BxnFeeDTO;
  fast: BxnFeeDTO;
  low: BxnFeeDTO;
}

// export interface BtcTransactionFeesResponse {
//   average: BtcFeeDTO;
//   fast: BtcFeeDTO;
//   low: BtcFeeDTO;
// }

// export interface TronFeeDTO {
//   totalPrice: number;
// }

// export interface TronTransactionFeesResponse {
//   average: TronFeeDTO;
//   fast: TronFeeDTO;
//   low: TronFeeDTO;
// }

// export interface SolFeeDTO {
//   amount: number;
// }

// export interface SolTransactionFeesResponse {
//   average: SolFeeDTO;
//   fast: SolFeeDTO;
//   low: SolFeeDTO;
// }

// export interface XrpFeeDTO {
//   amount?: number;
//   gasLimit?: number;
//   gasPrice?: number;
//   totalPrice?: number;
// }

// export interface XrpTransactionFeesResponse {
//   average: XrpFeeDTO;
//   fast: XrpFeeDTO;
//   low: XrpFeeDTO;
// }

// export interface DotFeeDTO {
//   amount?: number;
//   gasLimit?: number;
//   gasPrice?: number;
//   totalPrice?: number;
// }

// export interface DotTransactionFeesResponse {
//   average: DotFeeDTO;
//   fast: DotFeeDTO;
//   low: DotFeeDTO;
// }

// export interface TonFeeDTO {
//   amount?: number;
//   gasLimit?: number;
//   gasPrice?: number;
//   totalPrice?: number;
// }

// export interface TonTransactionFeesResponse {
//   average: TonFeeDTO;
//   fast: TonFeeDTO;
//   low: TonFeeDTO;
// }

// export type TransactionFeesResponse = EvmTransactionFeesResponse
//   | BtcTransactionFeesResponse
//   | TronTransactionFeesResponse
//   | SolTransactionFeesResponse
//   | XrpTransactionFeesResponse
//   | DotTransactionFeesResponse
//   | TonTransactionFeesResponse;

// export interface CommonEditFeeModalProps<T extends TransactionFeesResponse> extends BaseModalType {
//   fees: T;
//   chain?: CHAIN;
//   initialFeeType: FeeType;
//   initialAdvancedData?: FeeData;
//   tokenSymbol: string;
//   tokenDecimals: number;
//   tokenPrice: number;
//   gasLimit?: string;
//   onSave: (type: FeeType, data?: FeeData) => void;
// }
