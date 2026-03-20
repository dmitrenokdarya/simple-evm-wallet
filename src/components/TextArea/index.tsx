import {
  memo,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

type Props = ComponentPropsWithoutRef<'textarea'> & {
  classNameWrapper?: string;
  className?: string;
  label?: ReactNode | string;
  error?: string;
  errorPositionAbsolute?: boolean;
  readonly?: boolean;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
  withAsterisk?: boolean;
  transparent?: boolean;
  isNumber?: boolean;
  defaultPlaceholder?: boolean;
  maxDecimals?: number;
  withComas?: boolean;
  noBackground?: boolean;
  isRequired?: boolean;
  wrapClassName?: string;
};

const TextArea = ({
  classNameWrapper,
  className,
  value,
  name,
  label,
  onChange,
  disabled,
  error,
  placeholder,
  leftContent,
  rightContent,
  errorPositionAbsolute,
  readonly,
  autoComplete,
  withAsterisk,
  transparent,
  defaultPlaceholder,
  noBackground,
  isRequired,
  wrapClassName,
  ...props
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
  };

  return (
    <div className={cn(styles.containerWrapper, classNameWrapper, wrapClassName)}>
      {label && (
        <label htmlFor={name} className={styles.textLabel}>
          {label}
          {(withAsterisk || isRequired) && <span className={styles.symbol}>*</span>}
        </label>
      )}
      <div
        className={cn(styles.inputWrapper, className, {
          [styles.error]: !!error,
          [styles.leftIcon]: !!leftContent,
          [styles.rightIcon]: !!rightContent,
          [styles.readonly]: readonly,
          [styles.noBackground]: noBackground,
          [styles.transparent]: transparent,
        })}
        data-disabled={disabled || null}
      >
        {leftContent && <div className={styles.leftContent}>{leftContent}</div>}
        <textarea
          id={name}
          name={name}
          className={cn(styles.textArea, {
            [styles.defaultPlaceholder]: defaultPlaceholder,
          })}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          value={value?.toString()}
          {...(readonly ? { tabIndex: -1 } : null)}
          autoComplete={autoComplete}
          rows={3}
          {...props}
        />
        {rightContent && (
          <div className={styles.rightContent}>{rightContent}</div>
        )}
      </div>
      {error && !transparent && (
        <div
          className={cn(styles.textError, {
            [styles.errorPositionAbsolute]: errorPositionAbsolute,
          })}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default memo(TextArea);
