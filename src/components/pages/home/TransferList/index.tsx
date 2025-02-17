import { useTheme } from '@emotion/react';
import { Button, List, Modal } from '@/components';
import { transferListContainerCss, transferListHeaderCss } from './styles';
import { AccountResponse } from '@/features/account/types';
import {
  IoArrowUpCircleOutline,
  IoArrowDownCircleOutline,
  IoWalletOutline,
  IoSwapHorizontalOutline,
} from 'react-icons/io5';
import { useState } from 'react';

interface TransferListProps {
  account?: AccountResponse;
}

const TransferList = ({ account }: TransferListProps) => {
  const theme = useTheme();
  console.log({ account });
  const [isOpen, setIsOpen] = useState(false);

  const transfers = [
    {
      id: '1',
      title: 'Payment to John Doe',
      subtitle: 'Transfer • 2 hours ago',
      rightTitle: '-$500.00',
      rightSubtitle: 'Completed',
      icon: <IoArrowUpCircleOutline size={24} color={theme.colors.error} />,
      iconBackground: theme.colors.error,
    },
    {
      id: '2',
      title: 'Received from Alice Smith',
      subtitle: 'Transfer • Yesterday',
      rightTitle: '+$1,200.00',
      rightSubtitle: 'Completed',
      icon: (
        <IoArrowDownCircleOutline size={24} color={theme.colors.secondary} />
      ),
      iconBackground: theme.colors.secondary,
    },
    {
      id: '3',
      title: 'Wallet Top-up',
      subtitle: 'Deposit • 3 days ago',
      rightTitle: '+$2,000.00',
      rightSubtitle: 'Processing',
      icon: <IoWalletOutline size={24} color={theme.colors.primary} />,
      iconBackground: theme.colors.primary,
    },
  ];

  return (
    <div css={transferListContainerCss(theme)}>
      <div css={transferListHeaderCss}>
        <h2>Recent Transfers</h2>
        <Button
          variant="secondary"
          onClick={() => setIsOpen(true)}
          icon={<IoSwapHorizontalOutline />}
        >
          New Transfer
        </Button>
      </div>
      <List
        items={transfers}
        emptyStateMessage="No transfers yet. Start by making your first transfer!"
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        size="medium"
        footer={
          <>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="secondary">Save</Button>
          </>
        }
      >
        <p>Modal content goes here</p>
      </Modal>
    </div>
  );
};

export default TransferList;
