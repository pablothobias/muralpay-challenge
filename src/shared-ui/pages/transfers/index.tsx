import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import {
  type Dispatch,
  type FC,
  memo,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  IoAddOutline,
  IoCardOutline,
  IoDocumentTextOutline,
  IoSwapVerticalOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoWalletOutline,
} from 'react-icons/io5';

import { MdAccountBalanceWallet } from 'react-icons/md';

import CreateTransferModalContent from '@/components/transfer/CreateTransferModalContent';
import { BlockchainDetails, FiatDetails, TransferResponse } from '@/features/transfer/types';
import { Button, Icon, LoadingSpinner } from '@/shared-ui';
import EmptyList from '@/shared-ui/molecules/EmptyList';
import useAccountStore from '@/store/account';
import { useAccountActions } from '@/store/account/hooks';
import useTransferStore from '@/store/transfer';
import { useTransferActions } from '@/store/transfer/hooks';
import { RECIPIENT_TRANSFER_TYPE, STATUS_TYPES } from '@/utils/constants';
import { useLoading } from '@/utils/context/LoadingContext';
import { useToast } from '@/utils/context/ToastContext';
import { formatCurrency } from '@/utils/functions/formatCurrency';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';

import {
  amountTextCss,
  breakpoints,
  buttonCss,
  cardHeaderCss,
  cardMetadataCss,
  containerCss,
  detailTextCss,
  fabButtonCss,
  feeDetailsCss,
  feeItemCss,
  fixedBottomButtonCss,
  fullWidthButtonCss,
  headerCss,
  leftContentRowCss,
  loadingContainerCss,
  memoTextCss,
  mobileActionsContainerCss,
  mobileTransferCardCss,
  recipientCardCss,
  recipientHeaderCss,
  recipientInfoCss,
  statusBadgeCss,
  transferCardCss,
  transferListCss,
  walletAddressCss,
} from './styles';

const Modal = dynamic(() => import('@/shared-ui/molecules/Modal'), {
  ssr: false,
  loading: () => null,
});

type TransferListHeaderProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
};

const TransferListHeader = ({ setIsOpen, isMobile }: TransferListHeaderProps) => (
  <div css={headerCss}>
    <h1>Transfers</h1>
    {!isMobile && (
      <Button variant="secondary" onClick={() => setIsOpen(true)} icon={<Icon name="swap" />}>
        New Transfer
      </Button>
    )}
  </div>
);

