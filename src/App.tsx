import Header from './components/Header';
import Tabs from './containers/Tabs';
import WalletBalance from './containers/WalletBalance';
import './assets/styles/global.scss'

function App() {
  return (
    <div>
      <Header />
      <WalletBalance />
      <Tabs />
    </div>
  );
}

export default App;
