import key from 'assets/images/key.png';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import skipSecure from 'assets/images/skip-secure.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Checkbox from '../../../components/Checkbox';
import { MODAL_NAME } from '../../../constants/modal.constants';
import { useModal } from '../../../context/modal.context';

type Props = {
  onStart: () => void;
};

const SkipSecurityContent = () => {
  const { showModal, hideModal } = useModal();
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);

  return (
    <div className={styles.modalContent}>
      <img className={styles.image} src={skipSecure} alt="Skip secure" />
      <h3>{t('skipAccountSecurity')}</h3>
      <Checkbox
        isChecked={agree}
        onChange={() => setAgree(!agree)}
        label={t('iUnderstandThatIfILoseMySeedPhrase')}
      />
      <div className={styles.footer}>
        <Button
          onClick={() => {
            navigate('/');
            hideModal(MODAL_NAME.CONFIRM_MODAL);
            showModal(MODAL_NAME.SUCCESS_MODAL, {
              subtitle: t('yourAreReadyToUseBlackFortWallet'),
            });
          }}
          disabled={!agree}
          styleType="filledHighlighted"
          isFullWidth
        >
          {t('skip')}
        </Button>

        <Button
          onClick={() => hideModal(MODAL_NAME.CONFIRM_MODAL)}
          styleType="filledPrimary"
          isFullWidth
        >
          {t('secureNow')}
        </Button>
      </div>
    </div>
  );
};

export const IntroStep = ({ onStart }: Props) => {
  const { showModal, hideModal } = useModal();

  const showSeedPhraseInfoModal = () => {
    showModal(MODAL_NAME.CONFIRM_MODAL, {
      content:
  <div className={styles.modalContent}>
    <h3>{t('whatIsSeedPhrase')}</h3>
    <div className={styles.info}>
      <Trans i18nKey="seedPhraseInfo">
        <p>text1</p>
        <p>text2</p>
        <p>text3</p>
      </Trans>
    </div>
  </div>,
      primaryButton: {
        onClick: () => hideModal(MODAL_NAME.CONFIRM_MODAL),
        text: t('gotIt'),
      },
    });
  };

  const remindMeLaterModal = () => {
    showModal(MODAL_NAME.CONFIRM_MODAL, {
      content: <SkipSecurityContent />,
    });
  };

  return (
    <div className={styles.introStep}>
      <div className={styles.content}>
        <img src={key} alt="key" className={styles.keyImg} />
        <h2>{t('secureYourWalletWithSeedPhrase')}</h2>
        <div className={styles.description}>
          <Trans i18nKey="protectYourWalletBySavingYourSeedPhrase">
            Protect your wallet by saving your
            <button onClick={showSeedPhraseInfoModal}>Seed phrase</button> in a place you trust.
          </Trans>
        </div>
        <Alert tone="alert">
          {t('itIsTheOnlyWayToRecoverYourWalletIfYouGetLockedOut')}
        </Alert>
      </div>
      <div className={styles.actions}>
        <Button
          styleType="filledHighlighted"
          onClick={remindMeLaterModal}
          isFullWidth
        >
          {t('remindMeLater')}
        </Button>
        <Button
          onClick={onStart}
          isFullWidth
        >
          {t('start')}
        </Button>
      </div>
    </div>
  );
};
