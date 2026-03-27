/* eslint-disable react-refresh/only-export-components */
import { Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from '@tanstack/react-query';
import './assets/styles/global.scss';
import HomePage from './containers/HomePage';
import { ROUTES } from './constants/routes.constants';
import CreateWallet from './containers/CreateWallet';
import { SeedBackupFlow } from './containers/SeedBackupFlow';
import MyWallets from './containers/MyWallets';
import ManageWallet from './containers/ManageWallet';
import RevealSecretFlow from './containers/RevealSecretFlow';
import CustomizeWallet from './containers/CustomizeWallet';
import DeleteWalletPage from './containers/DeleteWallet';
import ImportWalletPage from './containers/ImportWalletPage';
import SendTokens from './containers/SendTokens';

export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retryOnMount: false,
    },
  },
};

const queryClient = new QueryClient(queryConfig);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.CREATE_WALLET} element={<CreateWallet />} />
        <Route path={ROUTES.SHOW_SEED} element={<SeedBackupFlow />} />
        <Route path={ROUTES.MY_WALLETS} element={<MyWallets />} />
        <Route path={ROUTES.MANAGE_WALLET} element={<ManageWallet />} />
        <Route path={ROUTES.RECOVERY_PHRASE} element={<RevealSecretFlow />} />
        <Route path={ROUTES.DELETE_WALLET} element={<DeleteWalletPage />} />
        <Route
          path={ROUTES.SIGN_IN_IMPORT_WALLET}
          element={<ImportWalletPage />}
        />
        <Route
          path={ROUTES.IMPORT_WALLET_CUSTOMIZE}
          element={<CustomizeWallet />}
        />
        {/* <Route path={ROUTES.RECEIVE} element={<ReceiveTokensList />} /> */}
        <Route path={ROUTES.SEND} element={<SendTokens />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
