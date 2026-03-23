import { useLocation, useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '../../assets/images/icons/arrow-left.svg';
import styles from './styles.module.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  createVault,
  ensureVaultUnlocked,
  hasVault,
  unlockVault,
} from '../../utils/vault';
import { isPasswordStrong } from '../../utils/passwordRules';
import { AUTH_FIELD_NAMES } from '../../constants/form/auth.constants';
import {
  DEFAULT_VALUES,
  getValidationSchemaCreate,
  getValidationSchemaUnlock,
  type WalletSecureFormValues,
  type WalletSecureFormValuesCreate,
} from './constants';
import { useCreateLocalWallet } from '../../hooks/useCreateLocalWallet';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import InputWithController from '../../components/InputWithController';
import Checkbox from '../../components/Checkbox';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Header from '../../components/Header';

const CreateWallet = () => {
  const navigate = useNavigate();
  const [vaultState, setVaultState] = useState<
    'needsCreate' | 'needsUnlock' | 'unlocked'
  >('needsCreate');
  const location = useLocation() as {
    state?: { next?: string; walletName?: string; walletIcon?: string };
  };
  const { createWallet, loading, error } = useCreateLocalWallet();
  const [formError, setFormError] = useState<string | null>(null);
  const activeProfileId = 'guest';
  const progressedRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const exists = await hasVault(activeProfileId);
      if (!exists) {
        setVaultState('needsCreate');
        return;
      }
      const unlocked = await ensureVaultUnlocked(activeProfileId);
      setVaultState(unlocked ? 'unlocked' : 'needsUnlock');
    })();
  }, [activeProfileId]);

  const activeSchema = useMemo(
    () =>
      vaultState === 'needsCreate'
        ? getValidationSchemaCreate(t)
        : getValidationSchemaUnlock(t),
    [vaultState, t],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
    watch,
    trigger,
  } = useForm<WalletSecureFormValues | WalletSecureFormValuesCreate>({
    resolver: yupResolver(activeSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    reset(DEFAULT_VALUES, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    });
    setFormError(null);
  }, [reset, vaultState]);

  const ensureVaultReady = useCallback(
    async (values: WalletSecureFormValuesCreate | WalletSecureFormValues) => {
      if (vaultState === 'unlocked') return;
      const pwd = values?.[AUTH_FIELD_NAMES.PASSWORD] as string;
      if (vaultState === 'needsUnlock') {
        await unlockVault(pwd, activeProfileId);
        setVaultState('unlocked');
        return;
      }
      await createVault(pwd, activeProfileId);
      setVaultState('unlocked');
    },
    [activeProfileId, vaultState],
  );

  const proceedOnce = useCallback(async () => {
    if (progressedRef.current) return;
    progressedRef.current = true;
    try {
      const next = location.state?.next;
      if (next) {
        navigate(next, { replace: true });
        return;
      }
      const { record, mnemonic } = await createWallet({
        name: location.state?.walletName,
        iconId: location.state?.walletIcon,
      });
      navigate(`/wallet/${record.id}/seed`, { state: { mnemonic } });
    } catch (e) {
      progressedRef.current = false;
      setFormError((e as Error)?.message || t('walletCreationFailed'));
    }
  }, [
    createWallet,
    location.state?.next,
    location.state?.walletIcon,
    location.state?.walletName,
    navigate,
    t,
  ]);

  const onSubmit = useCallback(
    async (values: WalletSecureFormValuesCreate | WalletSecureFormValues) => {
      try {
        await ensureVaultReady(values);
        await proceedOnce();
      } catch (e) {
        setFormError((e as Error)?.message || t('walletCreationFailed'));
      }
    },
    [ensureVaultReady, proceedOnce, t],
  );

  useEffect(() => {
    if (vaultState !== 'unlocked') return;
    proceedOnce();
  }, [proceedOnce, vaultState]);

  const passwordVal = watch(AUTH_FIELD_NAMES.PASSWORD);
  const strong = isPasswordStrong(passwordVal || '');

  useEffect(() => {
    if (vaultState !== 'needsCreate') return;
    if (!passwordVal) return;
    trigger(AUTH_FIELD_NAMES.CONFIRM_PASSWORD);
  }, [passwordVal, trigger, vaultState]);

  return (
    <>
      <Logo />
      <div className={styles.createWalletWrapper}>
        <Header
          leftContent={
            <button onClick={() => navigate('/')}>
              <ArrowLeftIcon />
            </button>
          }
          title={t('backUpYourWallet')}
        />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            {vaultState === 'needsCreate' && (
              <div className={styles.fields}>
                <div className={styles.passwordField}>
                  <InputWithController
                    control={control}
                    fieldName={AUTH_FIELD_NAMES.PASSWORD}
                    placeholder={t('newMasterPassword')}
                    type="password"
                    description={
                      strong && (
                        <span>
                          {t('passwordStrength')}:{' '}
                          <span className={styles.good}>{t('good')}</span>
                        </span>
                      )
                    }
                  />
                </div>
                <InputWithController
                  control={control}
                  fieldName={AUTH_FIELD_NAMES.CONFIRM_PASSWORD}
                  placeholder={t('confirmPassword')}
                  type="password"
                />
                <Controller
                  control={control}
                  name={AUTH_FIELD_NAMES.PASSWORD_AGREEMENT}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      label={t(
                        'understandThatBlackFortCannotRecoverThisPasswordForMe',
                      )}
                      onChange={onChange}
                      isChecked={value}
                    />
                  )}
                />
              </div>
            )}
            {vaultState === 'needsUnlock' && (
              <div className={styles.fields}>
                <InputWithController
                  control={control}
                  fieldName={AUTH_FIELD_NAMES.PASSWORD}
                  placeholder={t('masterPassword')}
                  type="password"
                />
                {error && <Alert tone="error">{error}</Alert>}
                {formError && <Alert tone="error">{formError}</Alert>}
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={
              loading || isSubmitting || (vaultState !== 'unlocked' && !isValid)
            }
            isFullWidth
            className={styles.startButton}
          >
            {t('start')}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateWallet;
