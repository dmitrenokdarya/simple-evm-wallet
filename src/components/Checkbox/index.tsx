import { memo, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  label?: string;
  isChecked?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onChange: () => void;
};

const Checkbox = ({
  className,
  labelClassName,
  wrapperClassName,
  label,
  isChecked,
  disabled,
  children,
  onChange,
  ...props
}: Props) => (
  <label
    className={clsx(styles.wrapper, wrapperClassName, {
      [styles.disabled]: disabled,
    })}
    tabIndex={0}
  >
    <input
      className={clsx(styles.checkbox, className)}
      checked={isChecked}
      type="checkbox"
      tabIndex={-1}
      disabled={disabled}
      onChange={onChange}
      {...props}
    />
    <span className={styles.icon} />
    {label && (
      <span className={clsx(styles.labelArea, labelClassName)}>
        {label}
      </span>
    )}
    {children}
  </label>
);

export default memo(Checkbox);
