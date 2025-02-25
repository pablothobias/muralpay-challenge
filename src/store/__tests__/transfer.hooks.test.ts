import { renderHook, act } from '@testing-library/react';
import { useTransferActions } from '../transfer/hooks';
import TransferService from '@/features/transfer/services';
import { mockTransfers } from '@/mocks/store/transfer';
import useTransferStore from '../transfer';

jest.mock('@/features/transfer/services', () => ({
  get: jest.fn(),
  create: jest.fn(),
  execute: jest.fn(),
  cancel: jest.fn(),
}));

describe('useTransferActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useTransferStore.setState({
      transfers: undefined,
      loading: false,
      error: undefined,
    });
  });

  describe('refreshTransfers', () => {
    it('should fetch and update transfers successfully', async () => {
      (TransferService.get as jest.Mock).mockResolvedValueOnce(mockTransfers);

      const { result } = renderHook(() => useTransferActions());

      await act(async () => {
        await result.current.refreshTransfers();
      });

      const state = useTransferStore.getState();
      expect(state.transfers).toEqual(mockTransfers);
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(TransferService.get).toHaveBeenCalled();
    });

    it('should handle errors during refresh', async () => {
      const error = new Error('Network error');
      (TransferService.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTransferActions());

      await act(async () => {
        await expect(result.current.refreshTransfers()).rejects.toThrow('Network error');
      });

      const state = useTransferStore.getState();
      expect(state.transfers).toBeUndefined();
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });
  });

  describe('createTransfer', () => {
    const mockTransferData = {
      payoutAccountId: 'account_123',
      recipientsInfo: [],
    };

    it('should handle errors during creation', async () => {
      const error = new Error('Creation failed');
      (TransferService.create as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTransferActions());

      await act(async () => {
        await expect(result.current.createTransfer(mockTransferData)).rejects.toThrow(
          'Creation failed',
        );
      });

      const state = useTransferStore.getState();
      expect(state.transfers).toBeUndefined();
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Creation failed');
    });
  });

  describe('executeTransfer', () => {
    const transferId = 'transfer_123';

    it('should handle errors during execution', async () => {
      const error = new Error('Execution failed');
      (TransferService.execute as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTransferActions());

      await act(async () => {
        await expect(result.current.executeTransfer(transferId)).rejects.toThrow(
          'Execution failed',
        );
      });

      const state = useTransferStore.getState();
      expect(state.transfers).toBeUndefined();
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Execution failed');
    });
  });

  describe('cancelTransfer', () => {
    const transferId = 'transfer_123';

    it('should handle errors during cancellation', async () => {
      const error = new Error('Cancellation failed');
      (TransferService.cancel as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTransferActions());

      await act(async () => {
        await expect(result.current.cancelTransfer(transferId)).rejects.toThrow(
          'Cancellation failed',
        );
      });
    });
  });
});
