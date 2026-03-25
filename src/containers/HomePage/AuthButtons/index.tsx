import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { ROUTES } from '../../../constants/routes.constants';
import { t } from 'i18next';

const AuthButtons = () => {
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    navigate(ROUTES.CREATE_WALLET);
  };

  const handleImport = () => {
    navigate(ROUTES.SIGN_IN_IMPORT_WALLET);
  };

  return (
    <div className={styles.tabsBox}>
      <Button onClick={handleCreateWallet} isFullWidth>
        {t('createNewWallet')}
      </Button>
      <Button onClick={handleImport} styleType="filledHighlighted" isFullWidth>
        {t('import')}
      </Button>
    </div>
  );
};

export default AuthButtons;
