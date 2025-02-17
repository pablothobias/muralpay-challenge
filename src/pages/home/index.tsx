import { HomeHero, LoadingSpinner } from '@/components';
import TransferList from '@/components/pages/home/TransferList';
import { accountSchema } from '@/features/account/schemas';
import AccountService from '@/features/account/services';
import { AccountResponse, AccountSchema } from '@/features/account/types';
import { useAuthStore } from '@/store/auth';
import { containerStyles } from '@/styles/pages/home/styles';
import withAuth from '@/utils/functions/withAuth';
import { useServices } from '@/utils/hooks/useServices';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const HomePageContainer = () => {
  const { user } = useAuthStore();

  const [account, setAccount] = useState<AccountResponse>();

  const { execute, error, loading } = useServices<
    AccountSchema,
    AccountResponse
  >((data: AccountSchema) => AccountService.create(data), [user?.id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
  });

  const onSubmit = async (data: AccountSchema) => {
    try {
      const response = await execute(data);
      setAccount(response as AccountResponse);
    } catch (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
    }
  };

  if (error) return <div>{error.message}</div>;
  if (loading) return <LoadingSpinner />;

  console.log(account);

  return (
    <main css={containerStyles}>
      <HomeHero
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
      <TransferList />
    </main>
  );
};

export default withAuth(HomePageContainer, {
  isPrivate: true,
  redirectTo: '/register',
});
