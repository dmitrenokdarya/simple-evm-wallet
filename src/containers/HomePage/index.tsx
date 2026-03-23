import Logo from '../../components/Logo';
import AuthButtons from './AuthButtons';
import WalletBalance from './WalletBalance';

const HomePage = () => {
  return (
    <div>
      <Logo />
      <WalletBalance />
      <AuthButtons />
    </div>
  );
};

export default HomePage;
