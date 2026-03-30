import { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateMnemonic } from '@scure/bip39';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import styles from './styles.module.scss';
import { MnemonicUtils } from '../../hooks/useCreateLocalWallet';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { ROUTES } from '../../constants/routes.constants';
import Header from '../../components/Header';
import TextArea from '../../components/TextArea';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import { useRecoverImport } from '../../hooks/useRecoverImport';
import Logo from '../../components/Logo';

export const ImportWalletPage = () => {
  const navigate = useNavigate();
  const activeProfileId = 'guest';
  const location = useLocation();
  const {
    ensureVaultUnlocked,
    persistRecoverToSession,
    importAndSave,
    showSuccess,
  } = useRecoverImport(location);
  const [mnemonic, setMnemonic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalized = useMemo(
    () => MnemonicUtils.normalizeMnemonic(mnemonic),
    [mnemonic],
  );
  const isValidMnemonic = useMemo(
    () => validateMnemonic(normalized, wordlist),
    [normalized],
  );

  useEffect(() => {
  const savedMnemonic = sessionStorage.getItem('recoverMnemonic');
  if (savedMnemonic) {
    setMnemonic(savedMnemonic);
  }
}, [mnemonic]);

  const onImport = useCallback(async () => {
    setError(null);
    if (!isValidMnemonic) {
      setError(t('invalidSeedPhrasePleaseTryAgain'));
      return;
    }
    setLoading(true);
    try {
      persistRecoverToSession({
        type: 'mnemonic',
        mnemonic: normalized,
        walletName: 'Wallet',
      });

      const ok = await ensureVaultUnlocked(
        activeProfileId,
        ROUTES.SIGN_IN_IMPORT_WALLET,
      );
      if (!ok) return;
      
      const rec = await importAndSave(activeProfileId);
      if (rec) {
        navigate('/');
        showSuccess();
      }
    } catch (e) {
      const msg = (e as Error)?.message ?? '';
      if (/locked/i.test(msg)) {
        navigate(ROUTES.CREATE_WALLET, {
          state: { next: ROUTES.SIGN_IN_IMPORT_WALLET },
          replace: true,
        });
        return;
      }
      setError(msg || t('invalidSeedPhrasePleaseTryAgain'));
    } finally {
      setLoading(false);
    }
  }, [
    activeProfileId,
    ensureVaultUnlocked,
    importAndSave,
    isValidMnemonic,
    navigate,
    normalized,
    persistRecoverToSession,
    showSuccess,
  ]);

  return (
    <>
      <Logo />
      <div className={styles.container}>
        <Header
          leftContent={
            <button onClick={() => navigate(-1)}>
              <ArrowLeftIcon />
            </button>
          }
          title={t('importWallet')}
        />
        <div className={styles.content}>
          <h2>{t('importWithRecoveryPhrase')}</h2>
          <p className={styles.description}>
            {t('enterPhraseYouWereGivenWhenYouCreatedYourPreviousWallet')}
          </p>
          <TextArea
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            placeholder={t('enterSeedPhrase')}
            rows={5}
            className={styles.textArea}
          />
          {error && (
            <div className={styles.alertWrap}>
              <Alert tone="error">{error}</Alert>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <Button
            isFullWidth
            disabled={loading || !isValidMnemonic}
            onClick={onImport}
          >
            {t('continue')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImportWalletPage;
