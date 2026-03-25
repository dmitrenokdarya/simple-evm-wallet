import {
  memo,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type SyntheticEvent,
  type MouseEvent,
} from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import Loader from '../Loader';

type Props = ComponentPropsWithoutRef<'button'> & {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  onClick?: (e: SyntheticEvent) => void | Promise<void> | null;
  active?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  isFullWidth?: boolean;
  styleType?: 'primary' | 'secondary';
};

const Tab = ({
  className = '',
  onClick = () => null,
  children = null,
  disabled = false,
  loading = false,
  active = false,
  leftContent,
  rightContent,
  isFullWidth = false,
  styleType = 'primary',
  ...props
}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={clsx(
        styles.button,
        styles[styleType],
        { [styles.active]: active },
        { [styles.fullWidth]: isFullWidth },
        className,
      )}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      ref={buttonRef}
      {...props}
    >
      {loading && <Loader size="16" />}
      {leftContent && <div className={styles.addContent}>{leftContent}</div>}
      {children}
      {rightContent && <div className={styles.addContent}>{rightContent}</div>}
    </button>
  );
};

export default memo(Tab);
