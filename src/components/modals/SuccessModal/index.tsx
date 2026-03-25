import { memo, type ReactNode } from 'react';
import { t } from 'i18next';
import CloseIcon from 'assets/images/icons/close.svg';
import successIcon from 'assets/images/success.png';
import styles from './styles.module.scss';
import type { BaseModalType } from '../types';
import Header from '../../Header';
import Button from '../../Button';

export type SuccessModalProps = {
  onConfirm?: () => void;
  title?: string;
  subtitle?: string;
  content?: ReactNode;
} & BaseModalType;

export const SuccessModal = ({
  onConfirm,
  onClose,
  title,
  subtitle,
  content,
}: SuccessModalProps) => {
  const handleSuccess = () => {
    onConfirm?.();
    onClose();
  };

  const onBackdropClick = () => onClose?.();

  return (
    <div
      className={styles.backdrop}
      onClick={onBackdropClick}
      role="button"
      tabIndex={0}
      aria-label="Dismiss modal"
    >
      <div className={styles.modal}>
        <Header
          rightContent={
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          }
        />
        <div className={styles.content}>
          <div className={styles.texts}>
            <img
              className={styles.successImage}
              src={successIcon}
              alt="Success Icon"
            />
            <h2>{title || t('success')}</h2>
            {subtitle && <p>{subtitle}</p>}
            {content}
          </div>
          <Button onClick={handleSuccess} styleType="filledPrimary" isFullWidth>
            {t('goToWallet')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(SuccessModal);
