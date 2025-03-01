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
  disabled?: boolean;
};

export const PhysicalAddressFields = ({
  register,
  errors,
  disabled = false,
}: PhysicalAddressFieldsProps) => {
  const isTouchedAddress1 = Boolean(errors.kycDelegatedData?.physicalAddress?.address1);
  const isTouchedAddress2 = Boolean(errors.kycDelegatedData?.physicalAddress?.address2);
  const isTouchedCountry = Boolean(errors.kycDelegatedData?.physicalAddress?.country);
  const isTouchedState = Boolean(errors.kycDelegatedData?.physicalAddress?.state);
  const isTouchedCity = Boolean(errors.kycDelegatedData?.physicalAddress?.city);
  const isTouchedZip = Boolean(errors.kycDelegatedData?.physicalAddress?.zip);

  return (
    <>
      <h3 css={sectionTitleCss}>Physical Address</h3>
      <Input
        id="address1"
        label="Address Line 1"
        type="text"
        placeholder="123 Main St"
        {...register('kycDelegatedData.physicalAddress.address1')}
        error={
          isTouchedAddress1
            ? errors.kycDelegatedData?.physicalAddress?.address1?.message
            : undefined
        }
        disabled={disabled}
      />

      <Input
        id="address2"
        label="Address Line 2 (Optional)"
        type="text"
        placeholder="Apt 4B"
        {...register('kycDelegatedData.physicalAddress.address2')}
        error={
          isTouchedAddress2
            ? errors.kycDelegatedData?.physicalAddress?.address2?.message
            : undefined
        }
        disabled={disabled}
      />

      <Select
        id="country"
        label="Country"
        placeholder="Select a country"
        options={COUNTRY_OPTIONS}
        {...register('kycDelegatedData.physicalAddress.country')}
        error={
          isTouchedCountry ? errors.kycDelegatedData?.physicalAddress?.country?.message : undefined
        }
        disabled={disabled}
      />

      <Input
        id="state"
        label="State/Province"
        type="text"
        placeholder="California"
        {...register('kycDelegatedData.physicalAddress.state')}
        error={
          isTouchedState ? errors.kycDelegatedData?.physicalAddress?.state?.message : undefined
        }
        disabled={disabled}
      />

      <Input
        id="city"
        label="City"
        type="text"
        placeholder="San Francisco"
        {...register('kycDelegatedData.physicalAddress.city')}
        error={isTouchedCity ? errors.kycDelegatedData?.physicalAddress?.city?.message : undefined}
        disabled={disabled}
      />

      <Input
        id="zip"
        label="ZIP/Postal Code"
        type="text"
        placeholder="94105"
        {...register('kycDelegatedData.physicalAddress.zip')}
        error={isTouchedZip ? errors.kycDelegatedData?.physicalAddress?.zip?.message : undefined}
        disabled={disabled}
      />
    </>
  );
};

export default PhysicalAddressFields;
