import { useCallback } from 'react';

import { Input, MaskInput, Select } from '@/shared-ui';

import { type IndividualFormFieldProps } from '../types';

export const IndividualInfoFields = ({ register, errors, control }: IndividualFormFieldProps) => {
  const registerIndividualField = useCallback(
    (fieldName: 'lastName' | 'name') => register(fieldName),
    [register],
  );

  return (
    <>
      <Input
        id="name"
        label="First Name"
        type="text"
        placeholder="John Doe"
        required
        {...registerIndividualField('name')}
        error={errors.name?.message}
        data-testid="name-input"
      />
      <Input
        id="lastName"
        label="Last Name"
        type="text"
        placeholder="Doe"
        required
        {...registerIndividualField('lastName')}
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

export default IndividualInfoFields;
