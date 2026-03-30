import BigNumber from 'bignumber.js';
import historyApi from '../../services/api/history.api';
import type { EvmTransactionFeesResponse } from '../../types/feeType';
import type { EstimateFeeQueryInput } from './types';

interface EvmEstimateFeeParams {
  from: string;
  to: string;
  value: string;
  contractAddress?: string;
  data?: string;
  tokenId?: string;
  amount?: string | null;
}

export const estimateEvmFee = async ({
  wallet,
  token,
  to,
  amountWei,
  nftParams,
}: EstimateFeeQueryInput): Promise<EvmTransactionFeesResponse> => {
  let estimateFeeParams: EvmEstimateFeeParams = {
    from: wallet.address,
    to: to || wallet.address,
    value: amountWei || '0',
    contractAddress: token.contractAddress,
  };

  if (nftParams) {
    const isErc1155 = nftParams.type.toUpperCase().includes('1155');
    estimateFeeParams = {
      ...estimateFeeParams,
      data: '',
      value: new BigNumber(nftParams.amount).shiftedBy(token.decimals || 0).toFixed(0),
      tokenId: nftParams.tokenId,
      amount: isErc1155 ? nftParams.amount : null,
    };
  }

  const response = await historyApi.api.transactionsControllerGetTransactionFeesV1({
    chain: token.chain,
    estimateFeeParams: JSON.stringify(estimateFeeParams),
  });

  return response as unknown as EvmTransactionFeesResponse;
};
