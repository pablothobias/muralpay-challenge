import NewOrganizationPage from '@/components/pages/organization/new';
import {
  OrganizationResponse,
  organizationSchema,
  OrganizationSchema,
} from '@/features/organization/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@emotion/react';
import { useServices } from '@/utils/hooks/useServices';
import OrganizationService from '@/features/organization/services';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { pageContainer } from './styles';

const NewOrganizationContainer = () => {
  const theme = useTheme();
  const {
    execute,
    data: organization,
    error,
    loading,
  } = useServices<OrganizationSchema, OrganizationResponse>(
    (data: OrganizationSchema) => OrganizationService.create(data),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data: OrganizationSchema) => {
    try {
      await execute(data);
      toast.success('Organization created successfully!', {
        position: 'top-right',
      });
    } catch (error: unknown) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
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
      <NewOrganizationPage
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        loading={loading}
        organization={organization}
        theme={theme}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: { value: true },
  };
};

export default NewOrganizationContainer;
