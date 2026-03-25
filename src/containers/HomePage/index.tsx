import { useState } from 'react';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import { useWallets } from '../../context/wallets.context';
import AuthButtons from './AuthButtons';
import BurgerIcon from 'assets/images/icons/burger.svg';
import { SidePanel } from '../../components/SidePanel';
import styles from './styles.module.scss';
import WalletBalance from './WalletBalance';
import { Currency } from './Currency';

const HomePage = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const { wallets } = useWallets();
  const hasWallet = wallets.length > 0;

  return (
    <>
      <Logo />
      <div className={styles.mainContent}>
        <Header
          leftContent={
            hasWallet && (
              <button type="button" onClick={() => setPanelOpen(true)}>
                <BurgerIcon />
              </button>
            )
          }
        />
        <SidePanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
        <WalletBalance />
        <AuthButtons />
        <Currency />
      </div>
    </>
  );
};

export default HomePage;
