import TransferService from '@/features/transfer/services';
import { TransferSchema } from '@/features/transfer/types';
import useTransferStore from '.';
import { Transfers } from './types';

export const useTransferActions = () => {
  const setTransfersState = useTransferStore((state) => state.setTransfersState);

  const refreshTransfers = async (signal?: AbortSignal) => {
    if (signal?.aborted) return;

    try {
      setTransfersState(undefined, true, undefined);
      const response = await TransferService.get(signal);
      if (!signal?.aborted) {
        setTransfersState(response, false, undefined);
        return response;
      }
    } catch (error) {
      if (!signal?.aborted) {
        setTransfersState(undefined, false, (error as Error).message);
        throw error;
      }
    }
  };

  const createTransfer = async (data: TransferSchema, signal?: AbortSignal) => {
    try {
      setTransfersState(undefined, true, undefined);
      await TransferService.create(data, signal);
      const response: Transfers = await refreshTransfers();
      setTransfersState(response, false, undefined);
      return response;
    } catch (error) {
      setTransfersState(undefined, false, (error as Error).message);
      throw error;
    }
  };

  const executeTransfer = async (transferId: string, signal?: AbortSignal) => {
    try {
      setTransfersState(undefined, true, undefined);
      await TransferService.execute(transferId, signal);
      const response = await refreshTransfers();
      setTransfersState(response, false, undefined);
    } catch (error) {
      setTransfersState(undefined, false, (error as Error).message);
      throw error;
    }
  };

  const cancelTransfer = async (transferId: string, signal?: AbortSignal) => {
    try {
      await TransferService.cancel(transferId, signal);
      await refreshTransfers();
    } catch (error) {
      throw error;
    }
  };

  return {
    refreshTransfers,
    createTransfer,
    executeTransfer,
    cancelTransfer,
  };
};
