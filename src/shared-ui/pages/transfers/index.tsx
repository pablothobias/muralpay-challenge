import {
  type Dispatch,
  type FC,
  memo,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';

import {
  IoCardOutline,
  IoDocumentTextOutline,
  IoSwapVerticalOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoWalletOutline,
} from 'react-icons/io5';

import { MdAccountBalanceWallet } from 'react-icons/md';

import CreateTransferModalContent from '@/components/transfer/CreateTransferModalContent';
import { TransferListResponseSchema, TransferResponse } from '@/features/transfer/types';
import { Button, Icon, LoadingSpinner } from '@/shared-ui';
import EmptyList from '@/shared-ui/molecules/EmptyList';
import useAccountStore from '@/store/account';
import useTransferStore from '@/store/transfer';
import { useTransferActions } from '@/store/transfer/hooks';
import { RECIPIENT_TRANSFER_TYPE, STATUS_TYPES } from '@/utils/constants';
import { useLoading } from '@/utils/context/LoadingContext';
import { useToast } from '@/utils/context/ToastContext';
import { formatCurrency } from '@/utils/functions/formatCurrency';

import {
  amountTextCss,
  buttonCss,
  cardHeaderCss,
  cardMetadataCss,
  detailTextCss,
  feeDetailsCss,
  feeItemCss,
  headerCss,
  leftContentRowCss,
  loadingContainerCss,
  memoTextCss,
  recipientCardCss,
  recipientHeaderCss,
  recipientInfoCss,
  statusBadgeCss,
  transferCardCss,
  transferListCss,
} from './styles';

const Modal = dynamic(() => import('@/shared-ui/molecules/Modal'), {
  ssr: false,
  loading: () => null,
});

const TransferListHeader = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => (
  <div css={headerCss}>
    <h1>Transfers</h1>
    <Button variant="secondary" onClick={() => setIsOpen(true)} icon={<Icon name="swap" />}>
      New Transfer
    </Button>
  </div>
);

const RecipientInfoContent = memo((recipient: TransferResponse['recipientsInfo'][0]) => {
  const isFiat = recipient.recipientTransferType === RECIPIENT_TRANSFER_TYPE.FIAT;
  const amount = isFiat
    ? formatCurrency(
        recipient.bankDetails?.tokenAmount || 0,
        recipient.bankDetails?.currencyCode || 'USD',
      )
    : formatCurrency(recipient.tokenAmount || 0, 'XBT');

  return (
    <div key={recipient.id} css={recipientCardCss}>
      <div css={recipientHeaderCss}>
        <div css={cardMetadataCss}>
          {isFiat ? <IoWalletOutline size={20} /> : <MdAccountBalanceWallet size={20} />}
          <span>
            {isFiat
              ? `${recipient.bankDetails?.bankName || ''} - ${
                  recipient.bankDetails?.bankAccountNumber || ''
                }`
              : recipient.walletDetails?.walletAddress || ''}
          </span>
        </div>
        <span css={amountTextCss}>{amount}</span>
      </div>

      {isFiat && recipient.bankDetails && recipient.bankDetails.exchangeRate && (
        <div css={feeDetailsCss}>
          <div css={feeItemCss}>
            <span>Exchange Rate</span>
            <span css={cardMetadataCss}>
              <IoTrendingUpOutline size={16} />
              {recipient.bankDetails.exchangeRate.toFixed(2)}
            </span>
          </div>
          {recipient.bankDetails.transactionFee && (
            <div css={feeItemCss}>
              <span>Transaction Fee</span>
              <span css={cardMetadataCss}>
                <IoCardOutline size={16} />
                {recipient.bankDetails.transactionFee}%
              </span>
            </div>
          )}
          {recipient.bankDetails.exchangeFeePercentage && (
            <div css={feeItemCss}>
              <span>Exchange Fee</span>
              <span css={cardMetadataCss}>
                <IoSwapVerticalOutline size={16} />
                {recipient.bankDetails.exchangeFeePercentage}%
              </span>
            </div>
          )}
          {recipient.bankDetails.feeTotal && (
            <div css={feeItemCss}>
              <span>Total Fees</span>
              <span css={cardMetadataCss}>
                <IoWalletOutline size={16} />
                {formatCurrency(recipient.bankDetails.feeTotal, recipient.bankDetails.currencyCode)}
              </span>
            </div>
          )}
        </div>
      )}

      {!isFiat && recipient.walletDetails && (
        <div css={detailTextCss}>
          <MdAccountBalanceWallet size={16} />
          <span>Wallet: {recipient.walletDetails.walletAddress}</span>
        </div>
      )}

      <div css={cardMetadataCss}>
        <IoTimeOutline size={16} />
        <span>
          Created:
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(recipient.createdAt))}
        </span>
      </div>
    </div>
  );
});

