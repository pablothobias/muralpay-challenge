import AccountsPage from '@/shared-ui/pages/accounts';
import { accountSchema } from '@/features/account/schemas';
import { AccountSchema } from '@/features/account/types';
import withAuth from '@/utils/hoc/withAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const AccountsContainerPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });
  return (
    <AccountsPage
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      control={control}
    />
  );
};

export default withAuth(AccountsContainerPage, { isPrivate: true, redirectTo: '/register' });
