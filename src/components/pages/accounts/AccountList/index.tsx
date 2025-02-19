import { Button, Icon, List, LoadingSpinner } from '@/components';
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
import {
  accountBalance,
  accountItemRightRow,
  accountListContainerCss,
  accountListHeaderCss,
  contentCss,
  rightContentCss,
  statusCss,
  statusFontCss,
} from './styles';

const AccountInfoModalContent = dynamic(
  () => import('@/components/organisms/AccountInfoModalContent'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

const Modal = dynamic(() => import('@/components/molecules/Modal'), {
  ssr: false,
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
      onSave,
      content,
    }: {
      isOpen: boolean;
      setOpen: Dispatch<SetStateAction<boolean>>;
      title?: string;
      onSave: () => void;
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
              <Button variant="success" onClick={onSave}>
                Save
              </Button>
            </>
          }
        >
          {content}
        </Modal>
      );
    },
    [],
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

  return (
    <div css={accountListContainerCss(theme)}>
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
      <List loading={loading} items={accountRows} onClick={selectAccount} />
      {renderModal({
        title: 'New Transfer',
        isOpen: isTransferModalOpen,
        setOpen: setIsTransferModalOpen,
        onSave: () => {},
        // content: <CreateTransferModalContent />,
        content: <></>,
      })}
      {renderModal({
        title: selectedAccount?.name,
        isOpen: isAccountModalOpen,
        setOpen: setIsAccountModalOpen,
        onSave: () => {},
        content: <AccountInfoModalContent account={selectedAccount!} />,
      })}
    </div>
  );
};

export default AccountList;
