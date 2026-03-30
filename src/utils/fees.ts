import BigNumber from 'bignumber.js';
import type { EvmTransactionFeesResponse } from '../types/feeType';
import type { BxnFeeDTO } from '../services/api/blackfort-history-backend-api';

export const WEI_PRECISION = 18;
export const GWEI_PRECISION = 9;

/**
 * Calculates the fee in Wei (or the smallest unit of the chain) from gas limit and gas price.
 */
export const calculateFeeWei = (
  gasLimit: string | number,
  gasPriceWei: string | number,
  totalPrice?: number,
  decimals?: number,
): string => {
  if (totalPrice !== undefined && decimals !== undefined) {
    return new BigNumber(totalPrice).shiftedBy(decimals).toFixed(0);
  }
  return new BigNumber(gasLimit).multipliedBy(gasPriceWei).toFixed(0);
};

/**
 * Calculates the fee in the main token unit (e.g., ETH, BXN) from gas limit and gas price.
 */
export const calculateFeeToken = (
  gasLimit: string | number,
  gasPriceWei: string | number,
  decimals: number = WEI_PRECISION,
): string => {
  const feeWei = new BigNumber(gasLimit).multipliedBy(gasPriceWei);
  return feeWei.dividedBy(new BigNumber(10).pow(decimals)).toString();
};

/**
 * Converts Wei to Gwei.
 */
export const weiToGwei = (
  wei: string | number,
): string => new BigNumber(wei).dividedBy(new BigNumber(10).pow(GWEI_PRECISION)).toString();

/**
 * Converts Gwei to Wei.
 */
export const gweiToWei = (
  gwei: string | number,
): string => new BigNumber(gwei).multipliedBy(new BigNumber(10).pow(GWEI_PRECISION)).toFixed(0);

/**
 * Finds the price of a token for a given currency from its prices array.
 */
export const getTokenPrice = (prices?: Array<{ currency: string; price?: number }>, currency: string = 'usd'): number => prices?.find((p) => p.currency.toLowerCase() === currency.toLowerCase())?.price || 0;

/**
 * Gets the EVM fee object based on the selected fee type (low, average, fast).
 */
export const getEvmFeeByType = (fees: EvmTransactionFeesResponse, type: 'low' | 'average' | 'fast'): BxnFeeDTO => fees[type] || fees.fast;

// /**
//  * Gets the Tron fee object based on the selected fee type (low, average, fast).
//  */
// export const getTronFeeByType = (fees: TronTransactionFeesResponse, type: 'low' | 'average' | 'fast'): TronFeeDTO => fees[type] || fees.fast;

// /**
//  * Gets the Solana fee object based on the selected fee type (low, average, fast).
//  */
// export const getSolFeeByType = (fees: SolTransactionFeesResponse, type: 'low' | 'average' | 'fast'): SolFeeDTO => fees[type] || fees.fast;

// /**
//  * Gets the XRP fee object based on the selected fee type (low, average, fast).
//  */
// export const getXrpFeeByType = (fees: XrpTransactionFeesResponse, type: 'low' | 'average' | 'fast'): XrpFeeDTO => fees[type] || fees.fast;

export const getNativeTokenSymbol = (): string => {
  return 'ETH'; 
};

// export const getNativeTokenSymbol = (chain?: CHAIN): string => {
//   switch (chain) {
//     case CHAIN.ETH:
//       return 'ETH';
//     case CHAIN.BSC:
//       return 'BNB';
//     case CHAIN.BTC:
//       return 'BTC';
//     case CHAIN.TRON:
//       return 'TRON';
//     case CHAIN.POLYGON:
//       return getDisplaySymbol('MATIC');
//     case CHAIN.LTC:
//       return 'LTC';
//     case CHAIN.SOLANA:
//       return 'SOL';
//     case CHAIN.XRP:
//       return 'XRP';
//     case CHAIN.DOT:
//       return 'DOT';
//     case CHAIN.TON:
//       return 'TON';
//     case CHAIN.BXN:
//     default:
//       return 'BXN';
//   }
// };

export const getNativeTokenDecimals = (): number => {
  return 18;
};

// export const getNativeTokenDecimals = (chain?: CHAIN): number => {
//   switch (chain) {
//     case CHAIN.BTC:
//     case CHAIN.LTC:
//       return 8;
//     case CHAIN.TRON:
//       return 6;
//     case CHAIN.SOLANA:
//       return 9;
//     case CHAIN.XRP:
//       return 6;
//     case CHAIN.DOT:
//       return 10;
//     case CHAIN.TON:
//       return 9;
//     case CHAIN.ETH:
//     case CHAIN.BSC:
//     case CHAIN.BXN:
//     default:
//       return 18;
//   }
// };
