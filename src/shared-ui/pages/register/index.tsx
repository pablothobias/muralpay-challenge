'use client';

import { Button, Input, LoadingSpinner, Select } from '@/shared-ui';
import { type OrganizationSchema } from '@/features/organization/types';
import { type FormEventHandler } from 'react';
import { type FieldErrors, type UseFormRegister, type UseFormWatch } from 'react-hook-form';
import { formCss, pageContainer, titleCss, cardContainerCss } from './styles';
import { RECIPIENT_TYPE } from '@/utils/constants';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('@/shared-ui/atoms/Card'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const OrganizationType = RECIPIENT_TYPE;

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

  return (
    <div css={pageContainer}>
      <Card variant="outlined" css={cardContainerCss}>
        <h1 css={titleCss}>Create a New organization</h1>
        <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
          <Select
            id="organizationType"
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
            id="name"
            label="Name"
            type="text"
            placeholder={isIndividual ? 'John' : 'Sun Tree Capital LLC'}
            {...register('name')}
            error={errors.name?.message}
          />

          {isIndividual && (
            <Input
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          )}

          {isIndividual && (
            <Input
              id="email"
              label="E-mail"
              type="email"
              placeholder="johndoe@test.com"
              {...register('email')}
              error={errors.email?.message}
            />
          )}

          <Button type="submit" variant="secondary" size="medium" disabled={loading}>
            Create Organization
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
