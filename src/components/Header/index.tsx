import BlackfortWallet from '../../assets/images/blackfort-logo.svg';
import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <BlackfortWallet />
    </header>
  );
};

export default Header;
