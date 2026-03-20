import { AUTH_FIELD_NAMES } from "../../constants/form/auth.constants";
import * as yup from 'yup';

export type WalletSecureFormValues = {
  [AUTH_FIELD_NAMES.PASSWORD]: string;
};

export type WalletSecureFormValuesCreate = WalletSecureFormValues & {
  [AUTH_FIELD_NAMES.CONFIRM_PASSWORD]: string;
  [AUTH_FIELD_NAMES.PASSWORD_AGREEMENT]: boolean;
};

export const DEFAULT_VALUES: WalletSecureFormValuesCreate = {
  [AUTH_FIELD_NAMES.PASSWORD]: '',
  [AUTH_FIELD_NAMES.CONFIRM_PASSWORD]: '',
  [AUTH_FIELD_NAMES.PASSWORD_AGREEMENT]: false,
};

export const getValidationSchemaCreate = (t: (key: string, options?: { count?: number; [key: string]: unknown }) => string) =>
  yup.object({
    [AUTH_FIELD_NAMES.PASSWORD]: yup
      .string()
      .required(t('fieldIsRequired'))
      .min(8, t('minLength', { count: 8 }))
      .matches(/[a-z]/, t('mustContainLowercase'))
      .matches(/[A-Z]/, t('mustContainUppercase'))
      .matches(/[0-9]/, t('mustContainNumber'))
      .matches(/[^A-Za-z0-9]/, t('mustContainSpecial')),
    [AUTH_FIELD_NAMES.CONFIRM_PASSWORD]: yup
      .string()
      .required(t('fieldIsRequired'))
      .oneOf([yup.ref(AUTH_FIELD_NAMES.PASSWORD)], t('passwordsMustMatch')),
    [AUTH_FIELD_NAMES.PASSWORD_AGREEMENT]: yup
      .boolean()
      .required()
      .oneOf([true], t('fieldIsRequired')),
  })
  .required();

export const getValidationSchemaUnlock = (t: (key: string) => string) =>
  yup.object({
    [AUTH_FIELD_NAMES.PASSWORD]: yup.string().required(t('passwordIsRequired')),
  })
  .required();