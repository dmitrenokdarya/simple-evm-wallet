import Button from '../../../components/Button';
import styles from './styles.module.scss';
import SendIcon from 'assets/images/icons/send.svg';
import ReceiveIcon from 'assets/images/icons/receive.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { t } from 'i18next';
import { useWallets } from '../../../context/wallets.context';
import Loader from '../../../components/Loader';
import { useWalletTokens } from '../../../hooks/useWalletTokens';
import { useSettings } from '../../../context/settings.context';
import { CURRENCIES_DATA } from '../../../constants/form/currencies.constants';
import { formatFiat } from '../../../utils/amount';
import CloseEyeIcon from 'assets/images/icons/close-eye.svg';
import clsx from 'clsx';
import { GlobalPageLoader } from '../../../components/GlobalPageLoader';

const WalletBalance = () => {
  const navigate = useNavigate();
  const { selectedWallet } = useWallets();
  const { totalFiat, isLoading, change24h } = useWalletTokens();
  const { currency, isBalanceHidden, setIsBalanceHidden } = useSettings();
  const currencySymbol =
    CURRENCIES_DATA[currency]?.symbol || currency.toUpperCase();

  const totalChangeFiat = totalFiat * (change24h / 100);
  const totalChangePct = change24h;

  const signFiat = totalChangeFiat >= 0 ? '+' : '-';
  const signPct = totalChangePct > 0 ? '+' : '-';

  return (
    <div className={styles.wallet}>
      {isLoading && <GlobalPageLoader />}
      <div className={styles.label}>
        {selectedWallet?.name ?? 'No wallet selected'}
      </div>
      <div className={styles.balance}>
        {isLoading ? (
          <Loader colorful />
        ) : (
          <span className={styles.total}>
            {isBalanceHidden || !selectedWallet
              ? '--'
              : `${currencySymbol} ${formatFiat(totalFiat)}`}
          </span>
        )}
        <button
          type="button"
          onClick={() => setIsBalanceHidden(!isBalanceHidden)}
          aria-pressed={isBalanceHidden}
          className={clsx(
            styles.toggleButton,
            isBalanceHidden && styles.revealed,
          )}
        >
          <CloseEyeIcon />
        </button>
      </div>
      <div className={styles.info}>
        <span
          className={clsx(styles.grow, { [styles.down]: totalChangeFiat < 0 })}
        >
          {isLoading
            ? `+${currencySymbol} 0.00`
            : `${signFiat}${currencySymbol} ${formatFiat(Math.abs(totalChangeFiat), { useThreshold: true })}`}
        </span>
        <span
          className={clsx(styles.grow, { [styles.down]: totalChangePct < 0 })}
        >
          {isLoading
            ? '+0.0%'
            : `${signPct}${Math.abs(totalChangePct).toFixed(2)}%`}
        </span>
        <span>24h</span>
      </div>
      <div className={styles.actions}>
        <div className={styles.action}>
          <Button
            disabled={!selectedWallet}
            styleType="round"
            onClick={() => navigate(ROUTES.SEND)}
          >
            <SendIcon />
          </Button>
          <span>{t('send')}</span>
        </div>
        <div className={styles.action}>
          <Button
            disabled={!selectedWallet}
            styleType="round"
            onClick={() => navigate(ROUTES.RECEIVE)}
          >
            <ReceiveIcon />
          </Button>
          <span>{t('receive')}</span>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
