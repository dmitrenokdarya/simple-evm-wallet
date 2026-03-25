/* eslint-disable react-refresh/only-export-components */
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { t } from 'i18next';
import clsx from 'clsx';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import styles from './styles.module.scss';
import { WALLETS_FIELD_NAMES } from '../../constants/form/wallets.constants';
import { isWalletNameDuplicate, walletNameValidation } from '../../validators/wallet';
import { useWallets } from '../../context/wallets.context';
import { getWalletIconById, WALLET_ICONS } from '../../constants/wallets.constants';
//import { ROUTES } from '../../constants/routes.constants';
import Header from '../../components/Header';
import { WalletsIconGrid } from '../../components/WalletIconsGrid';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const walletSchema = yup.object({
  [WALLETS_FIELD_NAMES.WALLET_NAME]: walletNameValidation(t),
  [WALLETS_FIELD_NAMES.SELECTED_ICON]: yup.string().required(),
});

export const CustomizeWallet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wallets } = useWallets();

  const isCreation = !!(location.state)?.isCreation;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    [WALLETS_FIELD_NAMES.WALLET_NAME]: string;
    [WALLETS_FIELD_NAMES.SELECTED_ICON]: string;
  }>({
    resolver: yupResolver(walletSchema),
    defaultValues: {
      [WALLETS_FIELD_NAMES.WALLET_NAME]: `Wallet ${wallets.length + 1}`,
      [WALLETS_FIELD_NAMES.SELECTED_ICON]: WALLET_ICONS[0].id,
    },
    mode: 'onBlur',
  });

  const walletName = watch(WALLETS_FIELD_NAMES.WALLET_NAME);
  const selectedIcon = watch(WALLETS_FIELD_NAMES.SELECTED_ICON);
  const isDuplicateWalletName = isWalletNameDuplicate({
    walletName,
    existingWalletNames: wallets.map((wallet) => wallet.name || ''),
  });

  const handleContinue = (data: {
    [WALLETS_FIELD_NAMES.WALLET_NAME]: string,
    [WALLETS_FIELD_NAMES.SELECTED_ICON]: string
  }) => {
    const nextPath = (location.state)?.next 
    // || ROUTES.IMPORT_WALLET_RECOVERY;
    navigate({ pathname: nextPath, search: location.search }, {
      state: { walletIcon: data[WALLETS_FIELD_NAMES.SELECTED_ICON], walletName: data[WALLETS_FIELD_NAMES.WALLET_NAME] },
    });
  };

  const isEmpty = walletName.trim().length === 0;
  const walletNameError = errors.walletName?.message
    || (isDuplicateWalletName ? t('walletNameAlreadyExists') : undefined);

  return (
    <div className={styles.container}>
      <Header
        title={t(isCreation ? 'createWallet' : 'importWallet')}
        leftContent={(
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
        )}
      />

      <div className={styles.content}>
        <div className={clsx(
          styles.iconBtn,
          styles.selectedImg,
        )}
        >
          {getWalletIconById(selectedIcon)}
        </div>
        <h2 className={styles.title}>{t('setPicture')}</h2>
        <p className={styles.subtitle}>{t('chooseIconAndName')}</p>

        <WalletsIconGrid
          selectedIcon={selectedIcon}
          onSelect={(id) => setValue(WALLETS_FIELD_NAMES.SELECTED_ICON, id)}
        />

        <div className={styles.nameField}>
          <Controller
            name={WALLETS_FIELD_NAMES.WALLET_NAME}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t('walletNamePlaceholder')}
                label={t('walletName')}
                isRequired
                error={walletNameError}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          isFullWidth
          onClick={handleSubmit(handleContinue)}
          disabled={isEmpty || isDuplicateWalletName}
        >
          {t(isCreation ? 'createWallet' : 'import')}
        </Button>
      </div>
    </div>
  );
};

export default CustomizeWallet;
