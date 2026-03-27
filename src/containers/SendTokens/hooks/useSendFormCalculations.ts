import { useMemo } from 'react';
import { useWatch, type Control } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import type { WalletTokenItem } from '../../../types/wallets';
import { SEND_FIELD_NAMES, type SendFormValues } from '../form.constants';
import { useSettings } from '../../../context/settings.context';
import { getTokenPrice } from '../../../utils/fees';

export const useSendFormCalculations = (
  selectedToken: WalletTokenItem | null,
  control: Control<SendFormValues>,
) => {
  const { currency } = useSettings();

  //Получаем данные из формы
  const amount = useWatch({
    control,
    name: SEND_FIELD_NAMES.AMOUNT,
  });

  const isUsdMode = useWatch({
    control,
    name: SEND_FIELD_NAMES.IS_USD_MODE,
  });

  //Получаем цену токена
  const tokenPrice = useMemo(
    () => getTokenPrice(selectedToken?.prices, currency),
    [selectedToken, currency],
  );

  //Получаем читаемый баланс
  const balance = useMemo(() => {
    if (!selectedToken) return new BigNumber(0);
    return new BigNumber(selectedToken.amount).dividedBy(
      new BigNumber(10).pow(selectedToken.decimals),
    );
  }, [selectedToken]);

  // //Ковертируем баланс
  const convertedValue = useMemo(() => {
    if (!amount || amount === '') return new BigNumber(0);

    const bnAmount = new BigNumber(amount);
    if (
      bnAmount.isNaN() ||
      bnAmount.isZero() ||
      !tokenPrice ||
      tokenPrice === 0
    )
      return new BigNumber(0);

    if (isUsdMode) {
      return bnAmount.dividedBy(tokenPrice);
    }
    return bnAmount.multipliedBy(tokenPrice);
  }, [amount, isUsdMode, tokenPrice]);

  //Проверка на превышение баланса
  const isOverBalance = useMemo(() => {
    if (!amount || amount === '') return new BigNumber(0);

    const bnAmount = new BigNumber(amount);
    if (bnAmount.isNaN() || bnAmount.isZero()) return false;

    const amountInTokens = isUsdMode
      ? bnAmount.dividedBy(tokenPrice || 1)
      : bnAmount;
    return amountInTokens.gt(balance);
  }, [amount, balance, isUsdMode, tokenPrice]);

  return {
    amount,
    isUsdMode,
    tokenPrice,
    balance,
    convertedValue,
    isOverBalance,
  };
};
