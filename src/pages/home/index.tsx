'use client';

import { HomeHero, LoadingSpinner } from '@/components';
import { accountSchema } from '@/features/account/schemas';
import AccountService from '@/features/account/services';
import { AccountSchema } from '@/features/account/types';
import { containerStyles } from '@/styles/pages/home/styles';
import withAuth from '@/utils/functions/withAuth';
import { useServiceEffect } from '@/utils/hooks/useServiceEffect';
import { useServiceOnAction } from '@/utils/hooks/useServiceOnAction';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const TransferList = dynamic(() => import('@/components/pages/home/TransferList'), {
  loading: () => <LoadingSpinner />,
});

const HomePageContainer = () => {
  const [accountId, setAccountId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const {
    loading: accountLoading,
    error: fetchError,
    data: accounts,
  } = useServiceEffect(undefined, AccountService.get, [accountId]);

  const {
    execute,
    loading: createAccountLoading,
    error: createAccountError,
  } = useServiceOnAction(AccountService.create, []);

  const handleCreateAccount = async (data: AccountSchema) => {
    if (!data) return;

    const response = await execute(data);
    if (response?.id) {
      toast.success('Account created successfully!');
      setAccountId(response.id);
    } else {
      console.error(createAccountError);
      toast.error('Failed to create account');
    }
  };

  const isLoading = useMemo(
    () => accountLoading || createAccountLoading,
    [accountLoading, createAccountLoading],
  );
  const hasError = useMemo(
    () => !!fetchError || !!createAccountError,
    [fetchError, createAccountError],
  );

  if (isLoading) return <LoadingSpinner />;
  if (hasError) toast.error(fetchError?.message || createAccountError?.message);

  return (
    <main css={containerStyles}>
      <HomeHero
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(handleCreateAccount)}
      />
      <TransferList accounts={accounts || []} />
    </main>
  );
};

export default withAuth(HomePageContainer, { isPrivate: true, redirectTo: '/register' });
