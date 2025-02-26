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

  return (
    <>
      <Input
        id="email"
        label="E-mail"
        type="email"
        placeholder="contact@example.com"
        required
        {...registerCommonField('email')}
        error={errors.kycDelegatedData?.email?.message}
        data-testid="email-input"
      />

      <Input
        id="taxId"
        label="Tax ID"
        type="text"
        placeholder={isIndividual ? 'SSN or Tax ID' : 'EIN or Tax ID'}
        required
        {...registerCommonField('taxId')}
        error={errors.kycDelegatedData?.taxId?.message}
        data-testid="tax-id-input"
      />

      <Input
        id="formationDate"
        label={isIndividual ? 'Date of Birth' : 'Formation Date'}
        type="date"
        required
        {...registerCommonField('formationDate')}
        error={errors.kycDelegatedData?.formationDate?.message}
        data-testid="formation-date-input"
      />
    </>
  );
};

export default CommonFields;
