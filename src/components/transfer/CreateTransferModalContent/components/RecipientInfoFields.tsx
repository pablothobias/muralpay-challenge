import { Input, MaskInput, Select } from '@/shared-ui';
import { RECIPIENT_TRANSFER_TYPE, RECIPIENT_TYPE } from '@/utils/constants';
import { formGroupCss } from './styles';
import { type TransferSchema } from '@/features/transfer/types';
import { type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { ThemeType } from '@/styles/theme';

interface FormFieldProps {
  register: UseFormRegister<TransferSchema>;
  index: number;
  errors: FieldErrors<TransferSchema>;
  control: Control<TransferSchema>;
}

const RecipientInfoFields = ({ register, index, errors, control }: FormFieldProps) => {
  const theme = useTheme() as ThemeType;

  return (
    <>
      <div css={formGroupCss(theme)}>
        <Input
          id={`recipientsInfo.${index}.name`}
          placeholder="Name"
          label="Name"
          {...register(`recipientsInfo.${index}.name`)}
          error={errors.recipientsInfo?.[index]?.name?.message}
        />
      </div>

      <div css={formGroupCss(theme)}>
        <Select
          id={`recipientsInfo.${index}.currencyCode`}
          placeholder="Select currency"
          label="Currency"
          options={[
            { value: 'COP', label: 'COP' },
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' },
            { value: 'BTC', label: 'BTC' },
            { value: 'XBT', label: 'XBT' },
          ]}
          {...register(`recipientsInfo.${index}.currencyCode`)}
          error={errors.recipientsInfo?.[index]?.currencyCode?.message}
        />
      </div>

      <div css={formGroupCss(theme)}>
        <MaskInput<TransferSchema>
          placeholder="Amount"
          type="currency"
          name={`recipientsInfo.${index}.tokenAmount`}
          label="Amount"
          control={control}
          error={errors.recipientsInfo?.[index]?.tokenAmount?.message}
        />
      </div>

      <div css={formGroupCss(theme)}>
        <Input
          id={`recipientsInfo.${index}.email`}
          placeholder="Email"
          label="Email"
          type="email"
          {...register(`recipientsInfo.${index}.email`)}
          error={errors.recipientsInfo?.[index]?.email?.message}
        />
      </div>

      <div css={formGroupCss(theme)}>
        <Input
          id={`recipientsInfo.${index}.dateOfBirth`}
          placeholder="Date of birth"
          label="Date of Birth"
          type="date"
          {...register(`recipientsInfo.${index}.dateOfBirth`)}
          error={errors.recipientsInfo?.[index]?.dateOfBirth?.message}
        />
      </div>

      <div css={formGroupCss(theme)}>
        <MaskInput<TransferSchema>
          name={`recipientsInfo.${index}.phoneNumber`}
          control={control!}
          type="phone"
          placeholder="Phone number"
          label="Phone Number"
          error={errors.recipientsInfo?.[index]?.phoneNumber?.message}
        />
      </div>

      <div css={formGroupCss(theme)}>
        <Select
          id={`recipientsInfo.${index}.recipientTransferType`}
          placeholder="Select recipient transfer type"
          label="Recipient Transfer Type"
          options={[
            { value: RECIPIENT_TRANSFER_TYPE.FIAT, label: 'FIAT' },
            { value: RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN, label: 'BLOCKCHAIN' },
          ]}
          {...register(`recipientsInfo.${index}.recipientTransferType`)}
          error={errors.recipientsInfo?.[index]?.recipientTransferType?.message}
        />
      </div>

      <div css={formGroupCss(theme)}>
        <Select
          id={`recipientsInfo.${index}.recipientType`}
          placeholder="Select recipient type"
          label="Recipient Type"
          options={[
            { value: RECIPIENT_TYPE.INDIVIDUAL, label: 'Individual' },
            { value: RECIPIENT_TYPE.BUSINESS, label: 'Business' },
          ]}
          {...register(`recipientsInfo.${index}.recipientType`)}
          error={errors.recipientsInfo?.[index]?.recipientType?.message}
        />
      </div>
    </>
  );
};

export default RecipientInfoFields;
