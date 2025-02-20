import { LoadingSpinner } from '@/components';
import AccountsPage from '@/components/pages/accounts';
import { accountSchema } from '@/features/account/schemas';
import { AccountResponseArray, AccountSchema } from '@/features/account/types';
import useAccountStore from '@/store/account';
import { useAccountActions } from '@/store/account/hooks';
import { AccountState } from '@/store/account/types';
import { useLoading } from '@/utils/context/LoadingContext';
import { useToast } from '@/utils/context/ToastContext';
import withAuth from '@/utils/functions/withAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const AccountsContainerPage = () => {
  const { refreshAccounts, createAccount } = useAccountActions();
  const { showSuccess, showError } = useToast();
  const { setLoadingState, isLoading } = useLoading();

  const [accounts, setAccounts] = useState<AccountResponseArray>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  useEffect(() => {
    setLoadingState('createAccount', useAccountStore.getState().loading);
    (async function refreshAccountsData() {
      setLoadingState('refreshAccounts', useAccountStore.getState().loading);
      await refreshAccounts();
    })();

    const unsubscribeAccounts = useAccountStore.subscribe((state: AccountState) => {
      setLoadingState('refreshAccounts', state.loading);
      setAccounts(state.accounts || []);
    });
    const unsubscribe = useAccountStore.subscribe((state: AccountState) =>
      setLoadingState('createAccount', state.loading),
    );

    return () => {
      unsubscribeAccounts();
      unsubscribe();
    };
  }, []);

  const handleCreateAccount = async (data: AccountSchema) => {
    try {
      const response = await createAccount(data);
      if (response) showSuccess('account', 'Account created successfully!');
    } catch (error) {
      showError('account', (error as Error).message || 'Failed to create account');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <AccountsPage
      loading={isLoading}
      accounts={accounts}
      register={register}
      errors={errors}
      handleSubmit={handleSubmit(handleCreateAccount)}
    />
  );
};

export default withAuth(AccountsContainerPage, { isPrivate: true, redirectTo: '/register' });
