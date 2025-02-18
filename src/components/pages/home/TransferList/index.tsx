import { Button, List, LoadingSpinner } from '@/components';
import { AccountResponse } from '@/features/account/types';
import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import { type ReactElement, useEffect, useState } from 'react';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import {
  contentCss,
  rightContentCss,
  transferListContainerCss,
  transferListHeaderCss,
} from './styles';

const Modal = dynamic(() => import('@/components/molecules/Modal'), {
  loading: () => <LoadingSpinner />,
});

type TransferListProps = {
  accounts: AccountResponse[];
};

type AccountRowProps = {
  element: ReactElement;
  id: string;
};

const TransferList = ({ accounts }: TransferListProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [accountRows, setAccountRows] = useState<AccountRowProps[]>([]);

  // const transfers = [
  //   {
  //     id: '1',
  //     title: 'Payment to John Doe',
  //     subtitle: 'Transfer • 2 hours ago',
  //     rightTitle: '-$500.00',
  //     rightSubtitle: 'Completed',
  //     icon: <IoArrowUpCircleOutline size={24} color={theme.colors.error} />,
  //     iconBackground: theme.colors.error,
  //   },
  //   {
  //     id: '2',
  //     title: 'Received from Alice Smith',
  //     subtitle: 'Transfer • Yesterday',
  //     rightTitle: '+$1,200.00',
  //     rightSubtitle: 'Completed',
  //     icon: <IoArrowDownCircleOutline size={24} color={theme.colors.secondary} />,
  //     iconBackground: theme.colors.secondary,
  //   },
  //   {
  //     id: '3',
  //     title: 'Wallet Top-up',
  //     subtitle: 'Deposit • 3 days ago',
  //     rightTitle: '+$2,000.00',
  //     rightSubtitle: 'Processing',
  //     icon: <IoWalletOutline size={24} color={theme.colors.primary} />,
  //     iconBackground: theme.colors.primary,
  //   },
  // ];

  const mountAccountRow = (account: AccountResponse) => ({
    element: (
      <>
        <div css={contentCss}>
          <h3>{account.name}</h3>
          <p>{account.blockchain}</p>
        </div>
        <div css={rightContentCss}>
          <span>
            {account.balance.balance} {account.balance.tokenSymbol}
          </span>
          <small>{account.isApiEnabled ? 'API Enabled' : 'API Disabled'}</small>
          <small>{account.isPending ? 'Pending' : 'Active'}</small>
        </div>
      </>
    ),
    id: account.id,
  });

  useEffect(() => {
    if (accounts.length === 0) return;

    setAccountRows(() => accounts.map((account) => mountAccountRow(account)));
  }, [accounts]);

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
        items={accountRows}
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
