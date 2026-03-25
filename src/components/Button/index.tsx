import {
  memo,
  type MouseEvent,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type SyntheticEvent,
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
  styleType?: 'filledPrimary' | 'filledHighlighted' | 'text' | 'outline' | 'neutral' | 'round';
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  buttonType?: 'button' | 'submit' | 'reset';
  isFullWidth?: boolean;
  size?: 'large' | 'medium' | 'small';
};

const Button = ({
  className = '',
  onClick = () => null,
  children = null,
  disabled = false,
  loading = false,
  styleType = 'filledPrimary',
  leftContent,
  rightContent,
  buttonType = 'submit',
  isFullWidth = false,
  size = 'medium',
  ...props
}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // eslint-disable-next-line no-multi-assign
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add(styles.ripple);

    const ripple = button.getElementsByClassName(styles.ripple)[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      createRipple(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={clsx(
        styles.button,
        styles[styleType],
        styles[size],
        {
          [styles.loading]: loading,
          [styles.fullWidth]: isFullWidth,
        },
        className,
      )}
      onClick={handleClick}
      disabled={disabled}
      type={buttonType}
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

export default memo(Button);
