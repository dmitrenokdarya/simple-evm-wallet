import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import CloseIcon from 'assets/images/icons/close.svg';
import WalletNavIcon from 'assets/images/icons/nav/wallet.svg';
import styles from './styles.module.scss';
import { ROUTES } from '../../constants/routes.constants';
import Header from '../Header';
import { NavActionsMenu } from './NavActionsMenu';
import { useMemo } from 'react';
import DeleteWalletsIcon from 'assets/images/icons/nav/delete-wallets.svg';


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SidePanel = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();

  const handleManageWallets = () => {
    navigate(ROUTES.MY_WALLETS);
    onClose();
  };

  const actionMenu = useMemo(
    () => [
      {
        icon: <DeleteWalletsIcon />,
        text: 'deleteWalletAndData',
        link: ROUTES.DELETE_WALLET,
      },
    ],
    [],
  );

  return (
    <>
      <div
        className={clsx(styles.backdrop, { [styles.open]: isOpen })}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={clsx(styles.panel, { [styles.open]: isOpen })}
        role="dialog"
        aria-modal="true"
      >
        <Header
          leftContent={
            <button type="button" onClick={onClose}>
              <CloseIcon />
            </button>
          }
        />
        <div className={styles.content}>
          <button onClick={handleManageWallets} className={styles.action}>
            <WalletNavIcon />
            <div className={styles.actionTexts}>
              <div className={styles.title}>Manage Wallets</div>
              <p>Manage and add wallets, recovery phrase control</p>
            </div>
          </button>
          <NavActionsMenu actions={actionMenu} onClose={onClose} />
        </div>
      </aside>
    </>
  );
};
