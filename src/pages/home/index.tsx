'use client';

import { HomeHero } from '@/components';
import AccountService from '@/features/account/services';
import useAccountStore from '@/store/account';
import { containerStyles } from '@/styles/pages/home/styles';
import withAuth from '@/utils/functions/withAuth';
import { useServiceEffect } from '@/utils/hooks/useServiceEffect';

const HomePageContainer = () => {
  const accountsStore = useAccountStore((state) => state);
  const setAccountsState = accountsStore.setAccountsState;

  useServiceEffect(undefined, AccountService.get, setAccountsState, []);

  return (
    <main css={containerStyles}>
      <HomeHero />
    </main>
  );
};

export default withAuth(HomePageContainer, { isPrivate: true, redirectTo: '/register' });
