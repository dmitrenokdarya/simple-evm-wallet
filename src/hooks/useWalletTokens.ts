import { useQuery } from '@tanstack/react-query';
import { useWallets } from '../context/wallets.context';
import { useSettings } from '../context/settings.context';
import { historyApi, getPricesV2 } from '../services/api/history.api';
import { NATIVE_CONTRACT } from '../constants/form/tokens-list.constants';
import { calculateFiatAmount } from '../utils/amount';
import type { NewTokenWithPrice, PriceWithCurrency } from '../services/api/blackfort-history-backend-api';

export function useWalletTokens() {
  const { selectedWallet } = useWallets();
  const { currency } = useSettings();

  const query = useQuery({
    queryKey: ['walletTokens', selectedWallet?.id, currency],
    enabled: Boolean(selectedWallet?.address),
    queryFn: async () => {
      const walletAddress = selectedWallet?.address;
      
      if (!walletAddress) {
        return { totalFiat: 0, amount: '0', price: 0, change24h: 0 };
      }

      //Получаем баланс ETH
      const balanceResponse = await historyApi.api.tokensV2ControllerGetFungibleTokenListWithBalancesV2({
        data: [{
          address: walletAddress,
          chain: 'eth',
          contractAddresses: [NATIVE_CONTRACT],
        }],
      });

      const tokenData = balanceResponse?.data?.[0];
      const amount = tokenData?.amount || '0';
      const decimals = tokenData?.token?.decimals || 18;
      
      //Получаем цену ETH через getPricesV2
      const priceResponse = await getPricesV2({
        eth: [NATIVE_CONTRACT],
        vsCurrencies: [currency],
        useNewFormat: true,
      });

      //Ищем цену ETH
      const priceItem = priceResponse?.items?.find(
        (item: NewTokenWithPrice) => item.chain === 'eth' && item.address === NATIVE_CONTRACT
      );
      const priceInfo = priceItem?.prices?.find(
        (p: PriceWithCurrency) => p.currency?.toLowerCase() === currency.toLowerCase()
      );
      const price = priceInfo?.price || 0;
      const change24h = priceInfo?.price24hChange || 0;

      //Считаем общую сумму
      const totalFiat = calculateFiatAmount(amount, decimals, price);

      return {
        totalFiat,
        amount,
        price,
        change24h,
      };
    },
  });

  return {
    totalFiat: query.data?.totalFiat ?? 0,
    amount: query.data?.amount ?? '0',
    price: query.data?.price ?? 0,
    change24h: query.data?.change24h ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}