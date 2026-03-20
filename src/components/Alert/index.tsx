import { memo, type ReactNode } from 'react';
import clsx from 'clsx';
import InfoIconSvg from 'assets/images/icons/info.svg';
import WarningIconSvg from 'assets/images/icons/wavy-warning.svg';
import OctagonCheckIconSvg from 'assets/images/icons/octagon-check.svg';
import styles from './styles.module.scss';

type Tone = 'success' | 'error' | 'alert';

type Props = {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  floating?: boolean;
  role?: 'status' | 'alert';
  ariaLive?: 'polite' | 'assertive' | 'off';
};

const DefaultIconByTone: Record<Tone, ReactNode> = {
  success: <OctagonCheckIconSvg />,
  error: <InfoIconSvg />,
  alert: <WarningIconSvg />,
};

const Alert = ({
  tone = 'alert',
  children,
  className,
  icon,
  floating,
  role = 'status',
  ariaLive = 'polite',
}: Props) => (
  <div
    className={clsx(
      styles.alert,
      styles[`tone_${tone}`],
      floating && styles.floating,
      className,
    )}
    role={role}
    aria-live={ariaLive}
  >
    <span className={styles.icon}>
      {icon ?? DefaultIconByTone[tone]}
    </span>
    <span className={styles.content}>{children}</span>
  </div>
);

export default memo(Alert);
