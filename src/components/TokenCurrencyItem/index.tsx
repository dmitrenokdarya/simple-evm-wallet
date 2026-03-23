import clsx from 'clsx';
import type { KeyboardEvent } from 'react';
import styles from './styles.module.scss';
import { useSettings } from '../../context/settings.context';
import { CURRENCIES_DATA } from '../../constants/form/currencies.constants';
import { formatAmount, formatFiat } from '../../utils/amount';
import type { WalletTokenItem } from '../../types/wallets';
import { TokenIcon } from '../TokenIcon';

type Props = {
  item: WalletTokenItem;
  className?: string;
  onClick?: () => void;
};

const TokenCurrencyItem = ({ item, className, onClick }: Props) => {
  const { currency, isBalanceHidden } = useSettings();
  const fiat =
    item.prices?.find(
      (p) => p.currency?.toLowerCase() === currency.toLowerCase(),
    ) || item.prices?.[0];
  const currencySymbol =
    CURRENCIES_DATA[currency]?.symbol || currency.toUpperCase();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={clsx(styles.currencyItem, className)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.left}>
        <div className={styles.icons}>
          <TokenIcon />
        </div>
        <div className={styles.meta}>
          <div className={styles.name}>{item.name}</div>
          {fiat && (
            <div className={styles.sub}>
              <span>
                {currencySymbol} {formatFiat(fiat.price)}
                {!!fiat?.price24hChange && fiat.price24hChange !== 0 && (
                  <span
                    className={clsx(styles.priceChange, {
                      [styles.priceUp]: fiat.price24hChange > 0,
                      [styles.priceDown]: fiat.price24hChange < 0,
                    })}
                  >
                    {fiat.price24hChange > 0 ? '+' : ''}
                    {fiat.price24hChange.toFixed(2)}%
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.balanceInfo}>
          <div className={styles.amount}>
            {isBalanceHidden
              ? '***'
              : `${formatAmount(item.amount, item.decimals, { fractionDigits: 6 })} ${item.symbol}`}
          </div>
          <div className={styles.price}>
            {isBalanceHidden
              ? '***'
              : `${currencySymbol} ${formatFiat(item.fiatAmount, { useThreshold: true })}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCurrencyItem;
