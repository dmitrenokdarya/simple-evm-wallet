import { type ChangeEventHandler, memo, useMemo, useState } from 'react';
import CloseEyeIcon from 'assets/images/icons/close-eye.svg';
import clsx from 'clsx';
import styles from './styles.module.scss';
import TextArea from '../TextArea';

type Props = {
  value: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  readonly?: boolean;
  wrapperClassName?: string;
  innerWrapClassName?: string;
  textAreaClassName?: string;
  toggleButtonClassName?: string;
  defaultRevealed?: boolean;
  onReveal?: () => void;
};

const RevealableTextArea = ({
  value,
  onChange,
  rows,
  readonly,
  wrapperClassName,
  innerWrapClassName,
  textAreaClassName,
  toggleButtonClassName,
  defaultRevealed = false,
  onReveal,
}: Props) => {
  const [revealed, setRevealed] = useState(!!defaultRevealed);

  const overlay = useMemo(
    () => (revealed ? null : <div className={styles.overlay} />),
    [revealed],
  );

  const toggleReveal = () => {
    setRevealed((v) => {
      const next = !v;
      if (next && onReveal) {
        onReveal();
      }
      return next;
    });
  };

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <div className={clsx(styles.textAreaWrap, innerWrapClassName)}>
        {overlay}
        <TextArea
          value={value}
          onChange={onChange}
          rows={rows}
          readonly={readonly}
          className={clsx(styles.textArea, textAreaClassName)}
        />
      </div>
      <button
        className={clsx(
          styles.toggleButton,
          toggleButtonClassName,
          revealed && styles.revealed,
        )}
        onClick={toggleReveal}
      >
        <CloseEyeIcon />
      </button>
    </div>
  );
};

export default memo(RevealableTextArea);
