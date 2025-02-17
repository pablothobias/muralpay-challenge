'use client';

import { Button, Input, LoadingSpinner, Select } from '@/components';
import { type OrganizationSchema } from '@/features/organization/types';
import { OrganizationType } from '@/utils/constants';
import { type FormEventHandler } from 'react';
import {
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from 'react-hook-form';
import { containerCss, formCss, pageContainer, titleCss } from './styles';

type RegisterPageProps = {
  register: UseFormRegister<OrganizationSchema>;
  handleSubmit: (
    onSubmit: (data: OrganizationSchema) => Promise<void>,
  ) => FormEventHandler<HTMLFormElement> | undefined;
  onSubmit: (data: OrganizationSchema) => Promise<void>;
  errors: FieldErrors<OrganizationSchema>;
  loading: boolean;
  watch: UseFormWatch<OrganizationSchema>;
  theme: unknown;
};

const RegisterPage = ({
  register,
  handleSubmit,
  onSubmit,
  watch,
  errors,
  loading,
}: RegisterPageProps) => {
  const organizationType = watch('organizationType');
  const isIndividual = organizationType === OrganizationType.INDIVIDUAL;

  if (loading) return <LoadingSpinner />;

  return (
    <div css={pageContainer}>
      <section css={containerCss}>
        <h1 css={titleCss}>Create a New organization</h1>
        <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
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

          <Input
            htmlFor="name"
            label="Name"
            type="text"
            placeholder={isIndividual ? 'John' : 'Sun Tree Capital LLC'}
            {...register('name')}
            error={errors.name?.message}
          />

          {isIndividual && (
            <Input
              htmlFor="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          )}

          {isIndividual && (
            <Input
              htmlFor="email"
              label="E-mail"
              type="email"
              placeholder="johndoe@test.com"
              {...register('email')}
              error={errors.email?.message}
            />
          )}

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
    </div>
  );
};

export default RegisterPage;
