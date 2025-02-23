import { Input, MaskInput, Select } from '@/shared-ui';
import { CURRENCY, RECIPIENT_TRANSFER_TYPE, RECIPIENT_TYPE } from '@/utils/constants';
import { formGroupCss } from './styles';
import { type TransferSchema } from '@/features/transfer/types';
import { type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  register: UseFormRegister<TransferSchema>;
  index: number;
  errors: FieldErrors<TransferSchema>;
  control: Control<TransferSchema>;
}

const RecipientInfoFields = ({ register, index, errors, control }: FormFieldProps) => (
  <>
    <span css={formGroupCss}>
      <Input
        id={`recipientsInfo.${index}.name`}
        placeholder="Name"
        label="Name"
        {...register(`recipientsInfo.${index}.name`)}
        error={errors.recipientsInfo?.[index]?.name?.message}
      />
    </span>

    <span css={formGroupCss}>
      <Select
        id={`recipientsInfo.${index}.currencyCode`}
        placeholder="Select currency"
        label="Currency"
        options={Object.values(CURRENCY).map((currency) => ({
          value: currency,
          label: currency,
        }))}
        {...register(`recipientsInfo.${index}.currencyCode`)}
        error={errors.recipientsInfo?.[index]?.currencyCode?.message}
      />
    </span>

    <span css={formGroupCss}>
      <MaskInput<TransferSchema>
        placeholder="Amount"
        type="currency"
        name={`recipientsInfo.${index}.tokenAmount`}
        label="Amount"
        control={control}
        error={errors.recipientsInfo?.[index]?.tokenAmount?.message}
      />
    </span>

    <span css={formGroupCss}>
      <Input
        id={`recipientsInfo.${index}.email`}
        placeholder="Email"
        label="Email"
        type="email"
        {...register(`recipientsInfo.${index}.email`)}
        error={errors.recipientsInfo?.[index]?.email?.message}
      />
    </span>

    <span css={formGroupCss}>
      <Input
        id={`recipientsInfo.${index}.dateOfBirth`}
        placeholder="Date of birth"
        label="Date of Birth"
        type="date"
        {...register(`recipientsInfo.${index}.dateOfBirth`)}
        error={errors.recipientsInfo?.[index]?.dateOfBirth?.message}
      />
    </span>

    <span css={formGroupCss}>
      <MaskInput<TransferSchema>
        name={`recipientsInfo.${index}.phoneNumber`}
        control={control!}
        type="phone"
        placeholder="Phone number"
        label="Phone Number"
        error={errors.recipientsInfo?.[index]?.phoneNumber?.message}
      />
    </span>

    <span css={formGroupCss}>
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
    </span>

    <span css={formGroupCss}>
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
    </span>
  </>
);

export default RecipientInfoFields;