const RecipientInfoContent = memo((recipient: TransferResponse['recipientsInfo'][0]) => {
  const isFiat = recipient.recipientTransferType === RECIPIENT_TRANSFER_TYPE.FIAT;
  const amount = formatCurrency(recipient.tokenAmount || 0, isFiat ? 'USD' : 'XBT');

  const blockchainDetails = recipient.blockchainDetails as BlockchainDetails | undefined;
  const fiatDetails = recipient.fiatDetails as FiatDetails | undefined;

  const walletAddress = blockchainDetails?.walletAddress;
  const blockchain = blockchainDetails?.blockchain;

  const currencyCode = fiatDetails?.currencyCode;
  const exchangeRate = fiatDetails?.exchangeRate;
  const transactionFee = fiatDetails?.transactionFee;
  const exchangeFeePercentage = fiatDetails?.exchangeFeePercentage;
  const feeTotal = fiatDetails?.feeTotal;
  const fiatAmount = fiatDetails?.fiatAmount;

  const formatAmount = (amount: number, currencyCode?: string) => {
    try {
      return formatCurrency(amount, currencyCode || 'USD');
    } catch (_error) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    }
  };

  return (
    <div key={recipient.id} css={recipientCardCss}>
      <div css={recipientHeaderCss}>
        <div css={cardMetadataCss}>
          {isFiat ? <IoWalletOutline size={20} /> : <MdAccountBalanceWallet size={20} />}
          <span css={walletAddressCss}>
            {isFiat
              ? `Bank Transfer - ${currencyCode || 'USD'}`
              : walletAddress
                ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`
                : 'Blockchain Transfer'}
          </span>
        </div>
        <span css={amountTextCss}>{amount}</span>
      </div>

      {isFiat && fiatDetails && (
        <div css={feeDetailsCss}>
          {exchangeRate && (
            <div css={feeItemCss}>
              <span>Exchange Rate</span>
              <span css={cardMetadataCss}>
                <IoTrendingUpOutline size={16} />
                {exchangeRate.toFixed(2)}
              </span>
            </div>
          )}
          {transactionFee && (
            <div css={feeItemCss}>
              <span>Transaction Fee</span>
              <span css={cardMetadataCss}>
                <IoCardOutline size={16} />
                {transactionFee}%
              </span>
            </div>
          )}
          {exchangeFeePercentage && (
            <div css={feeItemCss}>
              <span>Exchange Fee</span>
              <span css={cardMetadataCss}>
                <IoSwapVerticalOutline size={16} />
                {exchangeFeePercentage}%
              </span>
            </div>
          )}
          {feeTotal && (
            <div css={feeItemCss}>
              <span>Total Fees</span>
              <span css={cardMetadataCss}>
                <IoWalletOutline size={16} />
                {formatAmount(feeTotal, currencyCode)}
              </span>
            </div>
          )}
          {fiatAmount && (
            <div css={feeItemCss}>
              <span>Fiat Amount</span>
              <span css={cardMetadataCss}>
                <IoWalletOutline size={16} />
                {formatAmount(fiatAmount, currencyCode)}
              </span>
            </div>
          )}
        </div>
      )}

      {!isFiat && walletAddress && (
        <div css={detailTextCss}>
          <MdAccountBalanceWallet size={16} />
          <span>Wallet: {walletAddress}</span>
        </div>
      )}

      {!isFiat && blockchain && (
        <div css={detailTextCss}>
          <IoSwapVerticalOutline size={16} />
          <span>Blockchain: {blockchain}</span>
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
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  const accounts = useAccountStore(state => state.accounts);
  const { executeTransfer, cancelTransfer, refreshTransfers } = useTransferActions();
  const { refreshAccounts } = useAccountActions();

  const { showSuccess, showError } = useToast();
  const { setLoadingState, isLoading } = useLoading();

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const [transfersList, setTransfersList] = useState<TransferResponse[]>([]);

  const transfers = useTransferStore(state => state.transfers);
  const loading = useTransferStore(state => state.loading);
  const loadingAccounts = useAccountStore(state => state.loading);

  useEffect(() => {
    if (Array.isArray(transfers)) {
      setTransfersList(transfers);
    } else if (transfers && 'results' in transfers) {
      setTransfersList(transfers.results);
    } else {
      setTransfersList([]);
    }
  }, [transfers]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoadingState('fetchData', true);
      try {
        await refreshTransfers(controller.signal);

        try {
          await refreshAccounts(controller.signal);
        } catch (accountError) {
          if (
            accountError instanceof Error &&
            accountError.name !== 'CanceledError' &&
            accountError.message !== 'canceled'
          ) {
            console.error('Error fetching accounts:', accountError);
          }
        }
      } catch (error) {
        if (!controller.signal.aborted && error instanceof Error && error.name !== 'AbortError') {
          showError('fetchData', error.message);
        }
      } finally {
        setLoadingState('fetchData', false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const handleTransferAction = useCallback(
    async (
      action: (_transferId: string, _signal?: AbortSignal) => Promise<void>,
      id: string,
      actionType: 'execute' | 'cancel',
    ) => {
      const controller = new AbortController();
      setLoadingState(`${actionType}Transfer`, true);

      try {
        await action(id, controller.signal);
        await refreshTransfers(controller.signal);

        try {
          await refreshAccounts(controller.signal);
        } catch (accountError) {
          if (
            accountError instanceof Error &&
            accountError.name !== 'CanceledError' &&
            accountError.message !== 'canceled'
          ) {
            console.error('Error refreshing accounts:', accountError);
          }
        }

        showSuccess(
          `${actionType}Transfer`,
          `Transfer ${actionType === 'execute' ? 'executed' : 'canceled'} successfully`,
        );
      } catch (error) {
        if (!controller.signal.aborted && error instanceof Error && error.name !== 'AbortError') {
          showError(`${actionType}Transfer`, error.message);
        }
      } finally {
        setLoadingState(`${actionType}Transfer`, false);
      }

      return () => {
        controller.abort();
      };
    },
    [refreshTransfers, refreshAccounts, setLoadingState, showSuccess, showError],
  );

  if (isLoading || loading || loadingAccounts)
    return (
      <div css={loadingContainerCss}>
        <LoadingSpinner />
      </div>
    );

  if (!transfersList.length) {
    return (
      <>
        <TransferListHeader setIsOpen={setIsTransferModalOpen} isMobile={isMobile} />
        <EmptyList theme={theme} />
        {isMobile && (
          <div css={fixedBottomButtonCss}>
            <Button
              variant="primary"
              onClick={() => setIsTransferModalOpen(true)}
              icon={<IoAddOutline size={20} />}
              additionalStyles={fullWidthButtonCss}
            >
              Create a new transfer
            </Button>
          </div>
        )}
        {!isMobile && (
          <div
            css={fabButtonCss}
            onClick={() => setIsTransferModalOpen(true)}
            role="button"
            aria-label="Create a new transfer"
          >
            <IoAddOutline size={24} />
          </div>
        )}
        <Modal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          title="New Transfer"
          size="extraLarge"
        >
          <CreateTransferModalContent setModalOpen={setIsTransferModalOpen} />
        </Modal>
      </>
    );
  }

  return (
    <>
      <TransferListHeader setIsOpen={setIsTransferModalOpen} isMobile={isMobile} />
      <div css={containerCss}>
        <div css={transferListCss}>
          {transfersList.map(transfer => (
            <div css={isMobile ? mobileTransferCardCss : transferCardCss} key={transfer.id}>
              <div css={cardHeaderCss}>
                <div css={leftContentRowCss}>
                  <h4>
                    {
                      (accounts || []).find(account => account.id === transfer.payoutAccountId)
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
                {!isMobile && transfer.status === STATUS_TYPES.IN_REVIEW && (
                  <Button
                    additionalStyles={buttonCss}
                    variant="success"
                    onClick={() => handleTransferAction(executeTransfer, transfer.id, 'execute')}
                    icon={<Icon name="swap" />}
                  >
                    Execute transfer
                  </Button>
                )}
                {!isMobile && transfer.status === STATUS_TYPES.PENDING && (
                  <Button
                    additionalStyles={buttonCss}
                    variant="danger"
                    onClick={() => handleTransferAction(cancelTransfer, transfer.id, 'cancel')}
                    icon={<Icon name="swap" />}
                  >
                    Cancel transfer
                  </Button>
                )}
              </div>

              <div css={recipientInfoCss}>
                {transfer?.recipientsInfo?.map(recipient => (
                  <RecipientInfoContent key={recipient.id} {...recipient} />
                ))}
              </div>

              {isMobile &&
                (transfer.status === STATUS_TYPES.IN_REVIEW ||
                  transfer.status === STATUS_TYPES.PENDING) && (
                  <div css={mobileActionsContainerCss}>
                    {transfer.status === STATUS_TYPES.IN_REVIEW && (
                      <Button
                        additionalStyles={buttonCss}
                        variant="success"
                        onClick={() =>
                          handleTransferAction(executeTransfer, transfer.id, 'execute')
                        }
                        icon={<Icon name="swap" />}
                      >
                        Execute transfer
                      </Button>
                    )}
                    {transfer.status === STATUS_TYPES.PENDING && (
                      <Button
                        additionalStyles={buttonCss}
                        variant="danger"
                        onClick={() => handleTransferAction(cancelTransfer, transfer.id, 'cancel')}
                        icon={<Icon name="swap" />}
                      >
                        Cancel transfer
                      </Button>
                    )}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
      {isMobile && (
        <div css={fixedBottomButtonCss}>
          <Button
            variant="primary"
            onClick={() => setIsTransferModalOpen(true)}
            icon={<IoAddOutline size={20} />}
            additionalStyles={fullWidthButtonCss}
          >
            Create a new transfer
          </Button>
        </div>
      )}
      {!isMobile && (
        <div
          css={fabButtonCss}
          onClick={() => setIsTransferModalOpen(true)}
          role="button"
          aria-label="Create a new transfer"
        >
          <IoAddOutline size={24} />
        </div>
      )}
      <Modal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        title="New Transfer"
        size="extraLarge"
      >
        <CreateTransferModalContent setModalOpen={setIsTransferModalOpen} />
      </Modal>
    </>
  );
};

RecipientInfoContent.displayName = 'RecipientInfoContent';

export default TransfersPage;
