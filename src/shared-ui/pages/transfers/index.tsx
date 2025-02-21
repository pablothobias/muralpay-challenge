import { Button, LoadingSpinner } from '@/shared-ui';
import CreateTransferModalContent from '@/components/transfer/CreateTransferModalContent';
import {
  TransferListResponseSchema,
  TransferResponse,
  TransferStatus,
} from '@/features/transfer/types';
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
import { useToast } from '@/utils/context/ToastContext';
import { useLoading } from '@/utils/context/LoadingContext';

const Modal = dynamic(() => import('@/shared-ui/molecules/Modal'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const TransfersPage: FC = () => {
  const accounts = useAccountStore((state) => state.accounts);
  const { executeTransfer, cancelTransfer, refreshTransfers } = useTransferActions();

  const { showSuccess, showError } = useToast();
  const { setLoadingState, isLoading } = useLoading();

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transfersList, setTransfersList] = useState<TransferListResponseSchema['results']>([]);

  useEffect(() => {
    async function fetchInitialTransfers() {
      await refreshTransfers();
    }

    const unsubscribe = useTransferStore.subscribe(
      (state) => ({ transfers: state.transfers, loading: state.loading }),
      ({ transfers, loading }) => {
        setLoadingState('transfers', loading);
        setTransfersList(() => {
          if (transfers?.results) return transfers.results;
          return [];
        });
      },
    );

    fetchInitialTransfers();

    return () => unsubscribe();
  }, []);

  const handleTransferAction = useCallback(
    async (
      serviceFunction: typeof cancelTransfer | typeof executeTransfer,
      transferId: string,
      action: 'cancel' | 'execute',
    ) => {
      try {
        const response = await serviceFunction(transferId);
        if (response) showSuccess('transfer', `${action} transfer successfully!`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : `Failed to ${action} transfer`;
        showError('transfer', errorMessage);
      }
    },
    [showError, showSuccess],
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

  if (isLoading)
    return (
      <div css={loadingContainerCss}>
        <LoadingSpinner />
      </div>
    );

  return (
    <>
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
                  onClick={() => handleTransferAction(executeTransfer, transfer.id, 'execute')}
                  icon={<IoSwapHorizontalOutline />}
                >
                  Execute transfer
                </Button>
              )}
              {transfer.status === TransferStatus.PENDING && (
                <Button
                  css={buttonCss}
                  variant="danger"
                  onClick={() => handleTransferAction(cancelTransfer, transfer.id, 'cancel')}
                  icon={<IoSwapHorizontalOutline />}
                >
                  Cancel transfer
                </Button>
              )}
            </div>

            <div css={recipientInfoCss}>{transfer.recipientsInfo.map(renderRecipientInfo)}</div>
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

export default TransfersPage;
