import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import { useSendFormCalculations } from './hooks/useSendFormCalculations';
import styles from './styles.module.scss';
import {
  DEFAULT_VALUES,
  getValidationSchema,
  SEND_FIELD_NAMES,
  type SendFormValues,
} from './form.constants';
import { ROUTES } from '../../constants/routes.constants';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useWalletTokenSelection } from '../../hooks/useWalletTokenSelection';
import WalletTokenSelector from './components/WalletTokenSelector';
import SendAmountInput from './components/SendAmountInput';
import SendRecipientInput from './components/SendRecipientInput';
import Logo from '../../components/Logo';

export const SendTokens = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    tokenChain?: string;
    tokenAddress?: string;
  } | null;
  const {
    wallets,
    currentWallet,
    selectedToken,
    isLoadingTokens,
    walletsBalances,
    handleWalletSelect,
  } = useWalletTokenSelection(state);

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid, touchedFields, errors },
  } = useForm<SendFormValues>({
    resolver: yupResolver(getValidationSchema()),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const { isOverBalance } = useSendFormCalculations(selectedToken, control);

  useEffect(() => {
    if (selectedToken?.chain && touchedFields.to) {
      trigger(SEND_FIELD_NAMES.TO);
    }
  }, [selectedToken?.chain, trigger, touchedFields.to]);

  const onSubmit = (data: SendFormValues) => {
    // Remove non-serializable React elements from token
    const serializableToken = { ...selectedToken };
    delete serializableToken.tokenIcon;
    delete serializableToken.chainIcon;

    navigate(ROUTES.SEND_CONFIRM, {
      state: {
        wallet: currentWallet,
        token: serializableToken,
        formValues: data,
      },
    });
  };

  const isNextDisabled =
    !isValid ||
    !selectedToken ||
    !!isOverBalance ||
    Object.keys(errors).length > 0;

  return (
    <>
      <Logo />
      <div className={styles.page}>
        <Header
          leftContent={
            <button onClick={() => navigate('/')}>
              <ArrowLeftIcon />
            </button>
          }
          title={t('sendTokens')}
        />

        <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
          <WalletTokenSelector
            wallets={wallets}
            currentWallet={currentWallet}
            selectedToken={selectedToken}
            isLoadingTokens={isLoadingTokens}
            walletsBalances={walletsBalances}
            onWalletSelect={handleWalletSelect}
          />
          <SendAmountInput
            selectedToken={selectedToken}
            currentWallet={currentWallet}
            setValue={setValue}
            control={control}
          />
          <SendRecipientInput control={control} />
          <Button
            styleType="filledHighlighted"
            isFullWidth
            disabled={isNextDisabled}
            type="submit"
            className={styles.nextButton}
          >
            {t('next')}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SendTokens;
