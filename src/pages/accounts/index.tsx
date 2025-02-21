import AccountsPage from '@/shared-ui/pages/accounts';
import { accountSchema } from '@/features/account/schemas';
import { AccountSchema } from '@/features/account/types';
import { useAccountActions } from '@/store/account/hooks';
import { useToast } from '@/utils/context/ToastContext';
import withAuth from '@/utils/functions/withAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const AccountsContainerPage = () => {
  const { createAccount } = useAccountActions();
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const handleCreateAccount = async (data: AccountSchema) => {
    try {
      const response = await createAccount(data);
      if (response) showSuccess('account', 'Account created successfully!');
    } catch (error) {
      showError('account', (error as Error).message || 'Failed to create account');
    }
  };

  return (
    <AccountsPage
      register={register}
      errors={errors}
      handleSubmit={handleSubmit(handleCreateAccount)}
    />
  );
};

export default withAuth(AccountsContainerPage, { isPrivate: true, redirectTo: '/register' });
