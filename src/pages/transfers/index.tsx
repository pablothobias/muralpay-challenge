import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { LoadingSpinner } from '@/shared-ui';
import { pageContainerCss, transfersContainerCss } from '@/shared-ui/pages/transfers/styles';
import withAuth from '@/utils/hoc/withAuth';

const TransfersPage = dynamic(() => import('@/shared-ui/pages/transfers'), {
  loading: () => null,
  ssr: true,
});

const TransferContainerPage = () => {
  return (
    <div css={pageContainerCss}>
      <div css={transfersContainerCss}>
        <Suspense fallback={<LoadingSpinner />}>
          <TransfersPage />
        </Suspense>
      </div>
    </div>
  );
};

export default withAuth(TransferContainerPage, {
  isPrivate: true,
  redirectTo: '/register',
});
