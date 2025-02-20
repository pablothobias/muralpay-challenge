import { Button, LoadingSpinner } from '@/components';
import CreateTransferModalContent from '@/components/organisms/CreateTransferModalContent';
import { TransferResponse, TransferStatus } from '@/features/transfer/types';
import useAccountStore from '@/store/account';
import useTransferStore from '@/store/transfer';
import { useTransferActions } from '@/store/transfer/hooks';
import { formatCurrency, RECIPIENT_TRANSFER_TYPE } from '@/utils/functions/formatCurrency';
import dynamic from 'next/dynamic';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  IoCardOutline,
  IoDocumentTextOutline,
  IoSwapHorizontalOutline,
  IoSwapVerticalOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoWalletOutline,
} from 'react-icons/io5';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { toast } from 'react-toastify';
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
  memoTextCss,
  pageContainerCss,
  recipientCardCss,
  recipientHeaderCss,
  recipientInfoCss,
  statusBadgeCss,
  transferCardCss,
  transferListCss,
  transfersContainerCss,
} from './styles';

const Modal = dynamic(() => import('@/components/molecules/Modal'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const TransfersPage: FC = () => {
  const accounts = useAccountStore((state) => state.accounts);
  const { refreshTransfers, executeTransfer, cancelTransfer } = useTransferActions();

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transfersState, setTransfersState] = useState(() => {
    const { transfers, loading, error } = useTransferStore.getInitialState();
    return {
      transfers,
      loading,
      error,
    };
  });

  useEffect(() => {
    const unsubscribe = useTransferStore.subscribe(
      (state) => ({
        transfers: state.transfers,
        loading: state.loading,
        error: state.error,
      }),
      setTransfersState,
    );

    return () => unsubscribe();
  }, []);

  const handleError = useCallback((error: Error) => {
    toast.error(error.message, {
      position: 'top-right',
      autoClose: 3000,
    });
  }, []);

  useEffect(() => {
    refreshTransfers().catch(handleError);
  }, [handleError, refreshTransfers]);

  const handleExecuteTransfer = useCallback(
    async (transferId: string) => {
      try {
        await executeTransfer(transferId);
      } catch (error) {
        handleError(error as Error);
      }
    },
    [executeTransfer, handleError],
  );

  const handleCancelTransfer = useCallback(
    async (transferId: string) => {
      try {
        await cancelTransfer(transferId);
      } catch (error) {
        handleError(error as Error);
      }
    },
    [cancelTransfer, handleError],
  );

  const renderRecipientInfo = useCallback((recipient: TransferResponse['recipientsInfo'][0]) => {
    const isFiat = recipient.recipientTransferType === RECIPIENT_TRANSFER_TYPE.FIAT;
    const amount = isFiat
      ? formatCurrency(
          recipient.fiatDetails?.fiatAmount || 0,
          recipient.fiatDetails?.currencyCode || 'USD',
        )
      : formatCurrency(recipient.tokenAmount || 0, 'XBT');

    return (
      <div key={recipient.id} css={recipientCardCss}>
        <div css={recipientHeaderCss}>
          <div css={cardMetadataCss}>
            {isFiat ? <IoWalletOutline size={20} /> : <MdAccountBalanceWallet size={20} />}
            <span>
              {isFiat
                ? 'Fiat Transfer'
                : `Blockchain Transfer (${recipient.blockchainDetails?.blockchain})`}
            </span>
          </div>
          <span css={amountTextCss}>{amount}</span>
        </div>

        {isFiat && recipient.fiatDetails && (
          <div css={feeDetailsCss}>
            <div css={feeItemCss}>
              <span>Exchange Rate</span>
              <span css={cardMetadataCss}>
                <IoTrendingUpOutline size={16} />
                {recipient.fiatDetails.exchangeRate.toFixed(2)}
              </span>
            </div>
            <div css={feeItemCss}>
              <span>Transaction Fee</span>
              <span css={cardMetadataCss}>
                <IoCardOutline size={16} />
                {recipient.fiatDetails.transactionFee}%
              </span>
            </div>
            <div css={feeItemCss}>
              <span>Exchange Fee</span>
              <span css={cardMetadataCss}>
                <IoSwapVerticalOutline size={16} />
                {recipient.fiatDetails.exchangeFeePercentage}%
              </span>
            </div>
            <div css={feeItemCss}>
              <span>Total Fees</span>
              <span css={cardMetadataCss}>
                <IoWalletOutline size={16} />
                {formatCurrency(recipient.fiatDetails.feeTotal, recipient.fiatDetails.currencyCode)}
              </span>
            </div>
          </div>
        )}

        {!isFiat && recipient.blockchainDetails && (
          <div css={detailTextCss}>
            <MdAccountBalanceWallet size={16} />
            <span>Wallet: {recipient.blockchainDetails.walletAddress}</span>
          </div>
        )}

        <div css={cardMetadataCss}>
          <IoTimeOutline size={16} />
          <span>
            Created:{' '}
            {Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(
              new Date(recipient.createdAt),
            )}
          </span>
        </div>
      </div>
    );
  }, []);

  if (transfersState.loading) return <LoadingSpinner />;

  return (
    <div css={pageContainerCss}>
      <div css={transfersContainerCss}>
        <div css={headerCss}>
          <h1>Transfers</h1>
          <Button
            variant="primary"
            onClick={() => setIsTransferModalOpen(true)}
            icon={<IoSwapHorizontalOutline />}
          >
            New Transfer
          </Button>
        </div>

        <div css={transferListCss}>
          {transfersState?.transfers?.results.map((transfer) => (
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
                      Created:{' '}
                      {Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
                        new Date(transfer.createdAt),
                      )}
                    </span>
                  </div>
                  <span css={statusBadgeCss(transfer.status)}>
                    {transfer.status.replace('_', ' ')}
                  </span>
                </div>
                {transfer.status === TransferStatus.IN_REVIEW && (
                  <Button
                    css={buttonCss}
                    variant="success"
                    onClick={() => handleExecuteTransfer(transfer.id)}
                    icon={<IoSwapHorizontalOutline />}
                  >
                    Execute transfer
                  </Button>
                )}
                {transfer.status === TransferStatus.PENDING && (
                  <Button
                    css={buttonCss}
                    variant="danger"
                    onClick={() => handleCancelTransfer(transfer.id)}
                    icon={<IoSwapHorizontalOutline />}
                  >
                    Cancel transfer
                  </Button>
                )}
              </div>

              <div css={recipientInfoCss}>{transfer.recipientsInfo.map(renderRecipientInfo)}</div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        title="New Transfer"
      >
        <CreateTransferModalContent setModalOpen={setIsTransferModalOpen} />
      </Modal>
    </div>
  );
};

export default TransfersPage;
