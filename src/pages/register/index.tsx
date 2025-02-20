'use client';

import { LoadingSpinner } from '@/components';
import RegisterPage from '@/components/pages/register';
import { organizationSchema } from '@/features/organization/schemas';
import OrganizationService from '@/features/organization/services';
import { OrganizationResponse, OrganizationSchema } from '@/features/organization/types';
import useAuthStore from '@/store/auth';
import { useServiceOnAction } from '@/utils/hooks/useServiceOnAction';
import { useTheme } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const RegisterContainer = () => {
  const router = useRouter();
  const theme = useTheme();
  const store = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
  });

  const { execute, error, loading } = useServiceOnAction<OrganizationSchema, OrganizationResponse>(
    OrganizationService.create,
  );

  useEffect(() => {
    router.prefetch('/register');
  }, [router]);

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
    }
  }, [error]);

  const onSubmit = async (data: OrganizationSchema) => {
    try {
      const response = await execute(data);
      if (!response) throw new Error('Failed to create organization');

      store.login(
        {
          id: response.id,
          name: response.name,
          organizationType: response.organizationType,
          status: response.status,
        },
        process.env.NEXT_PUBLIC_API_KEY!,
      );

      toast.success('Organization created successfully!', {
        position: 'top-right',
      });

      Cookies.set('user', JSON.stringify({ ...response, isAuthenticated: true }), { expires: 1 });
      Cookies.set('on-behalf-of', response.id!);
      router.push('/home');
    } catch (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <RegisterPage
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      loading={loading}
      watch={watch}
      theme={theme}
    />
  );
};

export default RegisterContainer;
