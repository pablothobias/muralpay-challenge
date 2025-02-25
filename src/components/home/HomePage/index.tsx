import { LoadingSpinner, Modal } from '@/shared-ui';
import useAuthStore from '@/store/auth';
import dynamic from 'next/dynamic';
import { heroSectionStyles, welcomeCardStyles, cardGridStyles } from './styles';
import { useRouter } from 'next/router';
import { formatCurrency } from '@/utils/functions/formatCurrency';
import HomeStatsCard from '../HomeStatsCard';
import HomeActionCard from '../homeActionCards';
import { useState } from 'react';
import CreateTransferModalContent from '@/components/transfer/CreateTransferModalContent';
import { type ThemeType } from '@/styles/theme';

const Card = dynamic(() => import('@/shared-ui/atoms/Card'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

type HomePageProps = {
  theme: ThemeType;
  totalBalance: number;
  totalTransfers: number;
  pendingTransfers: number;
};

const HomePage = ({ theme, totalBalance, totalTransfers, pendingTransfers }: HomePageProps) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section css={heroSectionStyles}>
      <div className="content">
        <Card css={welcomeCardStyles(theme)}>
          <div className="welcome-content">
            <div className="welcome-text">
              <h1>
                Welcome to
                <strong>&nbsp;Mural Pay</strong>
                <strong>{` ${user?.name}.` || ' User.'}</strong>
              </h1>
              <p>Your financial dashboard is ready for you</p>
            </div>
          </div>
        </Card>

        <div css={cardGridStyles}>
          <HomeStatsCard
            icon="transfer"
            variant="info"
            statsValue={formatCurrency(totalBalance, 'USD')}
            statsLabel="Across all accounts"
            title="Total Balance"
          />
          <HomeStatsCard
            icon="refresh"
            variant="info"
            statsValue={String(totalTransfers)}
            statsLabel="All time transfers"
            title="Total Transfers"
          />
          <HomeStatsCard
            icon="pending"
            variant="warning"
            statsValue={String(pendingTransfers)}
            statsLabel="Pending transfers"
            title="Pending Transfers"
          />
        </div>

        <div css={cardGridStyles}>
          <HomeActionCard
            icon="users"
            title="Manage Accounts"
            description="View and manage your connected accounts"
            onClick={() => router.push('/accounts')}
          />

          <HomeActionCard
            icon="swap"
            title="New Transfer"
            description="Start a new transfer between accounts"
            onClick={() => setIsOpen(true)}
          />

          <HomeActionCard
            icon="cash"
            title="Transaction History"
            description="View your past transactions and analytics"
            onClick={() => router.push('/transfers')}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="New Transfer"
          size="extraLarge"
        >
          <CreateTransferModalContent setModalOpen={setIsOpen} />
        </Modal>
      </div>
    </section>
  );
};

export default HomePage;
