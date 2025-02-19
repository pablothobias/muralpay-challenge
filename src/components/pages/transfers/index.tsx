import { Button, LoadingSpinner } from '@/components';
import CreateTransferModalContent from '@/components/organisms/CreateTransferModalContent';
import TransferService from '@/features/transfer/services';
import { TransferListResponse } from '@/features/transfer/types';
import { useServiceEffect } from '@/utils/hooks/useServiceEffect';
import dynamic from 'next/dynamic';
import { FC, useEffect, useMemo, useState } from 'react';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import {
  rowLeftContentCss,
  rowMiddleContentCss,
  rowRightContentCss,
  sectionContainer,
  sectionHeader,
  transferRowCss,
  transfersPageCss,
} from './styles';

const List = dynamic(() => import('@/components/molecules/List'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Modal = dynamic(() => import('@/components/molecules/Modal'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const TransfersPage: FC = () => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transfers, setTransfers] = useState<TransferListResponse | undefined>(undefined);
  const { loading, error } = useServiceEffect(
    undefined,
    () => TransferService.get(),
    setTransfers,
    [],
  );

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
    }
  }, [error]);

  const mountTransfersRows = useMemo(() => {
    return transfers?.results?.map((item) => ({
      id: item.id,
      element: (
        <div css={transferRowCss} key={item.id}>
          <div css={rowLeftContentCss}>
            {Array(4).map((_, index) => (
              <h3 key={index}>Iha {index}</h3>
            ))}
          </div>

          <div css={rowMiddleContentCss}>
            <h6>Banana</h6>
            {/* <span css={transferBadgeCss(item.status)}>
              {item.status === TransferStatus.COMPLETED ? (
                <Icon name="check" size={20} color="#fff" />
              ) : item.status === TransferStatus.FAILED ? (
                <Icon name="error" size={20} color="#fff" />
              ) : (
                <Icon name="refresh" size={20} color="#fff" />
              )}
            </span>
            <p>
              Account number:&nbsp;<strong>{item.accountId}</strong>
            </p>
            <div>
              <span>{currencyFlags[item.currency]}</span>&nbsp;
              {`${formatCurrency(item.amount, item.currency)}`}
            </div>
            {item.status === TransferStatus.PENDING && (
              <Button css={transferButtonCss} onClick={() => effectuateTransaction(item.id)}>
                Dispatch
              </Button>
            )} */}
          </div>

          <div css={rowRightContentCss}>
            {Array(3).map((_, index) => (
              <h3 key={index}>Hey {index}</h3>
            ))}
          </div>
        </div>
      ),
    }));
  }, [transfers]);

  if (loading) return <LoadingSpinner />;

  return (
    <div css={transfersPageCss}>
      <section css={sectionContainer}>
        <div css={sectionHeader}>
          <h1>Transfers</h1>
          <Button
            variant="secondary"
            onClick={() => setIsTransferModalOpen(true)}
            icon={<IoSwapHorizontalOutline />}
          >
            New Transfer
          </Button>
        </div>
        <List
          items={mountTransfersRows!}
          loading={false}
          className="transfers-list"
          onClick={(id: string) => console.log('Transfer clicked:', id)}
        />
        <Modal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          title="New Transfer"
          size="medium"
        >
          <CreateTransferModalContent />
        </Modal>
      </section>
    </div>
  );
};

export default TransfersPage;
