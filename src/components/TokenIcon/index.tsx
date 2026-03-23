/* eslint-disable react-hooks/set-state-in-effect */
import { type ReactNode, useEffect, useState } from 'react';
import Eth20Token from '../../assets/images/icons/eth.svg';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  icon?: ReactNode | string;
  symbol?: string;
  tokenType?: string;
  chain?: string;
  size?: 'md' | 'sm';
  className?: string;
};

export const TokenIcon = ({
  icon,
  symbol,
  tokenType = 'eth',
  chain = 'eth',
  size = 'md',
  className,
}: Props) => {
  const [isIconError, setIsIconError] = useState(false);

  useEffect(() => {
    if (icon) setIsIconError(false);
  }, [icon]);

  const getFallbackIcon = () => {
    const normalizedType = tokenType?.toLowerCase();
    if (normalizedType?.includes('erc-20')) return <Eth20Token />;

    switch (chain?.toLowerCase()) {
      case 'eth':
        return <Eth20Token />;
    }
  };

  if (!icon || isIconError) {
    return (
      <div className={clsx(styles.tokenIcon, styles[size], className)}>
        {getFallbackIcon()}
      </div>
    );
  }

  if (typeof icon === 'string') {
    return (
      <div className={clsx(styles.tokenIcon, styles[size], className)}>
        <img src={icon} alt={symbol} onError={() => setIsIconError(true)} />
      </div>
    );
  }

  return <div className={clsx(styles.tokenIcon, className)}>{icon}</div>;
};
