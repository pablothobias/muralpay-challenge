import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { Accounts, type AccountState } from './types';

const useAccountStore = create<AccountState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          accounts: [],
          loading: false,
          error: null,
          setAccountsState: (accounts: Accounts, loading: boolean, error: string | undefined) =>
            set({ accounts: [...accounts!], loading, error }),
          onLogout: () => set({ accounts: [], loading: false, error: null }),
        }),
        { name: 'account', storage: createJSONStorage(() => sessionStorage) },
      ),
    ),
  ),
);

export default useAccountStore;
