'use client';

import { useTheme } from '@emotion/react';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { TransferResponse } from '@/features/transfer/types';
import { LoadingSpinner } from '@/shared-ui';
import useAccountStore from '@/store/account';
import useTransferStore from '@/store/transfer';
import { containerStyles } from '@/styles/pages/home/styles';
import { STATUS_TYPES } from '@/utils/constants';
import withAuth from '@/utils/hoc/withAuth';

const HomePage = dynamic(() => import('@/components/home/HomePage'), {
  loading: () => null,
  ssr: true,
});

const HomePageContainer = () => {
  const theme = useTheme();

  const accounts = useAccountStore(state => state.accounts);
  const transfers = useTransferStore(state => state.transfers);

  const totalBalance = accounts?.reduce((acc, account) => acc + account.balance.balance, 0) || 0;

  const transfersArray = Array.isArray(transfers) ? transfers : transfers?.results || [];

  const totalTransfers = transfersArray.length || 0;
  const pendingTransfers =
    transfersArray.filter((t: TransferResponse) => t.status === STATUS_TYPES.PENDING).length || 0;

  return (
    <section css={containerStyles}>
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage
          theme={theme}
          totalBalance={totalBalance}
          totalTransfers={totalTransfers}
          pendingTransfers={pendingTransfers}
        />
      </Suspense>
    </section>
  );
};

export default withAuth(HomePageContainer, {
  isPrivate: true,
  redirectTo: '/register',
});
