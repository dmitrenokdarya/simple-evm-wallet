'use client';

import React, {
  memo, useRef, useState,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import OpenEyeIcon from 'assets/images/icons/eye.svg';
import CloseEyeIcon from 'assets/images/icons/close-eye.svg';
import styles from './styles.module.scss';

export interface TInputProps {
  name?: string;
  className?: string;
  value?: string | number;
  label?: ReactNode | string;
  additionalLabel?: ReactNode | string;
  error?: string;
  isError?: boolean;
  placeholder?: string;
  disabled?: boolean;
  errorPositionAbsolute?: boolean;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
  description?: ReactNode;
  transparent?: boolean;
  noBackground?: boolean;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoComplete?: 'on' | 'off';
  type?: string;
  readonly?: boolean;
  isRequired?: boolean;
  wrapClassName?: string;
  leftContentClassName?: string;
  mask?: string;
  maxDecimals?: number;
}

const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  ({
    name,
    className = '',
    value = '',
    label = '',
    error = '',
    isError,
    placeholder = '',
    disabled = false,
    errorPositionAbsolute = true,
    rightContent,
    leftContent,
    description = '',
    maxDecimals = 10,
    onClick = () => {},
    onChange = () => {},
    onBlur = () => {},
    autoComplete,
    type = 'text',
    readonly = false,
    isRequired = false,
    transparent = false,
    noBackground = false,
    wrapClassName = '',
    additionalLabel,
    leftContentClassName,
    ...props
  }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    React.useImperativeHandle(ref, () => internalRef.current!);

    const isPassword = type === 'password';
    const isNumber = type === 'number';

    const sanitizeNumberValue = (raw: string, decimals: number): string => {
      let next = raw.replace(/,/g, '.');
      next = next.replace(/[^0-9.]/g, '');
      const [firstPart, ...rest] = next.split('.');
      const intPart = `${
        Number(firstPart) > Number.MAX_SAFE_INTEGER ? firstPart.slice(0, -1) : firstPart
      }`;
      const decimalPart = rest.length ? rest.join('').slice(0, decimals) : '';
      return rest.length ? `${intPart}.${decimalPart}` : intPart;
    };

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isNumber) {
        const sanitized = sanitizeNumberValue(e.target.value, maxDecimals);
        onChange?.(sanitized);
        return;
      }
      onChange(e.target.value);
    };

    const handleEyeClick = () => {
      setShowPassword((prev) => !prev);
      internalRef.current?.focus();
    };

    return (
      <div className={clsx(styles.containerWrapper, wrapClassName)}>
        {(label || additionalLabel) && (
        <div className={styles.labelWrapper}>
          {label && (
          <label htmlFor={name} className={styles.textLabel}>
            {label}
            {isRequired && <span className={styles.symbol}>*</span>}
          </label>
          )}
          {additionalLabel}
        </div>
        )}
        <div
          className={clsx(styles.inputWrapper, className, {
            [styles.error]: !!error,
            [styles.error]: isError,
            [styles.leftIcon]: !!leftContent,
            [styles.rightIcon]: !!rightContent,
            [styles.readonly]: readonly,
            [styles.clickable]: !!onClick,
            [styles.noBackground]: noBackground,
            [styles.transparent]: transparent,
          })}
          data-disabled={disabled || null}
        >
          {leftContent && (
            <div className={clsx(styles.leftContent, leftContentClassName)}>
              {leftContent}
            </div>
          )}

          <input
            {...(readonly ? { tabIndex: -1 } : {})}
            {...props}
            onClick={onClick}
            onMouseDown={(e) => {
              if (readonly) e.preventDefault(); // prevent focus on click, but keep onClick working
            }}
            onTouchStart={(e) => {
              if (readonly) e.preventDefault(); // same for touch devices
            }}
            ref={internalRef}
            id={name}
            name={name}
            className={styles.input}
            value={value}
            onChange={handleNumberInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            autoComplete={autoComplete}
            type={isNumber || showPassword ? 'text' : type}
          />

          {(rightContent || isPassword) && (
            <div className={styles.rightContent}>
              {isPassword ? (
                <button
                  type="button"
                  onClick={handleEyeClick}
                  className={styles.rightContent}
                >
                  {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClick}
                  className={styles.rightContent}
                >
                  {rightContent}
                </button>
              )}
            </div>
          )}
        </div>

        {error && !transparent && (
          <div
            className={clsx(styles.textError, {
              [styles.errorPositionAbsolute]: errorPositionAbsolute,
            })}
          >
            {error}
          </div>
        )}

        {!error && description && <div className={styles.description}>{description}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default memo(Input);
