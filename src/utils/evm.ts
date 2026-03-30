// Small EVM helpers for deriving an Ethereum address from a mnemonic
// Browser-friendly using @scure/* and @noble/* libs

import { mnemonicToSeedSync } from '@scure/bip39';
import { HDKey } from '@scure/bip32';
import { keccak_256 } from '@noble/hashes/sha3.js';
import * as secp from '@noble/secp256k1';

export const DEFAULT_EVM_PATH = "m/44'/60'/0'/0/0";

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// EIP-55 checksum for 20-byte hex address (without 0x)
export function toEip55(addressLowerHex: string): string {
  const cleanAddress = addressLowerHex.startsWith('0x') ? addressLowerHex.slice(2).toLowerCase() : addressLowerHex.toLowerCase();
  const hash = toHex(keccak_256(new TextEncoder().encode(cleanAddress)));
  let out = '0x';
  for (let i = 0; i < cleanAddress.length; i += 1) {
    const c = cleanAddress[i];
    // If char is letter [a-f], checksum depends on the hash nibble >= 8
    if (/[a-f]/.test(c)) {
      out += parseInt(hash[i], 16) >= 8 ? c.toUpperCase() : c;
    } else {
      out += c;
    }
  }
  return out;
}

export function deriveEvmAddressFromMnemonic(mnemonic: string, path: string = DEFAULT_EVM_PATH): string {
  const seed = mnemonicToSeedSync(mnemonic);
  const root = HDKey.fromMasterSeed(seed);
  const child = root.derive(path);
  if (!child.privateKey) {
    throw new Error('Failed to derive private key for the given path');
  }
  // Get uncompressed public key (65 bytes, 0x04 + X(32) + Y(32))
  const pub = secp.getPublicKey(child.privateKey, false);
  // Drop first byte (0x04)
  const pubNoPrefix = pub.slice(1);
  const hash = keccak_256(pubNoPrefix);
  const addrBytes = hash.slice(-20); // last 20 bytes
  const lower = toHex(addrBytes);
  return toEip55(lower);
}

export function deriveEvmAddressFromPrivateKey(privateKeyHex: string): string {
  const pk = privateKeyHex.startsWith('0x') ? privateKeyHex.slice(2) : privateKeyHex;
  const pkBytes = Uint8Array.from(pk.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
  const pub = secp.getPublicKey(pkBytes, false);
  const pubNoPrefix = pub.slice(1);
  const hash = keccak_256(pubNoPrefix);
  const addrBytes = hash.slice(-20);
  const lower = Array.from(addrBytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  return toEip55(lower);
}

export function deriveEvmPrivateKeyFromMnemonic(mnemonic: string, path: string = DEFAULT_EVM_PATH): string {
  const seed = mnemonicToSeedSync(mnemonic);
  const root = HDKey.fromMasterSeed(seed);
  const child = root.derive(path);
  if (!child.privateKey) throw new Error('Failed to derive private key for the given path');
  return `0x${toHex(child.privateKey)}`;
}