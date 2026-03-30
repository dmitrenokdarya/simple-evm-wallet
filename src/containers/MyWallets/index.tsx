import { t } from 'i18next';
import { Link, useNavigate } from 'react-router-dom';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import ChevronRightIcon from 'assets/images/icons/chevron-right.svg';
import styles from './styles.module.scss';
import { useWallets } from '../../context/wallets.context';
import clsx from 'clsx';
import { ROUTES } from '../../constants/routes.constants';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {
  getWalletIconById,
  WALLET_IMPORT_FLOWS,
} from '../../constants/wallets.constants';
import { truncateMiddle } from '../../utils/formats';
import Logo from '../../components/Logo';

type Wallet = {
  id: string;
  name?: string | null;
  iconId?: string | null;
  address?: string;
};

type WalletSectionProps = {
  wallets: Wallet[];
};

const WalletSection = ({ wallets }: WalletSectionProps) => {
  const { selectedWalletId, setSelectedWalletId } = useWallets();
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <div className={styles.list}>
        {wallets.map((w) => {
          const isActive = selectedWalletId === w.id;
          return (
            <div
              key={w.id}
              className={clsx(styles.walletItem, { [styles.active]: isActive })}
            >
              <button
                type="button"
                className={styles.walletMainAction}
                onClick={() => {
                  setSelectedWalletId(w.id);
                  navigate('/');
                }}
              >
                <div className={styles.icon}>{getWalletIconById(w.iconId)}</div>
                <div className={styles.info}>
                  <div className={styles.name}>{w.name || 'Wallet'}</div>
                  <div className={styles.address}>
                    {truncateMiddle(w.address || '')}
                  </div>
                </div>
              </button>
              <button
                type="button"
                className={styles.walletManageAction}
                onClick={() => {
                  navigate(ROUTES.MANAGE_WALLET.replace(':id', w.id));
                }}
              >
                <ChevronRightIcon />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MyWallets = () => {
  const { wallets: data } = useWallets();

  return (
    <>
      <Logo />
      <div className={styles.page}>
        <Header
          title={t('myWallets')}
          leftContent={
            <Link to="/">
              <ArrowLeftIcon />
            </Link>
          }
        />
        <div className={styles.content}>
          <WalletSection wallets={data} />

          <div className={styles.actions}>
            <Link
              to={`${ROUTES.SIGN_IN_IMPORT_WALLET}?flow=${WALLET_IMPORT_FLOWS.IMPORT_FROM_ACCOUNT}`}
            >
              <Button isFullWidth styleType="filledHighlighted">
                {t('importWallet')}
              </Button>
            </Link>
            <Link
              to={ROUTES.IMPORT_WALLET_CUSTOMIZE}
              state={{ next: ROUTES.CREATE_WALLET, isCreation: true }}
            >
              <Button isFullWidth>{t('createNewWallet')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWallets;
