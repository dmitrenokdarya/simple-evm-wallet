import { keccak_256 } from '@noble/hashes/sha3.js';

export type KeystoreCrypto = {
  cipher: 'aes-128-ctr';
  cipherparams: { iv: string };
  ciphertext: string;
  kdf: 'pbkdf2';
  kdfparams: {
    dklen: number; 
    c: number;
    prf: 'hmac-sha256';
    salt: string; 
  };
  mac: string; 
};

export type KeystoreV3 = {
  version: 3;
  id: string;
  address: string; 
  crypto: KeystoreCrypto;
};

function hexToBytes(hex: string): Uint8Array {
  const h = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (h.length % 2 !== 0) throw new Error('Invalid hex');
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i += 1) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function pbkdf2Sha256(password: Uint8Array, salt: Uint8Array, iterations: number, dkLen: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', password.buffer as ArrayBuffer, { name: 'PBKDF2' }, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2', salt: salt.buffer as ArrayBuffer, iterations, hash: 'SHA-256',
  }, key, dkLen * 8);
  return new Uint8Array(bits);
}

async function aes128CtrEncrypt(key: Uint8Array, iv: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey('raw', key.buffer as ArrayBuffer, { name: 'AES-CTR' }, false, ['encrypt']);
  const res = await crypto.subtle.encrypt({ name: 'AES-CTR', counter: iv.buffer as ArrayBuffer, length: 128 }, cryptoKey, data.buffer as ArrayBuffer);
  return new Uint8Array(res);
}

export async function encryptPrivateKeyToKeystore(privateKeyHex: string, password: string, addressLowerHex: string, iterations = 262144): Promise<KeystoreV3> {
  const id = crypto.randomUUID();
  const dklen = 32;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const derived = await pbkdf2Sha256(new TextEncoder().encode(password), salt, iterations, dklen);
  const encKey = derived.slice(0, 16);
  const macKey = derived.slice(16, 32);
  const pkBytes = hexToBytes(privateKeyHex);
  const ct = await aes128CtrEncrypt(encKey, iv, pkBytes);
  const mac = keccak_256(new Uint8Array([...macKey, ...ct]));
  const ks: KeystoreV3 = {
    version: 3,
    id,
    address: addressLowerHex.toLowerCase().replace(/^0x/, ''),
    crypto: {
      cipher: 'aes-128-ctr',
      cipherparams: { iv: bytesToHex(iv) },
      ciphertext: bytesToHex(ct),
      kdf: 'pbkdf2',
      kdfparams: {
        dklen,
        c: iterations,
        prf: 'hmac-sha256',
        salt: bytesToHex(salt),
      },
      mac: bytesToHex(mac),
    },
  };
  return ks;
}


// async function aes128CtrDecrypt(key: Uint8Array, iv: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
//   const cryptoKey = await crypto.subtle.importKey('raw', key.buffer as ArrayBuffer, { name: 'AES-CTR' }, false, ['decrypt']);
//   const res = await crypto.subtle.decrypt({ name: 'AES-CTR', counter: iv.buffer as ArrayBuffer, length: 128 }, cryptoKey, data.buffer as ArrayBuffer);
//   return new Uint8Array(res);
// }

// export async function decryptPrivateKeyFromKeystore(json: string | KeystoreV3, password: string): Promise<string> {
//   const ks: KeystoreV3 = (typeof json === 'string' ? JSON.parse(json) : json) as KeystoreV3;
//   if (ks.version !== 3) throw new Error('Unsupported keystore version');
//   const { crypto: c } = ks;
//   if (c.kdf !== 'pbkdf2' || c.kdfparams.prf !== 'hmac-sha256') throw new Error('Unsupported KDF');
//   const salt = hexToBytes(c.kdfparams.salt);
//   const dk = await pbkdf2Sha256(new TextEncoder().encode(password), salt, c.kdfparams.c, c.kdfparams.dklen);
//   const encKey = dk.slice(0, 16);
//   const macKey = dk.slice(16, 32);
//   const iv = hexToBytes(c.cipherparams.iv);
//   const ciphertext = hexToBytes(c.ciphertext);
//   const mac = bytesToHex(keccak_256(new Uint8Array([...macKey, ...ciphertext])));
//   if (mac !== c.mac) throw new Error('Invalid password or corrupted keystore');
//   const pk = await aes128CtrDecrypt(encKey, iv, ciphertext);
//   return `0x${bytesToHex(pk)}`;
// }
