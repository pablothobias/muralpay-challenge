import TransferService from '@/features/transfer/services';
import { TransferSchema } from '@/features/transfer/types';
import useTransferStore from '.';
import { Transfers } from './types';

export const useTransferActions = () => {
  const setTransfersState = useTransferStore((state) => state.setTransfersState);

  const refreshTransfers = async () => {
    try {
      setTransfersState(undefined, true, undefined);
      const response = await TransferService.get();
      setTransfersState(response, false, undefined);
      return response;
    } catch (error) {
      setTransfersState(undefined, false, (error as Error).message);
      throw error;
    }
  };

  const createTransfer = async (data: TransferSchema) => {
    try {
      setTransfersState(undefined, true, undefined);
      await TransferService.create(data);
      const response: Transfers = await refreshTransfers();
      setTransfersState(response, false, undefined);
      return response;
    } catch (error) {
      setTransfersState(undefined, false, (error as Error).message);
      throw error;
    }
  };

  const executeTransfer = async (transferId: string) => {
    try {
      setTransfersState(undefined, true, undefined);
      await TransferService.execute(transferId);
      const response = await refreshTransfers();
      setTransfersState(response, false, undefined);
    } catch (error) {
      setTransfersState(undefined, false, (error as Error).message);
      throw error;
    }
  };

  const cancelTransfer = async (transferId: string) => {
    try {
      const response = await TransferService.cancel(transferId);
      await refreshTransfers();
      return response;
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
