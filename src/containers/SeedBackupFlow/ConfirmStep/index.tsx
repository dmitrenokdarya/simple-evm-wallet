/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  memo, useCallback, useState,
} from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import styles from './styles.module.scss';
import RevealableTextArea from '../../../components/RevealableTextArea';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Alert from '../../../components/Alert';
import { TERMS_AND_CONDITIONS_URL } from '../../../constants/links.constants';
import { MnemonicUtils } from '../../../hooks/useCreateLocalWallet';

type Props = {
  originalMnemonic: string;
  onComplete: () => void;
};

const ConfirmStep = ({ originalMnemonic, onComplete }: Props) => {
  const [text, setText] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPaste = useCallback(async () => {
    try {
      setText(originalMnemonic);
    } catch (e: any) {
      console.log(e);
    }
  }, [originalMnemonic]);

  const normalizedOriginal = MnemonicUtils.normalizeMnemonic(originalMnemonic || '');
  const normalizedInput = MnemonicUtils.normalizeMnemonic(text || '');
  const hasInput = !!normalizedInput;
  const isMatch = !!normalizedOriginal && normalizedOriginal === normalizedInput;
  const canSubmit = isMatch && agree && !loading;

  const submit = useCallback(async () => {
    setLoading(true);
    try {
      const a = MnemonicUtils.normalizeMnemonic(originalMnemonic || '');
      const b = MnemonicUtils.normalizeMnemonic(text || '');
      if (!a || a !== b) {
        console.log(t('seedDoesNotMatch'));
        return;
      }
      if (!agree) return;
      onComplete();
    } finally {
      setLoading(false);
    }
  }, [agree, originalMnemonic, text, onComplete]);

  return (
    <div className={styles.confirmStep}>
      <div className={styles.content}>
        <h2>{t('confirmSeedPhrase')}</h2>
        <p className={styles.description}>
          {t('enterSeedPhraseToConfirm')}
        </p>
        <div>
          <RevealableTextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            defaultRevealed
          />
          <Button
            onClick={onPaste}
            styleType="text"
            className={styles.pasteButton}
          >
            {t('paste')}
          </Button>
        </div>
        <div>
          <Checkbox wrapperClassName={styles.checkbox} isChecked={agree} onChange={() => setAgree((v) => !v)}>
            <div>
              <Trans
                i18nKey="iUnderstandThatIfILoseMySeedPasswordAgreement"
                components={[
                  <a
                    key="terms"
                    href={TERMS_AND_CONDITIONS_URL}
                    target="_blank"
                    rel="noreferrer"
                  >text1
                  </a>,
                  <a
                    key="privacy"
                    href={TERMS_AND_CONDITIONS_URL}
                    target="_blank"
                    rel="noreferrer"
                  >text2
                  </a>,
                ]}
              />
            </div>
          </Checkbox>
        </div>
      </div>
      <div className={styles.footer}>
        {hasInput && !isMatch && (
          <Alert tone="alert" floating>
            {t('invalidSeedPhrasePleaseTryAgain')}
          </Alert>
        )}
        <Button
          disabled={!canSubmit}
          onClick={submit}
          isFullWidth
        >
          {t('completeBackUp')}
        </Button>
      </div>
    </div>
  );
};

export default memo(ConfirmStep);
