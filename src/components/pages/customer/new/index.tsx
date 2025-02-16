'use client';

import {
  containerCss,
  errorTextCss,
  formCss,
  inputGroupCss,
  titleCss,
} from './styles';
import { Button, Input } from '@/shared';
import { AccountResponse, CustomerData } from '@/features/customer/schemas';
import { type FormEventHandler } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

type NewCustomerPageProps = {
  register: UseFormRegister<{
    name: string;
    email: string;
  }>;
  handleSubmit: (
    onSubmit: (data: CustomerData) => Promise<void>,
  ) => FormEventHandler<HTMLFormElement> | undefined;
  onSubmit: (data: CustomerData) => Promise<void>;
  errors: FieldErrors<{ name: string; email: string }>;
  loading: boolean;
  error: Error | null;
  account: AccountResponse | null;
  theme: unknown;
};

export default function NewCustomerPage({
  register,
  handleSubmit,
  onSubmit,
  errors,
  loading,
  error,
  account,
  theme,
}: NewCustomerPageProps) {
  return (
    <section css={containerCss}>
      <h1 css={titleCss}>Create a New Customer</h1>
      <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
        <div css={inputGroupCss}>
          <label htmlFor="name">Name</label>
          <Input type="text" placeholder="John Doe" {...register('name')} />
          {errors.name && <p css={errorTextCss}>{errors.name.message}</p>}
        </div>

        <div css={inputGroupCss}>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="john@example.com"
            {...register('email')}
          />
          {errors.email && <p css={errorTextCss}>{errors.email.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="medium"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </form>

      {error && <p css={errorTextCss}>{error.message}</p>}

      {account && (
        <div>
          <h3>Account Created Successfully 🎉</h3>
          <p>
            <strong>Balance:</strong> ${account.balance}
          </p>
          <p>
            <strong>Wallet Address:</strong> {account.walletAddress}
          </p>
        </div>
      )}
    </section>
  );
}
