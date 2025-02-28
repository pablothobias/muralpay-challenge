import { useCallback } from 'react';

import { Input, MaskInput, Select } from '@/shared-ui';

import { type BusinessFormFieldProps } from '../types';

type TouchedBusinessFields = {
  name?: boolean;
  lastName?: boolean;
  organizationType?: boolean;
  kycDelegatedData?: {
    businessName?: boolean;
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

export const BusinessInfoFields = ({ register, errors, control }: BusinessFormFieldProps) => {
  const registerBusinessField = useCallback(
    (fieldName: 'businessName' | 'name' | 'lastName') =>
      fieldName === 'businessName'
        ? register(`kycDelegatedData.${fieldName}`)
        : register(fieldName),
    [register],
  );

  const touchedFields = (control?._formState?.touchedFields || {}) as TouchedBusinessFields;

  const isTouchedBusinessName = Boolean(touchedFields.kycDelegatedData?.businessName);
  const isTouchedName = Boolean(touchedFields.name);
  const isTouchedLastName = Boolean(touchedFields.lastName);
  const isTouchedNationality = Boolean(touchedFields.kycDelegatedData?.nationality);
  const isTouchedPhoneNumber = Boolean(touchedFields.kycDelegatedData?.phoneNumber);

  return (
    <>
      <Input
        id="businessName"
        label="Legal Business Name"
        type="text"
        placeholder="Sun Tree Capital LLC"
        required
        {...registerBusinessField('businessName')}
        error={isTouchedBusinessName ? errors.kycDelegatedData?.businessName?.message : undefined}
        data-testid="business-name-input"
      />
      <Input
        id="name"
        label="Organization Name"
        type="text"
        placeholder="Sun Tree Capital LLC"
        required
        {...registerBusinessField('name')}
        error={isTouchedName ? errors.name?.message : undefined}
        data-testid="name-input"
      />
      <Input
        id="lastName"
        label="Representative Last Name"
        type="text"
        placeholder="Doe"
        required
        {...registerBusinessField('lastName')}
        error={isTouchedLastName ? errors.lastName?.message : undefined}
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
      />
      <MaskInput
        type="phone"
        name={`kycDelegatedData.phoneNumber`}
        control={control!}
        label="Phone Number"
        placeholder="Select phone number"
        error={isTouchedPhoneNumber ? errors.kycDelegatedData?.phoneNumber?.message : undefined}
        data-testid="phone-number-input"
      />
    </>
  );
};

export default BusinessInfoFields;
