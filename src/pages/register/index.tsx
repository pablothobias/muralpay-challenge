'use client';

import { LoadingSpinner } from '@/components';
import RegisterPage from '@/components/pages/register';
import { organizationSchema } from '@/features/organization/schemas';
import { OrganizationSchema } from '@/features/organization/types';
import useAuthStore from '@/store/auth';
import { AuthState } from '@/store/auth/types';
import useOrganizationStore from '@/store/organization';
import { useOrganizationActions } from '@/store/organization/hooks';
import { OrganizationState } from '@/store/organization/types';
import { useLoading } from '@/utils/context/LoadingContext';
import { useToast } from '@/utils/context/ToastContext';
import { useTheme } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterContainer = () => {
  const router = useRouter();
  const theme = useTheme();
  const { showSuccess, showError } = useToast();
  const { isLoading, setLoadingState } = useLoading();

  const { createOrganization } = useOrganizationActions();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
  });

  useEffect(() => {
    router.prefetch('/home');
    setLoadingState('createOrganization', !!useOrganizationStore.getState().loading);

    const unsubscribe = useOrganizationStore.subscribe((state: OrganizationState) =>
      setLoadingState('createOrganization', !!state.loading),
    );

    const unsubscribeAuth = useAuthStore.subscribe(
      (state: AuthState) => state,
      (state) => setIsAuthenticated(!!state.isAuthenticated),
    );

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);

  const onSubmit = async (data: OrganizationSchema) => {
    try {
      const response = await createOrganization(data);
      if (!response) throw new Error('Failed to create organization');
      showSuccess('organization', 'Organization created successfully!');

      router.push('/home');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create transfer';
      showError('transfer', message);
    }
  };

  if (isLoading || typeof isAuthenticated !== 'undefined') return <LoadingSpinner />;

  return (
    <RegisterPage
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      loading={isLoading}
      watch={watch}
      theme={theme}
    />
  );
};

export default RegisterContainer;
