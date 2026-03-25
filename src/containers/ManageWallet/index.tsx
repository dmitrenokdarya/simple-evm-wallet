import { useState } from 'react';
import { t } from 'i18next';
import { Link, useParams } from 'react-router-dom';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import EditIcon from 'assets/images/icons/edit-pencil.svg';
import PuzzleIcon from 'assets/images/icons/manage-wallet/puzzle-icon.svg';
import keyIcon from 'assets/images/key.png';
import styles from './styles.module.scss';
import { useModal } from '../../context/modal.context';
import { useWallets } from '../../context/wallets.context';
import { ROUTES } from '../../constants/routes.constants';
import { MODAL_NAME } from '../../constants/modal.constants';
import Header from '../../components/Header';
import { getWalletIconById } from '../../constants/wallets.constants';
import Button from '../../components/Button';
import { NavActionsMenu } from '../../components/SidePanel/NavActionsMenu';
import Logo from '../../components/Logo';

export const ManageWallet = () => {
  const { id } = useParams<{ id: string }>();
  const { wallets, updateWallet } = useWallets();
  const { showModal } = useModal();
  const wallet = wallets.find((w) => w.id === id);

  const getActions = (seedBackedUp: boolean) => [
    {
      icon: <PuzzleIcon />,
      text: 'backupWallet',
      link: ROUTES.RECOVERY_PHRASE.replace(':id', wallet?.id || ''),
      subcontent: !seedBackedUp && (
        <div className={styles.notBackedUp}>{t('notBackedUp')}</div>
      ),
    },
  ];

  const [isBannerVisible, setIsBannerVisible] = useState(true);

  if (!wallet) {
    return null;
  }

  const handleEditAvatar = () => {
    showModal(MODAL_NAME.EDIT_AVATAR_MODAL, {
      initialIconId: wallet.iconId || '',
      onSave: (iconId) => updateWallet(wallet.id, { iconId }),
    });
  };

  const handleEditLabel = () => {
    showModal(MODAL_NAME.EDIT_LABEL_MODAL, {
      initialLabel: wallet.name || '',
      existingWalletNames: wallets
        .filter((item) => item.id !== wallet.id)
        .map((item) => item.name || ''),
      onSave: (name) => updateWallet(wallet.id, { name }),
    });
  };

  const showBanner = !wallet.seedBackedUp && isBannerVisible;

  return (
    <>
      <Logo />
      <div className={styles.page}>
        <Header
          title={t('manageWallet')}
          leftContent={
            <Link to="/my-wallets">
              <ArrowLeftIcon />
            </Link>
          }
        />
        <div className={styles.content}>
          <div className={styles.walletHeader}>
            <div className={styles.avatar}>
              {getWalletIconById(wallet.iconId)}
              <button
                type="button"
                className={styles.editAvatarButton}
                onClick={handleEditAvatar}
              >
                <EditIcon />
              </button>
            </div>
            <div className={styles.walletName}>
              {wallet.name || t('wallet')}
              <Button
                styleType="text"
                leftContent={<EditIcon />}
                className={styles.editLabelButton}
                onClick={handleEditLabel}
              >
                {t('editName')}
              </Button>
            </div>
          </div>

          {showBanner && (
            <div className={styles.banner}>
              <div className={styles.bannerContent}>
                <img width={66} src={keyIcon} alt="Email icon" />
                <div className={styles.bannerText}>
                  <div className={styles.bannerTitle}>
                    {t('secureYourWallet')}
                  </div>
                  <div className={styles.bannerDescription}>
                    {t('secureYourWalletDesc')}
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setIsBannerVisible(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          )}
          <NavActionsMenu actions={getActions(wallet.seedBackedUp)} />
        </div>
      </div>
    </>
  );
};

export default ManageWallet;
