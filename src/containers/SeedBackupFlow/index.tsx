import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import styles from './styles.module.scss';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { MODAL_NAME } from '../../constants/modal.constants';
import { useModal } from '../../context/modal.context';
import { useWallets } from '../../context/wallets.context';
import { IntroStep } from './IntroStep';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import RevealStep from './RevealStep';
import ConfirmStep from './ConfirmStep';

const getTitleByStep = (step: number) => {
  if (step === 1) {
    return t('walletSecure');
  }
  return t('backUpYourWallet');
};

export const SeedBackupFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialMnemonic: string | undefined = location.state?.mnemonic;

  const [step, setStep] = useState(1);
  const [mnemonic, setMnemonic] = useState<string | null>(
    initialMnemonic ?? null,
  );
  const [busy, setBusy] = useState(false);
  const { showModal } = useModal();
  const { markSeedBackedUp } = useWallets();

  useEffect(
    () => () => {
      setMnemonic(null);
    },
    [],
  );

  const missingSeed = useMemo(() => !id || !mnemonic, [id, mnemonic]);

  const onStart = useCallback(() => {
    setStep(2);
  }, []);

  const goBackFromReveal = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const goToConfirm = useCallback(() => {
    setStep(3);
  }, []);

  const completeBackup = useCallback(async () => {
    if (!id) return;
    setBusy(true);
    try {
      await markSeedBackedUp(id);
      setMnemonic(null);
      navigate('/');
      showModal(MODAL_NAME.SUCCESS_MODAL, {
        subtitle: t('youHaveSuccessfullyProtectedYourWallet'),
        content: (
          <Alert tone="alert">{t('rememberToKeepYourSeedPhraseSafe')}</Alert>
        ),
      });
    } catch (e) {
      console.log((e as Error)?.message ?? 'Error');
    } finally {
      setBusy(false);
    }
  }, [id, markSeedBackedUp, navigate, showModal]);

  if (missingSeed) {
    return (
      <div className={styles.container}>
        <h2>{t('yourSeedPhrase')}</h2>
        <p>
          Seed phrase is not available. Please go back and start the process
          again.
        </p>
        <div>
          <Button onClick={() => navigate(-1)}>{t('back')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Logo />
      <Header
        leftContent={(
          <button
            onClick={() => {
              if (step === 1) {
                goBackFromReveal();
              }
              return setStep((prevState) => prevState - 1 || 1);
            }}
          >
            <ArrowLeftIcon />
          </button>
        )}
        title={getTitleByStep(step)}
      />
      <div className={styles.progress} />
      {step === 1 && <IntroStep onStart={onStart} />}
      {step === 2 && (
        <RevealStep mnemonic={mnemonic!} onContinue={goToConfirm} />
      )}
      {step === 3 && (
        <ConfirmStep originalMnemonic={mnemonic!} onComplete={completeBackup} />
      )}
      {busy && null}
    </div>
  );
};
