import { useCallback } from 'react';

import { Input, MaskInput, Select } from '@/shared-ui';

import { type IndividualFormFieldProps } from '../types';

type TouchedIndividualFields = {
  name?: boolean;
  lastName?: boolean;
  organizationType?: boolean;
  kycDelegatedData?: {
    email?: boolean;
    phoneNumber?: boolean;
    taxId?: boolean;
    formationDate?: boolean;
    nationality?: boolean;
    physicalAddress?: {
      address1?: boolean;
      address2?: boolean;
      country?: boolean;
      state?: boolean;
      city?: boolean;
      zip?: boolean;
    };
  };
};

export interface IndividualInfoFieldsProps extends IndividualFormFieldProps {
  disabled?: boolean;
}

export const IndividualInfoFields = ({
  register,
  errors,
  control,
  disabled = false,
}: IndividualInfoFieldsProps) => {
  const registerIndividualField = useCallback(
    (fieldName: 'name' | 'lastName') => register(fieldName),
    [register],
  );

  const touchedFields = (control?._formState?.touchedFields || {}) as TouchedIndividualFields;

  const isTouchedName = Boolean(touchedFields.name);
  const isTouchedLastName = Boolean(touchedFields.lastName);
  const isTouchedNationality = Boolean(touchedFields.kycDelegatedData?.nationality);
  const isTouchedPhoneNumber = Boolean(touchedFields.kycDelegatedData?.phoneNumber);

  return (
    <>
      <Input
        id="name"
        label="First Name"
        type="text"
        placeholder="John"
        required
        {...registerIndividualField('name')}
        error={isTouchedName ? errors.name?.message : undefined}
        disabled={disabled}
        data-testid="first-name-input"
      />
      <Input
        id="lastName"
        label="Last Name"
        type="text"
        placeholder="Doe"
        required
        {...registerIndividualField('lastName')}
        error={isTouchedLastName ? errors.lastName?.message : undefined}
        disabled={disabled}
        data-testid="last-name-input"
      />
      <Select
        id="nationality"
        label="Nationality"
        placeholder="Select your nationality"
        options={[
          { value: 'american', label: 'United States' },
          { value: 'brazilian', label: 'Brazil' },
          { value: 'colombian', label: 'Colombia' },
        ]}
        {...register('kycDelegatedData.nationality')}
        error={isTouchedNationality ? errors.kycDelegatedData?.nationality?.message : undefined}
        disabled={disabled}
      />
      <MaskInput
        type="phone"
        name={`kycDelegatedData.phoneNumber`}
        control={control!}
        label="Phone Number"
        placeholder="Select phone number"
        error={isTouchedPhoneNumber ? errors.kycDelegatedData?.phoneNumber?.message : undefined}
        disabled={disabled}
        data-testid="phone-number-input"
      />
    </>
  );
};

export default IndividualInfoFields;
