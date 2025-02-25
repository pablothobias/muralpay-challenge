'use client';

import { HomePage } from '@/shared-ui';
import useAccountStore from '@/store/account';
import useTransferStore from '@/store/transfer';
import { containerStyles } from '@/styles/pages/home/styles';
import { STATUS_TYPES } from '@/utils/constants';
import withAuth from '@/utils/hoc/withAuth';
import { useTheme } from '@emotion/react';

const HomePageContainer = () => {
  const theme = useTheme();

  const accounts = useAccountStore((state) => state.accounts);
  const transfers = useTransferStore((state) => state.transfers);

  const totalBalance = accounts?.reduce((acc, account) => acc + account.balance.balance, 0) || 0;
  const totalTransfers = transfers?.results?.length || 0;
  const pendingTransfers =
    transfers?.results?.filter((t) => t.status === STATUS_TYPES.PENDING).length || 0;
  return (
    <section css={containerStyles}>
      <HomePage
        theme={theme}
        totalBalance={totalBalance}
        totalTransfers={totalTransfers}
        pendingTransfers={pendingTransfers}
      />
    </section>
  );
};

export default withAuth(HomePageContainer, { isPrivate: true, redirectTo: '/register' });
