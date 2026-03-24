/* eslint-disable react-refresh/only-export-components */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import styles from './styles.module.scss';
import Button from '../../../Button';
import { WALLETS_FIELD_NAMES } from '../../../../constants/form/wallets.constants';
import { ModalLayout } from '../../ModalLayout';
import { WalletsIconGrid } from '../../../WalletIconsGrid';

interface EditAvatarModalProps {
  initialIconId: string;
  onSave: (iconId: string) => void;
  onClose: () => void;
}

export const walletAvatarSchema = yup.object({
  [WALLETS_FIELD_NAMES.SELECTED_ICON]: yup.string().required(),
});

export const EditAvatarModal = ({
  initialIconId,
  onSave,
  onClose,
}: EditAvatarModalProps) => {
  const { t } = useTranslation();
  const {
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(walletAvatarSchema),
    defaultValues: {
      [WALLETS_FIELD_NAMES.SELECTED_ICON]: initialIconId,
    },
  });

  const selectedIcon = watch(WALLETS_FIELD_NAMES.SELECTED_ICON);

  const onSubmit = (data: { [WALLETS_FIELD_NAMES.SELECTED_ICON]: string }) => {
    onSave(data[WALLETS_FIELD_NAMES.SELECTED_ICON]);
    onClose();
  };

  return (
    <ModalLayout
      className={styles.modal}
      title={t('setPicture')}
      onClose={onClose}
    >
      <div className={styles.content}>
        <p className={styles.subtitle}>{t('useTemplatesForWallet')}</p>

        <WalletsIconGrid
          selectedIcon={selectedIcon}
          onSelect={(id) => setValue(WALLETS_FIELD_NAMES.SELECTED_ICON, id)}
        />

        <div className={styles.footer}>
          <Button isFullWidth onClick={handleSubmit(onSubmit)}>
            {t('save')}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};
