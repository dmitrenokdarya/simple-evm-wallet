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
          {/* <Route path={ROUTES.MY_WALLETS} element={<MyWallets />} /> */}
          {/* <Route path={ROUTES.IMPORT_WALLET} element={<ImportWallet />} /> */}
        </Routes>
    </QueryClientProvider>
  );
}

export default App;
