import Button from '../../../components/Button';
import styles from './styles.module.scss';
import SendIcon from 'assets/images/icons/send.svg';
import ReceiveIcon from 'assets/images/icons/receive.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { t } from 'i18next';
import { useWallets } from '../../../context/wallets.context';

const WalletBalance = () => {
  const navigate = useNavigate();
  const { selectedWallet } = useWallets();

  return (
    <div className={styles.wallet}>
      <div className={styles.label}>No wallet added</div>
      <div className={styles.balance}>
        <span>--</span>
      </div>
      <div className={styles.info}>
        <span>+$ 0.00</span>
        <span>-0.00%</span>
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
