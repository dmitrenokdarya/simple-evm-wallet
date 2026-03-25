import {
  memo, useCallback, useState,
} from 'react';
import { t } from 'i18next';
import CopyIcon from 'assets/images/icons/copy.svg';
import styles from './styles.module.scss';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import RevealableTextArea from '../../../components/RevealableTextArea';

type Props = {
  mnemonic: string;
  onContinue: () => void;
};

const RevealStep = ({ mnemonic, onContinue }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      setIsCopied(true);
    } catch { /* noop */ }
  }, [mnemonic]);

  return (
    <div className={styles.revealStep}>
      <div className={styles.content}>
        <p className={styles.description}>
          {t('thisIsYourSeedPhrase')} {t('youLlBeAskedToReEnterThisPhrase')}
        </p>
        <RevealableTextArea
          value={mnemonic}
          readonly
          rows={4}
          defaultRevealed={false}
        />
        <button className={styles.copyButton} onClick={onCopy}>
          <CopyIcon />
          {t('copyToClipboard')}
        </button>
      </div>
      <div className={styles.footer}>
        {isCopied && (
          <Alert tone="success" floating>
            {t('copiedToClipboard')}
          </Alert>
        )}
        <Button
          disabled={!isCopied}
          onClick={onContinue}
          isFullWidth
        >
          {t('continue')}
        </Button>
      </div>
    </div>
  );
};

export default memo(RevealStep);
