import * as yup from 'yup';
import { t } from 'i18next';
import { isValidAddress } from '../../validators/address';

export const SEND_FIELD_NAMES = {
  AMOUNT: 'amount',
  IS_USD_MODE: 'isUsdMode',
  TO: 'to',
  //MEMO: 'memo',
} as const;

export type SendFormValues = {
  amount: string;
  isUsdMode: boolean;
  to: string;
  //memo?: string;
};

export const getValidationSchema = () => yup.object().shape({
  amount: yup
    .string()
    .required(t('fieldIsRequired'))
    .test('is-positive', t('fieldIsInvalid'), (value) => {
      const num = Number(value);
      return !Number.isNaN(num) && num > 0;
    }),
  isUsdMode: yup.boolean().default(false),
  to: yup
    .string()
    .required(t('fieldIsRequired'))
    .test('is-valid-address', t('fieldIsInvalid'), (value) => isValidAddress(value || '')),
  //memo: yup.string().optional(),
});

export const DEFAULT_VALUES: SendFormValues = {
  amount: '',
  isUsdMode: false,
  to: '',
  //memo: '',
};

// import * as yup from 'yup';
// import { t } from 'i18next';
// import { CHAIN } from 'constants/chains.constants';
// import { isValidAddress } from 'validators/address';

// export enum SEND_FIELD_NAMES {
//   AMOUNT = 'amount',
//   IS_USD_MODE = 'isUsdMode',
//   TO = 'to',
//   MEMO = 'memo',
// }

// export type SendFormValues = {
//   [SEND_FIELD_NAMES.AMOUNT]: string;
//   [SEND_FIELD_NAMES.IS_USD_MODE]: boolean;
//   [SEND_FIELD_NAMES.TO]: string;
//   [SEND_FIELD_NAMES.MEMO]?: string;
// };

// export const getValidationSchema = (chainId?: CHAIN) => yup.object().shape({
//   [SEND_FIELD_NAMES.AMOUNT]: yup
//     .string()
//     .required(t('fieldIsRequired'))
//     .test('is-positive', t('fieldIsInvalid'), (value) => {
//       const num = Number(value);
//       return !Number.isNaN(num) && num > 0;
//     }),
//   [SEND_FIELD_NAMES.IS_USD_MODE]: yup.boolean().default(false),
//   [SEND_FIELD_NAMES.TO]: yup
//     .string()
//     .required(t('fieldIsRequired'))
//     .test('is-valid-address', t('fieldIsInvalid'), (value) => isValidAddress(value || '', chainId)),
//   [SEND_FIELD_NAMES.MEMO]: yup.string().optional(),
// });

// export const DEFAULT_VALUES: SendFormValues = {
//   [SEND_FIELD_NAMES.AMOUNT]: '',
//   [SEND_FIELD_NAMES.IS_USD_MODE]: false,
//   [SEND_FIELD_NAMES.TO]: '',
//   [SEND_FIELD_NAMES.MEMO]: '',
// };

