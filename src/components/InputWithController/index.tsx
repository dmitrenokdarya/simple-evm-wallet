import { memo, type ComponentProps } from 'react';
import { Controller, type Control } from 'react-hook-form';
import Input from '../Input';
import TextArea from '../TextArea';


type Props = ComponentProps<typeof Input> &
  ComponentProps<typeof TextArea> & {
    /* eslint-disable-next-line */
    control: Control<any>;
    fieldName: string;
    isTextArea?: boolean;
    normalizeValue?: (value: string) => string;
    /* eslint-disable-next-line */
    rules?: any;
  };

const InputWithController = ({
  control,
  fieldName,
  isTextArea,
  normalizeValue,
  rules,
  ...props
}: Props) => (
  <Controller
    name={fieldName}
    control={control}
    /* eslint-disable-next-line */
    rules={rules}
    render={({
      field: {
        onChange, name, value, onBlur,
      }, fieldState: { error },
    }) => (isTextArea ? (
      <TextArea
        {...props}
        name={name}
        onBlur={onBlur}
        value={value || ''}
        error={error?.message}
        onChange={(event) => {
          const newValue = event.target.value;

          if (normalizeValue) {
            onChange(normalizeValue(newValue));
          } else {
            onChange(newValue);
          }
        }}
      />
    ) : (
      <Input
        {...props}
        name={name}
        onBlur={onBlur}
        value={value || ''}
        error={error?.message}
        onChange={(newValue) => {
          if (normalizeValue) {
            onChange(normalizeValue(newValue));
          } else {
            onChange(newValue);
          }
        }}
      />
    ))}
  />
);

export default memo(InputWithController);
