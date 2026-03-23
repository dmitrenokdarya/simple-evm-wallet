import { type ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  leftContent?: ReactNode
  rightContent?: ReactNode
  title?: ReactNode
};

const Header = ({
  title, leftContent, rightContent,
}: Props) => (
  <header className={styles.header}>
    <div className={styles.leftContent}>
      {leftContent}
    </div>
    <div className={styles.titleContainer}>
      {title}
    </div>
    <div className={styles.rightContent}>
      {rightContent}
    </div>
  </header>
);

export default Header;
