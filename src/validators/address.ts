
export const isValidAddress = (value: string): boolean => {
  if (!value) return false;

  // ENS validation (для .eth)
  if (/\.eth$/.test(value)) return true;

  // EVM адрес: 0x + 40 hex символов
  return /^0x[a-fA-F0-9]{40}$/.test(value);
};

// export const isValidAddress = (value: string, chainId?: CHAIN): boolean => {
//   if (!value) return false;

//   // ENS validation (primarily for EVM chains, but keeping it general as before)
//   if (/\.(eth|bxn|sol|bnb)$/.test(value)) return true;

//   switch (chainId) {
//     case CHAIN.BTC:
//       // BTC: Bech32 (bc1), P2SH (3), P2PKH (1)
//       return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(value);
//     case CHAIN.LTC:
//       // LTC: Bech32 (ltc1), P2SH (3/M), P2PKH (L)
//       return /^(ltc1|[LM3])[a-zA-HJ-NP-Z0-9]{26,45}$/.test(value);
//     case CHAIN.TRON:
//       // Tron: starts with T, base58, 34 chars
//       return /^T[a-zA-HJ-NP-Z0-9]{33}$/.test(value);
//     case CHAIN.SOLANA:
//       // Solana: base58, 32-44 chars
//       return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
//     case CHAIN.XRP:
//       // XRP classic address: starts with r, base58, 25-35 chars
//       return /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(value);
//     case CHAIN.DOT:
//       return isValidDotAddress(value);
//     case CHAIN.TON:
//       try {
//         Address.parse(value);
//         return true;
//       } catch {
//         return false;
//       }
//     // case CHAIN.POLYGON:
//     case CHAIN.BXN:
//     case CHAIN.ETH:
//     case CHAIN.BSC:
//     default:
//       // Basic EVM address validation (0x followed by 40 hex chars)
//       return /^0x[a-fA-F0-9]{40}$/.test(value);
//   }
// };
