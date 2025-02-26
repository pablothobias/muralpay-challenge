import { type UseFormRegister, type FieldErrors } from 'react-hook-form';

import { type FormData } from '@/features/organization/types';
import { Input, Select } from '@/shared-ui';

import { sectionTitleCss } from '../styles';

const COUNTRY_OPTIONS = [
  { value: 'CO', label: 'Colombia' },
  { value: 'US', label: 'United States' },
  { value: 'BR', label: 'Brazil' },
];

type PhysicalAddressFieldsProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export const PhysicalAddressFields = ({ register, errors }: PhysicalAddressFieldsProps) => {
  return (
    <>
      <h3 css={sectionTitleCss}>Physical Address</h3>
      <Input
        id="address1"
        label="Address Line 1"
        type="text"
        placeholder="123 Main St"
        {...register('kycDelegatedData.physicalAddress.address1')}
        error={errors.kycDelegatedData?.physicalAddress?.address1?.message}
      />

      <Input
        id="address2"
        label="Address Line 2 (Optional)"
        type="text"
        placeholder="Apt 4B"
        {...register('kycDelegatedData.physicalAddress.address2')}
        error={errors.kycDelegatedData?.physicalAddress?.address2?.message}
      />

      <Select
        id="country"
        label="Country"
        placeholder="Select a country"
        options={COUNTRY_OPTIONS}
        {...register('kycDelegatedData.physicalAddress.country')}
        error={errors.kycDelegatedData?.physicalAddress?.country?.message}
      />

      <Input
        id="state"
        label="State/Province"
        type="text"
        placeholder="California"
        {...register('kycDelegatedData.physicalAddress.state')}
        error={errors.kycDelegatedData?.physicalAddress?.state?.message}
      />

      <Input
        id="city"
        label="City"
        type="text"
        placeholder="San Francisco"
        {...register('kycDelegatedData.physicalAddress.city')}
        error={errors.kycDelegatedData?.physicalAddress?.city?.message}
      />

      <Input
        id="zip"
        label="ZIP/Postal Code"
        type="text"
        placeholder="94105"
        {...register('kycDelegatedData.physicalAddress.zip')}
        error={errors.kycDelegatedData?.physicalAddress?.zip?.message}
      />
    </>
  );
};

export default PhysicalAddressFields;
