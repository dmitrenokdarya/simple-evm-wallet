import BigNumber from 'bignumber.js';

export function calculateFiatAmount(
  amountWei: string | number,
  decimals: number,
  price: number | string | undefined,
): number {
  if (!price || new BigNumber(price).isZero()) return 0;
  const amount = new BigNumber(amountWei).dividedBy(
    new BigNumber(10).pow(decimals),
  );
  return amount.multipliedBy(price).toNumber();
}

type FiatFormatOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useThreshold?: boolean;
};

export function formatFiat(
  value: number | null | undefined,
  options: FiatFormatOptions = {},
): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return '-';

  let { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;

  if (value > 0 && value < 0.01) {
    const log10 = Math.floor(Math.log10(value));
    const precision = Math.abs(log10);
    minimumFractionDigits = precision;
    maximumFractionDigits = precision;
  }

  if (options.useThreshold && value > 0 && value < 0.01) {
    return '<0.01';
  }

  try {
    return value.toLocaleString('en-US', {
      minimumFractionDigits,
      maximumFractionDigits: Math.max(
        maximumFractionDigits,
        minimumFractionDigits,
      ),
    });
  } catch {
    return value.toFixed(
      Math.max(minimumFractionDigits, Math.min(20, maximumFractionDigits)),
    );
  }
}

type AmountFormatOptions = {
  fractionDigits?: number;
  trimZeros?: boolean;
  group?: boolean;
};

function insertGrouping(intPart: string): string {
  const sign = intPart.startsWith('-') ? '-' : '';
  const pure = sign ? intPart.slice(1) : intPart;
  return sign + pure.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatAmount(
  amount: string | number,
  decimals: number,
  opts: AmountFormatOptions = {},
): string {
  const {
    fractionDigits = Math.min(4, Math.max(decimals, 0)),
    trimZeros = true,
    group = true,
  } = opts;
  if (decimals <= 0) {
    const asStr = String(amount ?? '0');
    return group ? insertGrouping(asStr) : asStr;
  }

  let s = String(amount ?? '0').trim();
  if (s.includes('.')) {
    s = new BigNumber(s).toFixed(0);
  }
  if (!/^\d+$/.test(s)) {
    s = s.replace(/[^0-9]/g, '') || '0';
  }

  if (s.length <= decimals) {
    s = s.padStart(decimals + 1, '0');
  }

  const intPartRaw = s.slice(0, s.length - decimals) || '0';
  const fracFull = s.slice(-decimals);

  const intPart = group ? insertGrouping(intPartRaw) : intPartRaw;

  const maxFrac = Math.max(0, Math.min(decimals, fractionDigits));
  let frac = maxFrac > 0 ? fracFull.slice(0, maxFrac) : '';
  if (trimZeros && frac) {
    frac = frac.replace(/0+$/g, '');
  }
  return frac ? `${intPart}.${frac}` : intPart;
}
