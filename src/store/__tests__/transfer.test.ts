import { act, renderHook } from '@testing-library/react';

import { mockTransfers } from '@/mocks/store/transfer';

import useTransferStore from '../transfer';

describe('Transfer Store', () => {
  beforeEach(() => {
    useTransferStore.setState({
      transfers: undefined,
      loading: false,
      error: undefined,
    });
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setTransfersState', () => {
    it('should update transfers state correctly', () => {
      const loading = true;
      const error = 'Test error';

      act(() => {
        useTransferStore.getState().setTransfersState(mockTransfers, loading, error);
      });

      const state = useTransferStore.getState();
      expect(state.transfers).toEqual(mockTransfers);
      expect(state.loading).toBe(loading);
      expect(state.error).toBe(error);
    });

    it('should handle undefined transfers', () => {
      act(() => {
        useTransferStore.getState().setTransfersState(undefined, false, undefined);
      });

      const state = useTransferStore.getState();
      expect(state.transfers).toBeUndefined();
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
    });
  });

  describe('onLogout', () => {
    it('should reset store state on logout', () => {
      act(() => {
        useTransferStore.setState({
          transfers: mockTransfers,
          loading: true,
          error: 'Some error',
        });
      });

      act(() => {
        useTransferStore.getState().onLogout();
      });

      const state = useTransferStore.getState();
      expect(state.transfers).toBeUndefined();
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
    });
  });

  describe('persistence', () => {
    it('should persist state to session storage', () => {
      const state = {
        transfers: mockTransfers,
        loading: false,
        error: undefined,
      };

      act(() => {
        useTransferStore.setState(state);
      });

      const persistedJson = sessionStorage.getItem('transfers');
      const persistedState = persistedJson ? JSON.parse(persistedJson) : {};
      expect(persistedState.state).toEqual(state);
    });

    it('should load persisted state from session storage', async () => {
      const initialState = {
        transfers: mockTransfers,
        loading: false,
        error: undefined,
      };

      sessionStorage.setItem('transfers', JSON.stringify({ state: initialState }));

      const { result } = renderHook(() => useTransferStore());

      await act(async () => {
        useTransferStore.setState(initialState);
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.transfers).toEqual(mockTransfers);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });

    it('should handle undefined values correctly', async () => {
      const initialState = {
        transfers: undefined,
        loading: false,
        error: undefined,
      };

      sessionStorage.setItem('transfers', JSON.stringify({ state: initialState }));

      const { result } = renderHook(() => useTransferStore());

      await act(() => {
        useTransferStore.setState(initialState);
      });

      expect(result.current.transfers).toBeUndefined();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
  });
});
