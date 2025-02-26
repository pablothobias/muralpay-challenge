import { useCallback } from 'react';

import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router';

import { type FormData } from '@/features/organization/types';
import { Button, Card, Select } from '@/shared-ui';
import { useOrganizationActions } from '@/store/organization/hooks';

import { RECIPIENT_TYPE } from '@/utils/constants';

import { useLoading } from '@/utils/context/LoadingContext';
import { useToast } from '@/utils/context/ToastContext';

import { useOrganizationForm } from '@/utils/hooks/useOrganizationForm';

import { BusinessInfoFields } from './components/BusinessInfoFields';
import { CommonFields } from './components/CommonFields';
import { IndividualInfoFields } from './components/IndividualInfoFields';
import { PhysicalAddressFields } from './components/PhysicalAddressFields';
import { cardContainerCss, formCss, pageContainer, titleCss } from './styles';

const RegisterPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { isLoading, setLoadingState } = useLoading();
  const { createOrganization } = useOrganizationActions();

  const {
    register,
    handleSubmit,
    control,
    errors,
    organizationType,
    isIndividual,
    onOrganizationTypeChange,
  } = useOrganizationForm();

  const onSubmit = useCallback(async (data: FormData) => {
    const controller = new AbortController();

    if (isLoading || controller.signal.aborted) return;

    try {
      setLoadingState('createOrganization', true);
      await createOrganization(data, controller.signal);
      showSuccess('createOrganization', 'Organization created successfully!');
      router.push('/home');
    } catch (error) {
      showError('createOrganization', 'Failed to create organization');
      console.error('Failed to create organization:', error);
    } finally {
      setLoadingState('createOrganization', false);
    }
  }, []);

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
              { value: RECIPIENT_TYPE.BUSINESS, label: 'Business' },
              { value: RECIPIENT_TYPE.INDIVIDUAL, label: 'Individual' },
            ]}
            {...register('organizationType', {
              onChange: (e) => onOrganizationTypeChange(e.target.value),
            })}
            error={errors.organizationType?.message}
          />

          {organizationType && (
            <>
              {isIndividual ? (
                <IndividualInfoFields register={register} errors={errors} control={control} />
              ) : (
                <BusinessInfoFields register={register} errors={errors} control={control!} />
              )}
              <CommonFields
                register={register}
                errors={errors}
                organizationType={organizationType}
              />
              <PhysicalAddressFields register={register} errors={errors} />
              {Object.keys(errors).length > 0 && (
                <div css={{ color: 'red', marginBottom: '1rem' }}>
                  Please fix the errors before submitting the form.
                </div>
              )}

              <Button
                type="submit"
                variant="secondary"
                size="medium"
                disabled={isLoading || Object.keys(errors).length > 0}
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
