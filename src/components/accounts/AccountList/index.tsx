import {
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';

import { AccountResponse, AccountResponseArray } from '@/features/account/types';
import { Button, Icon, List } from '@/shared-ui';

import useAccountStore from '@/store/account';
import { useAccountActions } from '@/store/account/hooks';
import { AccountState } from '@/store/account/types';
import { STATUS_TYPES } from '@/utils/constants';
import { useLoading } from '@/utils/context/LoadingContext';
import { useToast } from '@/utils/context/ToastContext';
import { formatCurrency } from '@/utils/functions/formatCurrency';

import {
  accountInfo,
  accountItemRightRow,
  accountListContainerCss,
  accountListHeaderCss,
  contentCss,
  leftContentCss,
  rightContentCss,
  statusBadgeCss,
  statusCss,
} from './styles';

const AccountInfoModalContent = dynamic(
  () => import('@/components/accounts/AccountInfoModalContent'),
  {
    ssr: false,
    loading: () => null,
  },
);

const CreateTransferModalContent = dynamic(
  () => import('@/components/transfer/CreateTransferModalContent'),
  {
    ssr: false,
    loading: () => null,
  },
);

const Modal = dynamic(() => import('@/shared-ui/molecules/Modal'), {
  ssr: false,
  loading: () => null,
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

  const { isLoading, setLoadingState } = useLoading();
  const { showError } = useToast();

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountRows, setAccountRows] = useState<AccountRowProps[]>([]);
  const [accounts, setAccounts] = useState<AccountResponseArray>([]);
  const { refreshAccounts } = useAccountActions();
  const [selectedAccount, setSelectedAccount] = useState<AccountResponse>();

  useEffect(() => {
    const unsubscribe = useAccountStore.subscribe(
      (state: AccountState) => state,
      ({ accounts, loading }) => {
        setLoadingState('refreshAccounts', !!loading);
        setAccounts(accounts || []);
      },
    );

    const controller = new AbortController();

    async function fetchAccounts() {
      if (isLoading || controller.signal.aborted) return;
      try {
        setLoadingState('refreshAccounts', true);
        await refreshAccounts(controller.signal);
      } catch (error) {
        showError('fetchAccounts', (error as Error).message);
      } finally {
        setLoadingState('refreshAccounts', false);
      }
    }

    fetchAccounts();

    return () => {
      unsubscribe();
      controller.abort();
    };
  }, []);

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
      <div css={contentCss} role="button" data-testid={`account-address-${account.id}`}>
        <div css={leftContentCss}>
          <h3>{account.name}</h3>
          <p>{account.blockchain}</p>
        </div>
        <div css={rightContentCss}>
          <span css={accountInfo} data-testid={`balance-${account.id}`}>
            {formatCurrency(account.balance.balance, account.balance.tokenSymbol)}
            &nbsp;
            {account.balance.tokenSymbol}&nbsp;
            <Icon name="cash" />
          </span>
          <span css={accountInfo} data-testid={`address-${account.id}`}>
            {account.address}&nbsp; <Icon name="card" />
          </span>
          <div css={accountItemRightRow}>
            <span
              css={statusBadgeCss(account.isPending ? STATUS_TYPES.PENDING : STATUS_TYPES.ACTIVE)}
              data-testid={`status-badge-${account.id}`}
            >
              {account.isPending ? STATUS_TYPES.PENDING : STATUS_TYPES.ACTIVE}
              <Status status={account.isPending ? STATUS_TYPES.PENDING : STATUS_TYPES.ACTIVE} />
            </span>
          </div>
        </div>
      </div>
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
          icon={<Icon name="swap" />}
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
        size: 'large',
        content: <AccountInfoModalContent account={selectedAccount!} />,
      })}
    </div>
  );
};

export default AccountList;
