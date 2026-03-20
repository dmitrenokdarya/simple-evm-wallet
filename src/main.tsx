import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { WalletsProvider } from './context/wallets.context.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <WalletsProvider>
      <App />
    </WalletsProvider>
  </BrowserRouter>,
);
