import { Input } from '@/shared-ui';
import { FieldErrors, UseFormRegister, Path } from 'react-hook-form';
import { TransferFormSchema } from '@/features/transfer/types';
import { physicalAddressSchema } from '@/features/transfer/schemas';
import { addressSectionStyles, addressTitleStyles, formGroupCss } from './styles';
import { useTheme } from '@emotion/react';
import { z } from 'zod';

type FormFieldProps = {
  register: UseFormRegister<TransferFormSchema>;
  index: number;
  errors: FieldErrors<TransferFormSchema>;
};

type PhysicalAddress = z.infer<typeof physicalAddressSchema>;

type PhysicalAddressErrors = {
  recipientTransferType?: { message?: string };
  bankDetails?: {
    physicalAddress?: {
      [K in keyof PhysicalAddress]?: {
        message?: string;
      };
    };
  };
};

type AddressField = {
  id: keyof PhysicalAddress;
  label: string;
  placeholder: string;
};

const addressFields: AddressField[] = [
  { id: 'address1', label: 'Address Line 1', placeholder: 'Enter street address' },
  { id: 'address2', label: 'Address Line 2', placeholder: 'Enter apartment, suite, etc.' },
  { id: 'city', label: 'City', placeholder: 'Enter city' },
  { id: 'state', label: 'State', placeholder: 'Enter state' },
  { id: 'country', label: 'Country', placeholder: 'Enter country' },
  { id: 'zip', label: 'ZIP Code', placeholder: 'Enter ZIP code' },
];

export const PhysicalAddressFields = ({ register, index, errors }: FormFieldProps) => {
  const theme = useTheme();

  const getFieldError = (field: keyof PhysicalAddress) => {
    const recipientErrors = errors.recipientsInfo?.[index] as PhysicalAddressErrors | undefined;
    if (!recipientErrors?.bankDetails?.physicalAddress) return undefined;
    return recipientErrors.bankDetails.physicalAddress[field]?.message;
  };

  const getFieldPath = (field: AddressField['id']): Path<TransferFormSchema> =>
    `recipientsInfo.${index}.bankDetails.physicalAddress.${field}` as Path<TransferFormSchema>;

  return (
    <div css={addressSectionStyles(theme)}>
      <h4 css={addressTitleStyles(theme)}>Physical Address</h4>
      <div>
        {addressFields.map((field) => (
          <div key={field.id} css={formGroupCss(theme)}>
            <Input
              id={`recipientsInfo.${index}.bankDetails.physicalAddress.${field.id}`}
              label={field.label}
              placeholder={field.placeholder}
              {...register(getFieldPath(field.id))}
              error={getFieldError(field.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
