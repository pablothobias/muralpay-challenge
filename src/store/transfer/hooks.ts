import TransferService from '@/features/transfer/services';
import { TransferSchema } from '@/features/transfer/types';
import useTransferStore from '.';
import { Transfers } from './types';
import { useCallback } from 'react';

export const useTransferActions = () => {
  const setTransfersState = useTransferStore((state) => state.setTransfersState);

  const makeRequest = useCallback(<T>(request: (signal: AbortSignal) => Promise<T>) => {
    const controller = new AbortController();
    const promise = request(controller.signal);
    promise.catch(() => controller.abort());
    return promise;
  }, []);

  const refreshTransfers = useCallback(async () => {
    try {
      setTransfersState(undefined, true, undefined);
      const response = await makeRequest((signal) => TransferService.get(signal));
      setTransfersState(response, false, undefined);
      return response;
    } catch (error) {
      setTransfersState(undefined, false, (error as Error).message);
      throw error;
    }
  }, [makeRequest, setTransfersState]);

  const createTransfer = useCallback(
    async (data: TransferSchema) => {
      try {
        setTransfersState(undefined, true, undefined);
        await makeRequest((signal) => TransferService.create(data, signal));
        const response: Transfers = await refreshTransfers();
        setTransfersState(response, false, undefined);
        return response;
      } catch (error) {
        setTransfersState(undefined, false, (error as Error).message);
        throw error;
      }
    },
    [makeRequest, refreshTransfers, setTransfersState],
  );

  const executeTransfer = useCallback(
    async (transferId: string) => {
      try {
        setTransfersState(undefined, true, undefined);
        await makeRequest((signal) => TransferService.execute(transferId, signal));
        const response = await refreshTransfers();
        setTransfersState(response, false, undefined);
      } catch (error) {
        setTransfersState(undefined, false, (error as Error).message);
        throw error;
      }
    },
    [makeRequest, refreshTransfers, setTransfersState],
  );

  const cancelTransfer = useCallback(
    async (transferId: string) => {
      try {
        await makeRequest((signal) => TransferService.cancel(transferId, signal));
        await refreshTransfers();
      } catch (error) {
        throw error;
      }
    },
    [makeRequest, refreshTransfers],
  );

  return {
    refreshTransfers,
    createTransfer,
    executeTransfer,
    cancelTransfer,
  };
};
