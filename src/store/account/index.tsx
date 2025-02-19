import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Accounts, type AccountState } from './types';

const useAccountStore = create<AccountState>()(
  devtools(
    persist(
      (set) => ({
        accounts: [],
        loading: false,
        error: null,
        setAccountsState: (accounts: Accounts, loading: boolean, error: string | undefined) =>
          set({ accounts: [...accounts], loading, error }),
        onLogout: () => set({ accounts: [], loading: false, error: null }),
      }),
      { name: 'account' },
    ),
  ),
);

export default useAccountStore;
