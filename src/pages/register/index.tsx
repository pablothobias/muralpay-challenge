'use-client';

import {
  OrganizationResponse,
  OrganizationSchema,
} from '@/features/organization/types';
import { organizationSchema } from '@/features/organization/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@emotion/react';
import { useServices } from '@/utils/hooks/useServices';
import OrganizationService from '@/features/organization/services';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { pageContainer } from './styles';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/auth';
import RegisterPage from '@/components/pages/register';

const RegisterContainer = () => {
  const router = useRouter();
  const theme = useTheme();
  const store = useAuthStore();
  const { execute, error, loading } = useServices<
    OrganizationSchema,
    OrganizationResponse
  >((data: OrganizationSchema) => OrganizationService.create(data));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data: OrganizationSchema) => {
    try {
      const response = await execute(data);
      store.login(
        {
          id: response?.id,
          name: response?.name,
          organizationType: response?.organizationType,
          status: response?.status,
        },
        process.env.NEXT_PUBLIC_API_KEY,
      );
      toast.success('Organization created successfully!', {
        position: 'top-right',
      });
      router.push('/home');
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
    }
  }, [error]);

  return (
    <div css={pageContainer}>
      <RegisterPage
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        loading={loading}
        watch={watch}
        theme={theme}
      />
    </div>
  );
};

export default RegisterContainer;
