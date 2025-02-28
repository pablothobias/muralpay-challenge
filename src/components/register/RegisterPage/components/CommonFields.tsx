import { useCallback } from 'react';

import { Input } from '@/shared-ui';

import { RECIPIENT_TYPE } from '@/utils/constants';

import { type CommonFormFieldProps } from '../types';

export const CommonFields = ({ register, errors, organizationType }: CommonFormFieldProps) => {
  const isIndividual = organizationType === RECIPIENT_TYPE.INDIVIDUAL;

  const registerCommonField = useCallback(
    (fieldName: 'email' | 'taxId' | 'formationDate') => register(`kycDelegatedData.${fieldName}`),
    [register],
  );

  const isTouchedEmail = Boolean(errors.kycDelegatedData?.email);
  const isTouchedTaxId = Boolean(errors.kycDelegatedData?.taxId);
  const isTouchedFormationDate = Boolean(errors.kycDelegatedData?.formationDate);

  return (
    <>
      <Input
        id="email"
        label="E-mail"
        type="email"
        placeholder="contact@example.com"
        required
        {...registerCommonField('email')}
        error={isTouchedEmail ? errors.kycDelegatedData?.email?.message : undefined}
        data-testid="email-input"
      />

      <Input
        id="taxId"
        label="Tax ID"
        type="text"
        placeholder={isIndividual ? 'SSN or Tax ID' : 'EIN or Tax ID'}
        required
        {...registerCommonField('taxId')}
        error={isTouchedTaxId ? errors.kycDelegatedData?.taxId?.message : undefined}
        data-testid="tax-id-input"
      />

      <Input
        id="formationDate"
        label={isIndividual ? 'Date of Birth' : 'Formation Date'}
        type="date"
        required
        {...registerCommonField('formationDate')}
        error={isTouchedFormationDate ? errors.kycDelegatedData?.formationDate?.message : undefined}
        data-testid="formation-date-input"
      />
    </>
  );
};

export default CommonFields;
