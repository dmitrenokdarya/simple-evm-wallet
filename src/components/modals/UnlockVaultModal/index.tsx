import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from 'assets/images/icons/close.svg';
import styles from './styles.module.scss';
import { unlockVault } from '../../../utils/vault';
import Header from '../../Header';
import Input from '../../Input';
import Button from '../../Button';

export type UnlockVaultModalProps = {
  onUnlocked: () => void;
  onCancel?: () => void;
  activeProfileId: string;
  subtitle?: string;
  onClose: () => void;
};

export const UnlockVaultModal = ({
  onCancel,
  onUnlocked,
  activeProfileId,
  subtitle,
  onClose,
}: UnlockVaultModalProps) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlock = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await unlockVault(password, activeProfileId);
      onUnlocked();
      onClose();
    } catch {
      setError(t('invalidPassword'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && password && !isLoading) {
      handleUnlock();
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <Header
          title={t('unlockWallet')}
          rightContent={
            <button onClick={handleCancel}>
              <CloseIcon />
            </button>
          }
        />
        <div className={styles.wrap}>
          <div className={styles.content}>
            {subtitle && <p className={styles.description}>{subtitle}</p>}
            <Input
              type="password"
              label={t('password')}
              value={password}
              onChange={setPassword}
              onKeyDown={onKeyDown}
              placeholder={t('enterPassword')}
              error={error || ''}
            />
          </div>
          <Button
            className={styles.unlockButton}
            onClick={handleUnlock}
            loading={isLoading}
            disabled={!password || isLoading}
            styleType="filledPrimary"
            isFullWidth
          >
            {t('confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(UnlockVaultModal);
