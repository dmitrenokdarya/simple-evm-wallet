import * as yup from 'yup';
import { t } from 'i18next';

export const MAX_WALLET_NAME_LENGTH = 18;

export const walletNameValidation = (translate: typeof t) => yup
  .string()
  .trim()
  .required(translate('fieldIsRequired'))
  .max(MAX_WALLET_NAME_LENGTH, translate('maxLength', { count: MAX_WALLET_NAME_LENGTH }));

const normalizeWalletName = (value: string) => value.trim().toLowerCase();

type IsWalletNameDuplicateParams = {
  walletName: string;
  existingWalletNames: string[];
  ignoredWalletName?: string;
};

export const isWalletNameDuplicate = ({
  walletName,
  existingWalletNames,
  ignoredWalletName,
}: IsWalletNameDuplicateParams) => {
  const normalizedWalletName = normalizeWalletName(walletName);
  if (!normalizedWalletName) {
    return false;
  }

  const normalizedIgnoredWalletName = ignoredWalletName
    ? normalizeWalletName(ignoredWalletName)
    : null;

  if (normalizedIgnoredWalletName && normalizedWalletName === normalizedIgnoredWalletName) {
    return false;
  }

  return existingWalletNames.some((name) => normalizeWalletName(name) === normalizedWalletName);
};
