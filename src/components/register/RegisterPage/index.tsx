import { useTheme } from '@emotion/react';
import { UseFormRegister } from 'react-hook-form';

import { type FormData as OrganizationFormData } from '@/features/organization/types';
import { Button, Card, Select } from '@/shared-ui';

import { ORGANIZATION_TYPE } from '@/utils/constants';

import { useOrganizationForm } from '@/utils/hooks/useOrganizationForm';

import { BusinessInfoFields } from './components/BusinessInfoFields';
import { CommonFields } from './components/CommonFields';
import { IndividualInfoFields } from './components/IndividualInfoFields';
import { PhysicalAddressFields } from './components/PhysicalAddressFields';
import { cardContainerCss, formCss, pageContainer, titleCss, warningMessageCss } from './styles';

type OrganizationFormHookResult = ReturnType<typeof useOrganizationForm>;

type RegisterPageProps = {
  organizationForm: OrganizationFormHookResult;
  onSubmit: (data: OrganizationFormData) => void;
  isLoading: boolean;
};

const RegisterPage = ({ organizationForm, onSubmit, isLoading }: RegisterPageProps) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    errors,
    touchedFields,
    organizationType,
    isIndividual,
    onOrganizationTypeChange,
  } = organizationForm;

  const hasValidationErrors = Object.keys(errors).length > 0;
  const shouldDisableSubmit = isLoading || hasValidationErrors || isIndividual;

  // Create a wrapper register function that adds the disabled attribute when isIndividual is true
  const registerField: UseFormRegister<OrganizationFormData> = (name, options = {}) => {
    return register(name, {
      ...options,
      disabled: isIndividual ? true : options.disabled,
    });
  };

  return (
    <div css={pageContainer}>
      <Card variant="outlined" css={cardContainerCss}>
        <h1 css={titleCss(theme)}>Create a New Organization</h1>
        <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
          <Select
            id="organizationType"
            label="Organization Type"
            placeholder="Select an organization type"
            options={[
              { value: ORGANIZATION_TYPE.BUSINESS, label: 'Business' },
              { value: ORGANIZATION_TYPE.INDIVIDUAL, label: 'Individual' },
            ]}
            {...register('organizationType', {
              onChange: e => onOrganizationTypeChange(e.target.value),
            })}
            error={touchedFields.organizationType ? errors.organizationType?.message : undefined}
          />

          {isIndividual && (
            <div css={warningMessageCss(theme)}>
              Individual organizations are not supported at this time. Please select Business to
              continue.
            </div>
          )}

          {organizationType && (
            <>
              {isIndividual ? (
                <IndividualInfoFields
                  register={registerField}
                  errors={errors}
                  control={control}
                  disabled={true}
                />
              ) : (
                <BusinessInfoFields register={registerField} errors={errors} control={control!} />
              )}
              <CommonFields
                register={registerField}
                errors={errors}
                organizationType={organizationType}
                disabled={isIndividual}
              />
              <PhysicalAddressFields
                register={registerField}
                errors={errors}
                disabled={isIndividual}
              />
              {hasValidationErrors && !isIndividual && (
                <div css={{ color: 'red', marginBottom: '1rem' }}>
                  Please fix the errors before submitting the form.
                </div>
              )}

              <Button
                type="submit"
                variant="secondary"
                size="medium"
                disabled={shouldDisableSubmit}
              >
                Create Organization
              </Button>
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
