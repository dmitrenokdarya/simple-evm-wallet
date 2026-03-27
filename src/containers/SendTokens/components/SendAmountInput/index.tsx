import BigNumber from 'bignumber.js';
import { useSendFormCalculations } from '../../hooks/useSendFormCalculations';
import styles from './styles.module.scss';
import type { WalletTokenItem } from '../../../../types/wallets';
import type { WalletRecord } from '../../../../db/types';
import { SEND_FIELD_NAMES, type SendFormValues } from '../../form.constants';
import { Controller, type Control, type UseFormSetValue } from 'react-hook-form';
import { useSettings } from '../../../../context/settings.context';
import { CURRENCIES_DATA } from '../../../../constants/form/currencies.constants';
import clsx from 'clsx';
import { formatAmount, formatFiat } from '../../../../utils/amount';
import { NATIVE_CONTRACT } from '../../../../constants/form/tokens-list.constants';
import SwapIcon from '../../../../assets/images/icons/swap.svg';

type Props = {
  selectedToken: WalletTokenItem | null;
  currentWallet?: WalletRecord | null;
  control: Control<SendFormValues>;
  setValue: UseFormSetValue<SendFormValues>;
};

const SendAmountInput = ({
  selectedToken,
  control,
  setValue,
}: Props) => {
  const { currency } = useSettings();
  const currencySymbol = CURRENCIES_DATA[currency]?.symbol || currency.toUpperCase();

  const {
    amount,
    isUsdMode,
    tokenPrice,
    balance,
    convertedValue,
    isOverBalance,
  } = useSendFormCalculations(selectedToken, control);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <Controller
          control={control}
          name={SEND_FIELD_NAMES.AMOUNT}
          render={({ field: { onChange, value, onBlur } }) => (
            <input
              type="text"
              className={clsx(styles.input, { [styles.error]: isOverBalance })}
              placeholder="0"
              value={value}
              onBlur={onBlur}
              onChange={(e) => {
                const { value: val } = e.target;
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  onChange(val);
                }
              }}
              inputMode="decimal"
              style={{ width: `${Math.max(String(value).length || 1, 1)}ch` }}
            />
          )}
        />
        <div className={styles.symbol}>
          {isUsdMode ? currency.toUpperCase() : selectedToken?.symbol}
        </div>
        <Controller
          control={control}
          name={SEND_FIELD_NAMES.IS_USD_MODE}
          render={({ field: { onChange, value } }) => (
            <button
              className={styles.switchButton}
              type="button"
              onClick={() => {
                if (amount && tokenPrice) {
                  const bnAmount = new BigNumber(amount);
                  if (value) {
                    setValue(
                      SEND_FIELD_NAMES.AMOUNT,
                      bnAmount
                        .dividedBy(tokenPrice)
                        .toFixed(8)
                        .replace(/\.?0+$/, ''),
                    );
                  } else {
                    setValue(
                      SEND_FIELD_NAMES.AMOUNT,
                      bnAmount.multipliedBy(tokenPrice).toFixed(2),
                    );
                  }
                }
                onChange(!value);
              }}
            >
              <SwapIcon />
            </button>
          )}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.usdAmount}>
          {isUsdMode
            ? `${formatAmount(convertedValue.multipliedBy(new BigNumber(10).pow(selectedToken?.decimals || 0)).toFixed(0), selectedToken?.decimals || 0, { fractionDigits: 6 })} ${selectedToken?.symbol || ''}`
            : `${currencySymbol} ${formatFiat(convertedValue.toNumber())}`}
        </div>
        <button
          className={styles.maxButton}
          type="button"
          onClick={() => {
            if (!selectedToken) return;

            const isNative = selectedToken.contractAddress === NATIVE_CONTRACT;
            let maxAmount = new BigNumber(balance);

            if (isNative) {
              const estimatedFee = new BigNumber(0.001); 
              const feeMultiplier = 1.3;
              const fee = estimatedFee.multipliedBy(feeMultiplier);
              maxAmount = BigNumber.max(maxAmount.minus(fee), 0);
            }

            if (isUsdMode) {
              setValue(
                SEND_FIELD_NAMES.AMOUNT,
                maxAmount.multipliedBy(tokenPrice).toFixed(2),
                { shouldValidate: true },
              );
            } else {
              setValue(
                SEND_FIELD_NAMES.AMOUNT,
                maxAmount.toFixed(6).replace(/\.?0+$/, ''),
                { shouldValidate: true },
              );
            }
          }}
        >
          MAX
        </button>
      </div>
    </div>
  );
};

export default SendAmountInput;