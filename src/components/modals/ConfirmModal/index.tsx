import { memo, type ReactNode } from 'react';
import CloseIcon from 'assets/images/icons/close.svg';
import styles from './styles.module.scss';
import type { BaseModalType } from '../types';
import Button from '../../Button';

type ButtonConfig = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export type ConfirmModalProps = BaseModalType & {
  content?: ReactNode;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
};

export const ConfirmModal = ({
  onClose,
  content,
  primaryButton,
  secondaryButton,
}: ConfirmModalProps) => {
  const onBackdropClick = () => onClose?.();

  return (
    <div
      className={styles.backdrop}
      onClick={onBackdropClick}
      role="button"
      tabIndex={0}
      aria-label="Dismiss modal"
    >
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="dialog"
        aria-modal
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className={styles.content}>{content}</div>

        {(primaryButton || secondaryButton) && (
          <div className={styles.footer}>
            {secondaryButton && (
              <Button
                onClick={secondaryButton.onClick}
                disabled={secondaryButton.disabled}
                styleType="filledHighlighted"
                isFullWidth
              >
                {secondaryButton.text}
              </Button>
            )}
            {primaryButton && (
              <Button
                onClick={primaryButton.onClick}
                disabled={primaryButton.disabled}
                styleType="filledPrimary"
                isFullWidth
              >
                {primaryButton.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ConfirmModal);
