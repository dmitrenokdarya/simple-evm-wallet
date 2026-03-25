import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { WalletsProvider } from './context/wallets.context.tsx';
import './i18n';
import { ModalProvider } from './context/modal.context.tsx';
import { SettingsProvider } from './context/settings.context.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SettingsProvider>
      <ModalProvider>
        <WalletsProvider>
          <App />
        </WalletsProvider>
      </ModalProvider>
    </SettingsProvider>
  </BrowserRouter>,
);
