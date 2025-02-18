import { Button, Icon, List, LoadingSpinner } from '@/components';
import AccountInfoModalContent from '@/components/organisms/AccountInfoModalContent';
import { AccountResponse } from '@/features/account/types';
import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import {
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  accountBalance,
  accountItemRightRow,
  accountListContainerCss,
  accountListHeaderCss,
  contentCss,
  emptyStateCss,
  rightContentCss,
  statusCss,
  statusFontCss,
} from './styles';

const Modal = dynamic(() => import('@/components/molecules/Modal'), {
  loading: () => <LoadingSpinner />,
});

type AccountListProps = {
  accounts: AccountResponse[];
  loading: boolean;
};

type AccountRowProps = {
  element: ReactElement;
  id: string;
};

const Status = ({ status }: { status: string }) => {
  return <div css={statusCss(status)} />;
};

const AccountList = ({ accounts, loading }: AccountListProps) => {
  const theme = useTheme();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountRows, setAccountRows] = useState<AccountRowProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AccountResponse>();

  const selectAccount = (accountId: string) => {
    setSelectedAccount(() => accounts.find((acc) => acc.id === accountId));
    setIsAccountModalOpen(true);
  };

  const renderModal = useCallback(
    ({
      isOpen,
      setOpen,
      title,
      content,
    }: {
      isOpen: boolean;
      setOpen: Dispatch<SetStateAction<boolean>>;
      title?: string;
      content: ReactNode;
    }) => {
      return (
        <Modal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          title={title}
          size="medium"
          footer={
            <>
              <Button variant="warning" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="success">Save</Button>
            </>
          }
        >
          {content}
        </Modal>
      );
    },
    [isTransferModalOpen, isAccountModalOpen],
  );

  const mountAccountsRows = (account: AccountResponse) => ({
    element: (
      <>
        <div css={contentCss}>
          <h3>{account.name}</h3>
          <p>{account.blockchain}</p>
        </div>
        <div css={rightContentCss}>
          <span css={accountBalance}>
            {account.balance.balance} {account.balance.tokenSymbol}
          </span>
          <small css={accountItemRightRow}>
            <p css={statusFontCss(account.isPending ? 'PENDING' : 'ACTIVE')}>
              {account.isPending ? 'PENDING' : 'ACTIVE'}
            </p>
            <Status status={account.isPending ? 'PENDING' : 'ACTIVE'} />
          </small>
          <small css={accountItemRightRow}>
            <b>{account.address}</b>
            <Icon name="card" />
          </small>
        </div>
      </>
    ),
    id: account.id,
  });

  useEffect(() => {
    setAccountRows(() => accounts?.map((account) => mountAccountsRows(account)));
  }, [accounts]);

  if (loading) return <Skeleton circle height={50} width={50} />;

  return (
    <div css={accountListContainerCss(theme)}>
      {accounts?.length ? (
        <>
          <div css={accountListHeaderCss}>
            <h2>Accounts</h2>
            <Button
              variant="secondary"
              onClick={() => setIsTransferModalOpen(true)}
              icon={<IoSwapHorizontalOutline />}
            >
              New Transfer
            </Button>
          </div>
          <List
            items={accountRows}
            emptyStateMessage="No transfers yet. Start by making your first transfer!"
            onClick={selectAccount}
          />
          {renderModal({
            isOpen: isTransferModalOpen,
            setOpen: setIsTransferModalOpen,
            title: 'Transfer',
            content: 'Transfer',
          })}
          {renderModal({
            isOpen: isAccountModalOpen,
            setOpen: setIsAccountModalOpen,
            title: selectedAccount?.name,
            content: <AccountInfoModalContent account={selectedAccount!} />,
          })}
        </>
      ) : (
        <div css={emptyStateCss(theme)}>
          <h2>No accounts yet. Start by creating your first account!</h2>
        </div>
      )}
    </div>
  );
};

export default AccountList;
