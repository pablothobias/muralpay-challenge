import { Button, Icon, List, LoadingSpinner } from '@/shared-ui';
import { AccountResponse, AccountResponseArray } from '@/features/account/types';
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
import useAccountStore from '@/store/account';
import { AccountState } from '@/store/account/types';
import { useLoading } from '@/utils/context/LoadingContext';
import { useAccountActions } from '@/store/account/hooks';

const AccountInfoModalContent = dynamic(
  () => import('@/components/accounts/AccountInfoModalContent'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

const CreateTransferModalContent = dynamic(
  () => import('@/components/transfer/CreateTransferModalContent'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

const Modal = dynamic(() => import('@/shared-ui/molecules/Modal'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

type AccountRowProps = {
  element: ReactElement;
  id: string;
};

const Status = ({ status }: { status: string }) => {
  return <div css={statusCss(status)} />;
};

const AccountList = () => {
  const theme = useTheme();

  const { setLoadingState, isLoading } = useLoading();
  const { refreshAccounts } = useAccountActions();

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountRows, setAccountRows] = useState<AccountRowProps[]>([]);
  const [accounts, setAccounts] = useState<AccountResponseArray>();
  const [selectedAccount, setSelectedAccount] = useState<AccountResponse>();

  useEffect(() => {
    async function fetchInitialAccounts() {
      await refreshAccounts();
    }

    const unsubscribe = useAccountStore.subscribe(
      (state: AccountState) => state,
      (state) => {
        setLoadingState('accountsPage', state.loading);
        setAccounts(state.accounts || []);
      },
    );

    fetchInitialAccounts();

    return () => {
      unsubscribe();
    };
  }, [setLoadingState]);

  const selectAccount = (accountId: string) => {
    setSelectedAccount(() => accounts!.find((acc) => acc.id === accountId));
    setIsAccountModalOpen(true);
  };

  const renderModal = useCallback(
    ({
      isOpen,
      setOpen,
      title,
      size,
      content,
    }: {
      isOpen: boolean;
      setOpen: Dispatch<SetStateAction<boolean>>;
      size?: 'small' | 'medium' | 'large' | 'extraLarge';
      title: string;
      content: ReactNode;
    }) => {
      return (
        <Modal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          title={title}
          size={size}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Back
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
    if (accounts) setAccountRows([...accounts!.map((account) => mountAccountsRows(account))]);
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
      <List
        loading={isLoading}
        items={accountRows}
        onClick={(accountId?: string) => selectAccount(accountId!)}
      />
      {renderModal({
        title: 'New Transfer',
        isOpen: isTransferModalOpen,
        setOpen: setIsTransferModalOpen,
        size: 'extraLarge',
        content: <CreateTransferModalContent setModalOpen={setIsTransferModalOpen} />,
      })}
      {renderModal({
        title: selectedAccount?.name || '',
        isOpen: isAccountModalOpen,
        setOpen: setIsAccountModalOpen,
        size: 'medium',
        content: <AccountInfoModalContent account={selectedAccount!} />,
      })}
    </div>
  );
};

export default AccountList;
