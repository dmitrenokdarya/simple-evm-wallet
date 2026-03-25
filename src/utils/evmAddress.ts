import { HDKey } from '@scure/bip32';
import { mnemonicToSeed } from '@scure/bip39';
import { ethers } from 'ethers';

export async function deriveEvmAddressFromMnemonic(
  mnemonic: string,
): Promise<string> {
  //Превращаем сид-фразу в seed
  const seed = await mnemonicToSeed(mnemonic);

  //Создаём мастер-ключ (BIP32)
  const masterKey = HDKey.fromMasterSeed(seed);

  //Деривируем путь для Ethereum: m/44'/60'/0'/0/0
  const ethKey = masterKey.derive("m/44'/60'/0'/0/0");

  //Получаем приватный ключ и адрес
  const privateKeyBytes = ethKey.privateKey;
  if (!privateKeyBytes) throw new Error('No private key derived');

  //Преобразуем Uint8Array в hex-строку
  //const privateKeyHex = '0x' + Buffer.from(privateKeyBytes).toString('hex');
  const privateKeyHex = `0x${Array.from(privateKeyBytes, (b) => b.toString(16).padStart(2, '0')).join('')}`;

  //Создаём кошелёк и возвращаем адрес
  const wallet = new ethers.Wallet(privateKeyHex);
  return wallet.address;
}
