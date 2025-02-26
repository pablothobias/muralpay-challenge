import { useCallback } from 'react';

import { Input, MaskInput, Select } from '@/shared-ui';

import { type BusinessFormFieldProps } from '../types';

export const BusinessInfoFields = ({ register, errors, control }: BusinessFormFieldProps) => {
  const registerBusinessField = useCallback(
    (fieldName: 'businessName' | 'name' | 'lastName') =>
      fieldName === 'businessName'
        ? register(`kycDelegatedData.${fieldName}`)
        : register(fieldName),
    [register],
  );

  return (
    <>
      <Input
        id="businessName"
        label="Legal Business Name"
        type="text"
        placeholder="Sun Tree Capital LLC"
        required
        {...registerBusinessField('businessName')}
        error={errors.kycDelegatedData?.businessName?.message}
        data-testid="business-name-input"
      />
      <Input
        id="name"
        label="Organization Name"
        type="text"
        placeholder="Sun Tree Capital LLC"
        required
        {...registerBusinessField('name')}
        error={errors.name?.message}
        data-testid="name-input"
      />
      <Input
        id="lastName"
        label="Representative Last Name"
        type="text"
        placeholder="Doe"
        required
        {...registerBusinessField('lastName')}
        error={errors.lastName?.message}
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
        error={errors.kycDelegatedData?.nationality?.message}
      />
      <MaskInput
        type="phone"
        name={`kycDelegatedData.phoneNumber`}
        control={control!}
        label="Phone Number"
        placeholder="Select phone number"
        error={errors.kycDelegatedData?.phoneNumber?.message}
        data-testid="phone-number-input"
      />
    </>
  );
};

export default BusinessInfoFields;
