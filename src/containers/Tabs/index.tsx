import Button from '../../components/Button';
import styles from './styles.module.scss';

const Tabs = () => {
  return (
    <div className={styles.tabsBox}>
      <Button content="Create a New Wallet" />
      <Button content="Import Wallet" />
    </div>
  );
};

export default Tabs;
