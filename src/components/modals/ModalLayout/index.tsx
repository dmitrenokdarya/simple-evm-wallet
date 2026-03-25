import CloseIcon from 'assets/images/icons/close.svg';
import { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface ModalLayoutProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const ModalLayout = ({
  title, onClose, children, className,
}: ModalLayoutProps) => (
  <div className={styles.backdrop} onClick={onClose}>
    <div className={clsx(styles.modal, className)} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeBtn} onClick={onClose}>
        <CloseIcon />
      </button>
      <div className={styles.content}>
        <h1 className={styles.header}>{title}</h1>
        {children}
      </div>
    </div>
  </div>
);
