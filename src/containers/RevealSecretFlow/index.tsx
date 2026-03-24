import { Link } from 'react-router-dom';
import { t } from 'i18next';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import { useRevealSecret } from './hooks/useRevealSecret';
import styles from './styles.module.scss';
import RevealableTextArea from '../../components/RevealableTextArea';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Header from '../../components/Header';
import { ROUTES } from '../../constants/routes.constants';
import Tab from '../../components/Tab';
import Logo from '../../components/Logo';

export type RevealSecretType = 'mnemonic' | 'keystore' | 'privateKey';

interface RevealSecretFlowProps {
  initialTab?: RevealSecretType;
}

export const RevealSecretFlow = ({
  initialTab = 'mnemonic',
}: RevealSecretFlowProps) => {
  const {
    wallet,
    activeTab,
    setActiveTab,
    isCopied,
    mnemonic,
    privateKey,
    error,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    keystoreError,
    isDownloading,
    onCopy,
    handleDownloadKeystore,
    markAsBackedUp,
    id,
  } = useRevealSecret(initialTab);

  if (!wallet) {
    return null;
  }

  const renderContent = () => {
    if (activeTab === 'mnemonic') {
      return (
        <div className={styles.revealStep}>
          <div className={styles.content}>
            <p className={styles.description}>{t('thisIsYourSeedPhrase')}</p>
            <RevealableTextArea
              value={mnemonic || ''}
              readonly
              rows={4}
              defaultRevealed={false}
              onReveal={markAsBackedUp}
            />
          </div>
          <div className={styles.footer}>
            {isCopied && (
              <Alert tone="success" floating>
                {t('copiedToClipboard')}
              </Alert>
            )}
            <Button onClick={onCopy} isFullWidth disabled={!mnemonic}>
              {t('copyToClipboard')}
            </Button>
          </div>
        </div>
      );
    }

    if (activeTab === 'privateKey') {
      return (
        <div className={styles.revealStep}>
          <div className={styles.content}>
            <p className={styles.description}>{t('writeDownYourPrivateKey')}</p>
            <RevealableTextArea
              value={privateKey || ''}
              readonly
              rows={4}
              defaultRevealed={false}
              onReveal={markAsBackedUp}
            />
          </div>
          <div className={styles.footer}>
            {isCopied && (
              <Alert tone="success" floating>
                {t('copiedToClipboard')}
              </Alert>
            )}
            <Button onClick={onCopy} isFullWidth disabled={!privateKey}>
              {t('copyToClipboard')}
            </Button>
          </div>
        </div>
      );
    }

    if (activeTab === 'keystore') {
      return (
        <div className={styles.revealStep}>
          <div className={styles.content}>
            <Input
              type="password"
              placeholder={t('enterPassword')}
              value={password}
              onChange={setPassword}
              wrapClassName={styles.input}
            />
            <Input
              type="password"
              placeholder={t('confirmPassword')}
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={keystoreError || undefined}
              isError={!!keystoreError}
              wrapClassName={styles.input}
            />
          </div>
          <div className={styles.footer}>
            <Button
              onClick={handleDownloadKeystore}
              isFullWidth
              disabled={
                !password || !confirmPassword || isDownloading || !privateKey
              }
              loading={isDownloading}
            >
              {t('downloadJsonFile')}
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Logo />
      <div className={styles.container}>
        <Header
          leftContent={
            <Link to={ROUTES.MANAGE_WALLET.replace(':id', id || '')}>
              <ArrowLeftIcon />
            </Link>
          }
          title={t('backupWallet')}
        />
        <div className={styles.tabs}>
          {wallet?.encryptedMnemonic && (
            <Tab
              active={activeTab === 'mnemonic'}
              onClick={() => setActiveTab('mnemonic')}
              isFullWidth
            >
              {t('seedPhrase')}
            </Tab>
          )}
          <Tab
            active={activeTab === 'keystore'}
            onClick={() => setActiveTab('keystore')}
            isFullWidth
          >
            {t('keystore')}
          </Tab>
          <Tab
            active={activeTab === 'privateKey'}
            onClick={() => setActiveTab('privateKey')}
            isFullWidth
          >
            {t('privateKey')}
          </Tab>
        </div>
        {mnemonic || privateKey ? (
          renderContent()
        ) : (
          <div className={styles.loading}>{error || t('loading')}</div>
        )}
      </div>
    </>
  );
};

export default RevealSecretFlow;
