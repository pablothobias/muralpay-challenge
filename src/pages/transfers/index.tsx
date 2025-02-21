import { TransfersPage } from '@/shared-ui';
import withAuth from '@/utils/functions/withAuth';
import { pageContainerCss, transfersContainerCss } from '@/shared-ui/pages/transfers/styles';

const TransferContainerPage = () => {
  return (
    <div css={pageContainerCss}>
      <div css={transfersContainerCss}>
        <TransfersPage />
      </div>
    </div>
  );
};

export default withAuth(TransferContainerPage, { isPrivate: true, redirectTo: '/register' });
