import Header from '../../components/Header';
import AuthButtons from './AuthButtons';
import WalletBalance from './WalletBalance';

const HomePage = () => {
  return (
    <div>
      <Header />
      <WalletBalance />
      <AuthButtons />
    </div>
  );
};

export default HomePage;
