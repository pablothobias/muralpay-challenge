import { LoadingSpinner } from '@/components';
import AccountsPage from '@/components/pages/accounts';
import { accountSchema } from '@/features/account/schemas';
import AccountService from '@/features/account/services';
import { AccountSchema } from '@/features/account/types';
import useAccountStore from '@/store/account';
import { useServiceOnAction } from '@/utils/hooks/useServiceOnAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AccountsContainerPage = () => {
  const accountsStore = useAccountStore((state) => state);
  const {
    loading: createAccountLoading,
    error: createAccountError,
    execute,
  } = useServiceOnAction(AccountService.create);

  const {
    loading: getAccountsLoading,
    error: getAccountsError,
    execute: getAccountsExecute,
  } = useServiceOnAction(AccountService.get);

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
      refreshAccountList();
    } else {
      console.error(createAccountError);
      toast.error('Failed to create account');
    }
  };

  const refreshAccountList = useCallback(async () => {
    try {
      const response = await getAccountsExecute(undefined);
      if (response) {
        accountsStore.setAccountsState(response, false, undefined);
      }
    } catch (error: unknown) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = 'An unknown error occurred';

      console.error(getAccountsError);
      accountsStore.setAccountsState([], getAccountsLoading, getAccountsError?.message);
      toast.error(message);
    }
  }, [getAccountsExecute, accountsStore, getAccountsError, getAccountsLoading]);

  const isLoading = useMemo(() => {
    return accountsStore.loading || createAccountLoading || getAccountsLoading;
  }, [accountsStore.loading, createAccountLoading, getAccountsLoading]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <AccountsPage
      loading={isLoading}
      accounts={accountsStore.accounts!}
      register={register}
      errors={errors}
      handleSubmit={handleSubmit(handleCreateAccount)}
    />
  );
};

export default AccountsContainerPage;
