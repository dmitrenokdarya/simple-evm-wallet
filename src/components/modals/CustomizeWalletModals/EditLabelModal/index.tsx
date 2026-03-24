import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { t } from 'i18next';
import styles from './styles.module.scss';
import { WALLETS_FIELD_NAMES } from '../../../../constants/form/wallets.constants';
import { ModalLayout } from '../../ModalLayout';
import Input from '../../../Input';
import Button from '../../../Button';
import { isWalletNameDuplicate, walletNameValidation } from '../../../../validators/wallet';

interface EditLabelModalProps {
  initialLabel: string;
  existingWalletNames: string[];
  onSave: (label: string) => void;
  onClose: () => void;
}

export const EditLabelModal = ({
  initialLabel,
  existingWalletNames,
  onSave,
  onClose,
}: EditLabelModalProps) => {
  const walletNameSchema = yup.object({
    [WALLETS_FIELD_NAMES.WALLET_NAME]: walletNameValidation(t),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(walletNameSchema),
    defaultValues: {
      [WALLETS_FIELD_NAMES.WALLET_NAME]: initialLabel,
    },
  });
  const walletName = watch(WALLETS_FIELD_NAMES.WALLET_NAME);
  const isDuplicateWalletName = isWalletNameDuplicate({
    walletName,
    existingWalletNames,
    ignoredWalletName: initialLabel,
  });
  const walletNameError = errors.walletName?.message
    || (isDuplicateWalletName ? t('walletNameAlreadyExists') : undefined);

  const onSubmit = (data: { [WALLETS_FIELD_NAMES.WALLET_NAME]: string }) => {
    onSave(data[WALLETS_FIELD_NAMES.WALLET_NAME]);
    onClose();
  };

  return (
    <ModalLayout
      className={styles.modal}
      title={t('editLabel')}
      onClose={onClose}
    >
      <div className={styles.content}>
        <p className={styles.subtitle}>{t('editLabelDescription')}</p>

        <div className={styles.inputWrapper}>
          <Controller
            name={WALLETS_FIELD_NAMES.WALLET_NAME}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t('walletName')}
                placeholder={t('walletNamePlaceholder')}
                error={walletNameError}
              />
            )}
          />
        </div>

        <div className={styles.footer}>
          <Button isFullWidth onClick={handleSubmit(onSubmit)} disabled={isDuplicateWalletName}>
            {t('save')}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};
