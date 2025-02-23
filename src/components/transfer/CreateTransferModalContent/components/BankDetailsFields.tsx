import { Input, Select } from '@/shared-ui';
import { DOC_TYPE, TRANSFER_RECIPIENT } from '@/utils/constants';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { TransferFormSchema, BankRecipient } from '@/features/transfer/types';
import { formGroupCss } from './styles';
import { PhysicalAddressFields } from './PhysicalAddressFields';

type FormFieldProps = {
  register: UseFormRegister<TransferFormSchema>;
  index: number;
  errors: FieldErrors<TransferFormSchema>;
  control: Control<TransferFormSchema>;
};

type BankRecipientErrors = {
  recipientTransferType?: { message?: string };
  bankDetails?: {
    [K in keyof BankRecipient['bankDetails']]?: {
      message?: string;
    };
  };
};

const BankDetailsFields = ({ register, index, errors }: FormFieldProps) => {
  const getFieldError = (field: keyof BankRecipient['bankDetails']) => {
    const recipientErrors = errors.recipientsInfo?.[index] as BankRecipientErrors | undefined;
    if (!recipientErrors?.bankDetails) return undefined;
    return recipientErrors.bankDetails[field]?.message;
  };

  return (
    <>
      <span css={formGroupCss}>
        <Input
          id={`recipientsInfo.${index}.bankDetails.bankName`}
          placeholder="Bank name"
          label="Bank Name"
          {...register(`recipientsInfo.${index}.bankDetails.bankName`)}
          error={getFieldError('bankName')}
        />
      </span>

      <span css={formGroupCss}>
        <Input
          id={`recipientsInfo.${index}.bankDetails.bankAccountOwnerName`}
          placeholder="Account owner name"
          label="Account Owner Name"
          {...register(`recipientsInfo.${index}.bankDetails.bankAccountOwnerName`)}
          error={getFieldError('bankAccountOwnerName')}
        />
      </span>

      <span css={formGroupCss}>
        <Select
          id={`recipientsInfo.${index}.bankDetails.accountType`}
          placeholder="Select account type"
          label="Account Type"
          options={[
            { value: TRANSFER_RECIPIENT.SAVINGS, label: 'Savings' },
            { value: TRANSFER_RECIPIENT.CHECKING, label: 'Checking' },
          ]}
          {...register(`recipientsInfo.${index}.bankDetails.accountType`)}
          error={getFieldError('accountType')}
        />
      </span>

      <span css={formGroupCss}>
        <Select
          id={`recipientsInfo.${index}.bankDetails.documentType`}
          placeholder="Select document type"
          label="Document Type"
          options={[
            { value: DOC_TYPE.NATIONAL_ID, label: 'National ID' },
            { value: DOC_TYPE.PASSPORT, label: 'Passport' },
            { value: DOC_TYPE.OTHER, label: 'Other' },
          ]}
          {...register(`recipientsInfo.${index}.bankDetails.documentType`)}
          error={getFieldError('documentType')}
        />
      </span>

      <span css={formGroupCss}>
        <Input
          id={`recipientsInfo.${index}.bankDetails.documentNumber`}
          placeholder="Document number"
          label="Document Number"
          {...register(`recipientsInfo.${index}.bankDetails.documentNumber`)}
          error={getFieldError('documentNumber')}
        />
      </span>

      <span css={formGroupCss}>
        <Input
          id={`recipientsInfo.${index}.bankDetails.bankAccountNumber`}
          placeholder="Account number"
          label="Account Number"
          {...register(`recipientsInfo.${index}.bankDetails.bankAccountNumber`)}
          error={getFieldError('bankAccountNumber')}
        />
      </span>

      <span css={formGroupCss}>
        <Input
          id={`recipientsInfo.${index}.bankDetails.bankRoutingNumber`}
          placeholder="Routing number"
          label="Routing Number"
          {...register(`recipientsInfo.${index}.bankDetails.bankRoutingNumber`)}
          error={getFieldError('bankRoutingNumber')}
        />
      </span>
      <span css={formGroupCss}>
        <PhysicalAddressFields register={register} index={index} errors={errors} />
      </span>
    </>
  );
};

export default BankDetailsFields;
