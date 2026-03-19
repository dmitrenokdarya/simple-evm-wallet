import Button from '../../components/Button';
import styles from './styles.module.scss';

const WalletBalance = () => {
  return (
    <div className={styles.wallet}>
      <div className={styles.label}>No wallet added</div>
      <div className={styles.balance}>
        <span>--</span>
      </div>
      <div className={styles.info}>
        <span>+$ 0.00</span>
        <span>-0.00%</span>
        <span>24h</span>
      </div>
      <div className={styles.actions}>
        <div className={styles.action}>
          <Button content="->" buttonStyleType="round" disabled/>
          <span>SEND</span>
        </div>
        <div className={styles.action}>
          <Button content="<-" buttonStyleType="round" disabled/>
          <span>RECEIVE</span>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
