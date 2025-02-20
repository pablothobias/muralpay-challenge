import { TransfersPage } from '@/components';
import withAuth from '@/utils/functions/withAuth';

const TransferContainerPage = () => {
  return <TransfersPage />;
};

export default withAuth(TransferContainerPage, { isPrivate: true, redirectTo: '/register' });
