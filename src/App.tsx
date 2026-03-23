import { Routes, Route } from 'react-router-dom';
import './assets/styles/global.scss';
import HomePage from './containers/HomePage';
import { ROUTES } from './constants/routes.constants';
import CreateWallet from './containers/CreateWallet';
import { SeedBackupFlow } from './containers/SeedBackupFlow';

function App() {
  return (
    <Routes>
      <Route>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.CREATE_WALLET} element={<CreateWallet />} />
        <Route path={ROUTES.SHOW_SEED} element={<SeedBackupFlow />} />
        {/* <Route path={ROUTES.IMPORT_WALLET} element={<ImportWallet />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
