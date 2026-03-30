export interface AesGcmBox {
  algo: 'AES-GCM';
  version: number; 
  cipherB64: string;
  ivB64: string;
}

export interface WalletRecord {
  id: string; // uuid
  profileId: string; // links to ProfileRecord.id
  // wallet type defines how addresses are managed
  // 'multi' wallets derive addresses for multiple chains from a single SRP
  // others are single-chain imported wallets
  type: 'evm';
  name?: string;
  iconId?: string;
  encryptedMnemonic?: AesGcmBox; // for mnemonic-based wallets
  encryptedPrivateKey?: AesGcmBox; // for imported keystore/private-key wallets
  address: string; // cached primary address to avoid decrypting for lists (EVM for multi)
  // optional cache of derived addresses per chain. For 'multi' it may contain many chains
  seedBackedUp: boolean;
  createdAt: number;
}

export interface WalletAddressRecord {
  network: 'eth';
  address: string;
}

export interface ContactRecord {
  id: string; // uuid
  profileId: string; // links to ProfileRecord.id
  name: string;
  avatar?: string; // base64 or blob url if stored locally, or just a placeholder
  wallets: WalletAddressRecord[];
  userId?: string;
  createdAt: number;
}