import { act, renderHook } from '@testing-library/react';

import { mockAccount } from '@/mocks/store/account';

import useAccountStore from '../account';
import { AccountState } from '../account/types';

describe('Account Store', () => {
  beforeEach(() => {
    useAccountStore.setState({
      accounts: [],
      loading: false,
      error: null,
    });
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setAccountsState', () => {
    it('should update accounts state correctly', () => {
      const accounts = [mockAccount];
      const loading = true;
      const error = 'Test error';

      act(() => {
        useAccountStore.getState().setAccountsState(accounts, loading, error);
      });

      const state = useAccountStore.getState();
      expect(state.accounts).toEqual(accounts);
      expect(state.loading).toBe(loading);
      expect(state.error).toBe(error);
    });

    it('should handle empty accounts array', () => {
      act(() => {
        useAccountStore.getState().setAccountsState([], false, undefined);
      });

      const state = useAccountStore.getState();
      expect(state.accounts).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
    });
  });

  describe('onLogout', () => {
    it('should reset store state on logout', () => {
      act(() => {
        useAccountStore.setState({
          accounts: [mockAccount],
          loading: true,
          error: 'Some error',
        });
      });

      act(() => {
        useAccountStore.getState().onLogout();
      });

      const state = useAccountStore.getState();
      expect(state.accounts).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('persistence', () => {
    it('should persist state to session storage', () => {
      const state = {
        accounts: [mockAccount],
        loading: false,
        error: null,
        selectedAccount: mockAccount,
        isTransferModalOpen: false,
      };

      act(() => {
        useAccountStore.setState(state);
      });

      const persistedJson = sessionStorage.getItem('account');
      const persistedState = persistedJson ? JSON.parse(persistedJson) : {};
      expect(persistedState.state).toEqual(state);
    });

    it('should handle undefined values correctly', () => {
      const initialState = {
        accounts: [] as AccountState['accounts'],
        loading: false,
        error: undefined,
      };

      sessionStorage.setItem('account', JSON.stringify({ state: initialState }));

      const { result } = renderHook(() => useAccountStore());

      act(() => {
        useAccountStore.setState(initialState);
      });

      expect(result.current.accounts).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
  });
});
