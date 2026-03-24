import RedIcon from 'assets/images/wallets/red.svg';
import PinkIcon from 'assets/images/wallets/pink.svg';
import GreenIcon from 'assets/images/wallets/green.svg';
import BlueIcon from 'assets/images/wallets/blue.svg';
import GrayIcon from 'assets/images/wallets/gray.svg';
import YellowIcon from 'assets/images/wallets/yellow.svg';
import OrangeIcon from 'assets/images/wallets/orange.svg';

export const WALLET_ICONS = [
  { id: 'wallet-a', img: <RedIcon />, alt: 'wallet icon A' },
  { id: 'wallet-b', img: <PinkIcon />, alt: 'wallet icon B' },
  { id: 'wallet-c', img: <GreenIcon />, alt: 'wallet icon C' },
  { id: 'wallet-d', img: <BlueIcon />, alt: 'wallet icon D' },
  { id: 'wallet-e', img: <GrayIcon />, alt: 'wallet icon E' },
  { id: 'wallet-f', img: <YellowIcon />, alt: 'wallet icon F' },
  { id: 'wallet-g', img: <OrangeIcon />, alt: 'wallet icon G' },
];

export const getWalletIconById = (id?: string | null) => WALLET_ICONS.find((i) => i.id === id)?.img || <GrayIcon />;

export const WALLET_IMPORT_FLOWS = {
  CONNECT_EXTERNAL: 'connect-external',
  CONNECT_AND_CREATE: 'connect-and-create',
  RECOVER_ACCOUNT: 'recover-account',
  IMPORT_FROM_ACCOUNT: 'import-from-account',
} as const;

export type FlowType = typeof WALLET_IMPORT_FLOWS[keyof typeof WALLET_IMPORT_FLOWS];

export const isConnectToCurrentProfile = (flow: string | null | undefined): boolean => (
  flow === WALLET_IMPORT_FLOWS.CONNECT_EXTERNAL || flow === WALLET_IMPORT_FLOWS.IMPORT_FROM_ACCOUNT
);
