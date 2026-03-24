import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import ArrowLeftIcon from '../../assets/images/icons/arrow-left.svg';
import deleteImage from '../../assets/images/delete.png';
import styles from './styles.module.scss';
import { deleteProfileData } from '../../db/profile-data';
import Logo from '../../components/Logo';
import { useWallets } from '../../context/wallets.context';

export const DeleteWalletPage = () => {
  const navigate = useNavigate();
  const { fetchWallets } = useWallets();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDelete = async () => {
    //Удаляем все данные для профиля guest
    await deleteProfileData('guest');

    //Удаляем выбранный кошелёк из localStorage
    localStorage.removeItem('selected_wallet');

    await fetchWallets();

    //Перенаправляем на главную (где будет показан экран создания/импорта)
    navigate('/');
  };

  return (
    <>
      <Logo />
      <div className={styles.page}>
        <Header
          title={t('deleteWalletAndData')}
          leftContent={
            <button type="button" onClick={() => navigate(-1)}>
              <ArrowLeftIcon />
            </button>
          }
        />
        <div className={styles.content}>
          <div className={styles.deleteContent}>
            <img src={deleteImage} className={styles.deleteImg} alt="Delete" />
            <div className={styles.title}>
              {t('areYouSureYouWantToDeleteAllYourWallets')}
            </div>
            <div className={styles.description}>
              <p>{t('yourSeedPhrasesWillBeRemovedFromLocalStorage')}</p>
              <p>{t('makeSureYouSaveYourSeedPhraseKeystoreOrPrivateKey')}</p>
            </div>

            <Checkbox
              isChecked={isConfirmed}
              onChange={() => setIsConfirmed(!isConfirmed)}
              wrapperClassName={styles.checkboxWrapper}
              labelClassName={styles.checkboxLabel}
              label={t('iUnderstandThatThereWillNoWayToRestoreAccessFull')}
            />
          </div>

          <div className={styles.actions}>
            <Button
              styleType="filledHighlighted"
              isFullWidth
              onClick={() => navigate(-1)}
            >
              {t('no')}
            </Button>
            <Button isFullWidth disabled={!isConfirmed} onClick={handleDelete}>
              {t('yes')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteWalletPage;
