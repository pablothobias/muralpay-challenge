import { zodResolver } from '@hookform/resolvers/zod';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';

import { accountSchema } from '@/features/account/schemas';
import { AccountSchema } from '@/features/account/types';
import { LoadingSpinner } from '@/shared-ui';
import withAuth from '@/utils/hoc/withAuth';

const AccountsPage = dynamic(() => import('@/shared-ui/pages/accounts'), {
  loading: () => null,
  ssr: true,
});

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
    <Suspense fallback={<LoadingSpinner />}>
      <AccountsPage
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        control={control}
      />
    </Suspense>
  );
};

export default withAuth(AccountsContainerPage, {
  isPrivate: true,
  redirectTo: '/register',
});
