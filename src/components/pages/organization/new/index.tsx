'use client';

import { containerCss, formCss, titleCss } from './styles';
import { Button, Input, LoadingSpinner, Select } from '@/components';
import {
  type OrganizationSchema,
  type OrganizationResponse,
} from '@/features/organization/schemas';
import { OrganizationType } from '@/utils/constants';
import { type FormEventHandler } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

type NewOrganizationPageProps = {
  register: UseFormRegister<OrganizationSchema>;
  handleSubmit: (
    onSubmit: (data: OrganizationSchema) => Promise<void>,
  ) => FormEventHandler<HTMLFormElement> | undefined;
  onSubmit: (data: OrganizationSchema) => Promise<void>;
  errors: FieldErrors<OrganizationSchema>;
  loading: boolean;
  organization: OrganizationResponse | null;
  theme: unknown;
};

const NewOrganizationPage = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  loading,
}: NewOrganizationPageProps) => {
  if (loading) return <LoadingSpinner />;

  return (
    <section css={containerCss}>
      <h1 css={titleCss}>Create a New organization</h1>
      <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
        <Input
          htmlFor="name"
          label="Name"
          type="text"
          placeholder="Sun Tree Capital LLC"
          {...register('name')}
          error={errors.name?.message}
        />

        <Select
          htmlFor="organizationType"
          label="Organization Type"
          placeholder="Select an organization type"
          options={[
            { value: OrganizationType.BUSINESS, label: 'Business' },
            { value: OrganizationType.INDIVIDUAL, label: 'Individual' },
          ]}
          {...register('organizationType')}
          error={errors.organizationType?.message}
        />

        <Button
          type="submit"
          variant="secondary"
          size="medium"
          disabled={loading}
        >
          Create Organization
        </Button>
      </form>
    </section>
  );
};

export default NewOrganizationPage;
