import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';
import { Suspense, useCallback } from 'react';

import { type FormData as OrganizationFormData } from '@/features/organization/types';
import { LoadingSpinner } from '@/shared-ui';
import { useOrganizationActions } from '@/store/organization/hooks';
import { useLoading } from '@/utils/context/LoadingContext';
import { useToast } from '@/utils/context/ToastContext';
import withAuth from '@/utils/hoc/withAuth';
import { useOrganizationForm } from '@/utils/hooks/useOrganizationForm';

const RegisterPage = dynamic(() => import('@/components/register/RegisterPage'), {
  ssr: true,
  loading: () => null,
});

const Register = () => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { isLoading, setLoadingState } = useLoading();
  const { createOrganization } = useOrganizationActions();

  const organizationForm = useOrganizationForm();

  const onSubmit = useCallback(async (data: OrganizationFormData) => {
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
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterPage isLoading={isLoading} organizationForm={organizationForm} onSubmit={onSubmit} />
    </Suspense>
  );
};

export default withAuth(Register, {
  isPrivate: false,
  redirectTo: '/home',
});
