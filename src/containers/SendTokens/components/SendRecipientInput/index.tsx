import { Controller, type Control } from 'react-hook-form';
import { SEND_FIELD_NAMES, type SendFormValues } from '../../form.constants';
import Input from '../../../../components/Input';
import { useTranslation } from 'react-i18next';

interface Props {
  control: Control<SendFormValues>;
}

const SendRecipientInput = ({ control }: Props) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={SEND_FIELD_NAMES.TO}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label={t('toLabel')}
          placeholder="0x..."
          error={error?.message}
        />
      )}
    />
  );
};

export default SendRecipientInput;
