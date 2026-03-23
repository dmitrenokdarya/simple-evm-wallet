import GlobalLoader from 'assets/images/icons/global-loader.svg';
import styles from './styles.module.scss';

export const GlobalPageLoader = () => (
  <div className={styles.loaderContainer}>
    <GlobalLoader />
  </div>
);
