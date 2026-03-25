import { memo } from 'react';
import clsx from 'clsx';
import LoadingIcon from 'assets/images/icons/loader.svg';
import styles from './styles.module.scss';

type Props = {
  className?: string
  centered?: boolean
  size?: '16' | '20' | '24' | '32'
  colorful?: boolean
};

const Loader = ({
  className, centered, size = '20', colorful = false,
}: Props) => (
  <LoadingIcon
    className={clsx(
      styles.loader,
      styles[`size-${size}`],
      { [styles.centered]: centered, [styles.colorful]: colorful },
      className,
    )}
  />
);

export default memo(Loader);
