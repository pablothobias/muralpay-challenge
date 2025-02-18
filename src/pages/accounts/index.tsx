import { LoadingSpinner } from '@/components';
import AccountsPage from '@/components/pages/accounts';
import { accountSchema } from '@/features/account/schemas';
import AccountService from '@/features/account/services';
import { AccountSchema } from '@/features/account/types';
import { useServiceEffect } from '@/utils/hooks/useServiceEffect';
import { useServiceOnAction } from '@/utils/hooks/useServiceOnAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AccountsContainerPage = () => {
  const {
    loading: getAccountsLoading,
    error: getAccountsError,
    data,
  } = useServiceEffect(undefined, AccountService.get, []);
  const {
    loading: createAccountLoading,
    error: createAccountError,
    execute,
  } = useServiceOnAction(AccountService.create, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const handleCreateAccount = async (data: AccountSchema) => {
    if (!data) return;

    const response = await execute(data);
    if (response) {
      toast.success('Account created successfully!');
    } else {
      console.error(createAccountError);
      toast.error('Failed to create account');
    }
  };

  const isLoading = useMemo(() => {
    return getAccountsLoading || createAccountLoading;
  }, [getAccountsLoading, createAccountLoading]);
  const hasError = useMemo(() => {
    return getAccountsError || createAccountError;
  }, [getAccountsError, createAccountError]);

  if (isLoading) return <LoadingSpinner />;
  if (hasError) return <p>{getAccountsError?.message || createAccountError?.message}</p>;

  return (
    <AccountsPage
      loading={isLoading}
      accounts={data!}
      register={register}
      errors={errors}
      handleSubmit={handleSubmit(handleCreateAccount)}
    />
  );
};

export default AccountsContainerPage;