const TransfersPage: FC = () => {
  const theme = useTheme();

  const accounts = useAccountStore((state) => state.accounts);
  const { executeTransfer, cancelTransfer, refreshTransfers } = useTransferActions();

  const { showSuccess, showError } = useToast();
  const { setLoadingState, isLoading } = useLoading();

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const [transfersList, setTransfersList] = useState<TransferListResponseSchema['results']>([]);

  const transfers = useTransferStore((state) => state.transfers);
  const loading = useTransferStore((state) => state.loading);

  useEffect(() => {
    setTransfersList(transfers?.results || []);
  }, [transfers]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTransfers() {
      if (loading) return;

      setLoadingState('fetchTransfers', true);
      try {
        await refreshTransfers(controller.signal);
      } catch (error) {
        if (!controller.signal.aborted) {
          showError('fetchTransfers', (error as Error).message);
        }
      } finally {
        setLoadingState('fetchTransfers', false);
      }
    }

    fetchTransfers();

    return () => {
      controller.abort();
    };
  }, []);

  const handleTransferAction = useCallback(
    async (
      serviceFunction: typeof cancelTransfer | typeof executeTransfer,
      transferId: string,
      action: 'cancel' | 'execute',
    ) => {
      try {
        await serviceFunction(transferId);
        showSuccess('transfer', `${action} transfer successfully!`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : `Failed to ${action} transfer`;
        showError('transfer', errorMessage);
      }
    },
    [],
  );

  if (isLoading)
    return (
      <div css={loadingContainerCss}>
        <LoadingSpinner />
      </div>
    );

  if (transfersList.length === 0)
    return (
      <>
        <TransferListHeader setIsOpen={setIsTransferModalOpen} />
        <EmptyList theme={theme} />
      </>
    );

  return (
    <>
      <TransferListHeader setIsOpen={setIsTransferModalOpen} />
      <div css={transferListCss}>
        {transfersList.map((transfer) => (
          <div css={transferCardCss} key={transfer.id}>
            <div css={cardHeaderCss}>
              <div css={leftContentRowCss}>
                <h4>
                  {
                    (accounts || []).find((account) => account.id === transfer.payoutAccountId)
                      ?.name
                  }
                </h4>
                <h5 css={memoTextCss}>{transfer.memo}</h5>
                <div css={cardMetadataCss}>
                  <IoDocumentTextOutline size={16} />
                  <span>ID: {transfer.id}</span>
                </div>
                <div css={cardMetadataCss}>
                  <IoTimeOutline size={16} />
                  <span>
                    Created:
                    {Intl.DateTimeFormat('en-US', {
                      dateStyle: 'medium',
                    }).format(new Date(transfer.createdAt))}
                  </span>
                </div>
                <span css={statusBadgeCss(transfer.status)}>
                  {transfer.status.replace('_', ' ')}
                </span>
              </div>
              {transfer.status === STATUS_TYPES.IN_REVIEW && (
                <Button
                  css={buttonCss}
                  variant="success"
                  onClick={() => handleTransferAction(executeTransfer, transfer.id, 'execute')}
                  icon={<Icon name="swap" />}
                >
                  Execute transfer
                </Button>
              )}
              {transfer.status === STATUS_TYPES.PENDING && (
                <Button
                  css={buttonCss}
                  variant="danger"
                  onClick={() => handleTransferAction(cancelTransfer, transfer.id, 'cancel')}
                  icon={<Icon name="swap" />}
                >
                  Cancel transfer
                </Button>
              )}
            </div>

            <div css={recipientInfoCss}>
              {transfer?.recipientsInfo?.map((recipient) => (
                <RecipientInfoContent key={recipient.id} {...recipient} />
              ))}
            </div>
          </div>
        ))}

        <Modal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          title="New Transfer"
          size="extraLarge"
        >
          <CreateTransferModalContent setModalOpen={setIsTransferModalOpen} />
        </Modal>
      </div>
    </>
  );
};

RecipientInfoContent.displayName = 'RecipientInfoContent';

export default TransfersPage;
