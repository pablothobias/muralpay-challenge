import { useTheme } from '@emotion/react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { TransferFormSchema, BankRecipient } from '@/features/transfer/types';
import { Input, Select } from '@/shared-ui';
import { DOC_TYPE, TRANSFER_RECIPIENT } from '@/utils/constants';

import { PhysicalAddressFields } from './PhysicalAddressFields';
import { formGroupCss } from './styles';

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

type FieldConfig = {
  id: string;
  name: keyof BankRecipient['bankDetails'];
  label: string;
  placeholder: string;
  type?: 'text' | 'select';
  options?: ReadonlyArray<{ value: string; label: string }>;
};

const BankDetailsFields = ({ register, index, errors }: FormFieldProps) => {
  const getFieldError = (field: keyof BankRecipient['bankDetails']) => {
    const recipientErrors = errors.recipientsInfo?.[index] as BankRecipientErrors | undefined;
    if (!recipientErrors?.bankDetails) return undefined;
    return recipientErrors.bankDetails[field]?.message;
  };

  const theme = useTheme();

  const renderField = (field: FieldConfig) => (
    <span css={formGroupCss(theme)} key={field.id}>
      {field.type === 'select' ? (
        <Select
          id={`recipientsInfo.${index}.bankDetails.${field.name}`}
          placeholder={field.placeholder}
          label={field.label}
          options={[...(field.options || [])]}
          {...register(`recipientsInfo.${index}.bankDetails.${field.name}`)}
          error={getFieldError(field.name)}
        />
      ) : (
        <Input
          id={`recipientsInfo.${index}.bankDetails.${field.name}`}
          placeholder={field.placeholder}
          label={field.label}
          {...register(`recipientsInfo.${index}.bankDetails.${field.name}`)}
          error={getFieldError(field.name)}
        />
      )}
    </span>
  );

  const fields: ReadonlyArray<FieldConfig> = [
    {
      id: 'bankName',
      name: 'bankName',
      label: 'Bank Name',
      placeholder: 'Bank name',
    },
    {
      id: 'bankCode',
      name: 'bankCode',
      label: 'Bank Code',
      placeholder: 'Bank code',
    },
    {
      id: 'bankAccountOwnerName',
      name: 'bankAccountOwnerName',
      label: 'Account Owner Name',
      placeholder: 'Account owner name',
    },
    {
      id: 'accountType',
      name: 'accountType',
      label: 'Account Type',
      placeholder: 'Select account type',
      type: 'select',
      options: [
        { value: TRANSFER_RECIPIENT.SAVINGS, label: 'Savings' },
        { value: TRANSFER_RECIPIENT.CHECKING, label: 'Checking' },
      ] as const,
    },
    {
      id: 'documentType',
      name: 'documentType',
      label: 'Document Type',
      placeholder: 'Select document type',
      type: 'select',
      options: [
        { value: DOC_TYPE.NATIONAL_ID, label: 'National ID' },
        { value: DOC_TYPE.PASSPORT, label: 'Passport' },
        { value: DOC_TYPE.OTHER, label: 'Other' },
      ] as const,
    },
    {
      id: 'documentNumber',
      name: 'documentNumber',
      label: 'Document Number',
      placeholder: 'Document number',
    },
    {
      id: 'bankAccountNumber',
      name: 'bankAccountNumber',
      label: 'Account Number',
      placeholder: 'Account number',
    },
    {
      id: 'bankRoutingNumber',
      name: 'bankRoutingNumber',
      label: 'Routing Number',
      placeholder: 'Routing number',
    },
    {
      id: 'currencyCode',
      name: 'currencyCode',
      label: 'Currency Code',
      placeholder: 'Select currency code',
      type: 'select',
      options: [
        { value: 'COP', label: 'COP' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'BTC', label: 'BTC' },
        { value: 'XBT', label: 'XBT' },
      ] as const,
    },
  ];

  return (
    <>
      {fields.map((field) => renderField(field))}
      <span css={formGroupCss(theme)}>
        <PhysicalAddressFields register={register} index={index} errors={errors} />
      </span>
    </>
  );
};

export default BankDetailsFields;
