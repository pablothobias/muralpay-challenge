import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { type AccountState } from './types';

const useAccountStore = create<AccountState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          accounts: [],
          loading: false,
          error: null,
          isTransferModalOpen: false,
          setAccountsState: (accounts, loading, error) =>
            set({ accounts: [...accounts!], loading, error }),
          onLogout: () => {
            set({ accounts: [], loading: false, error: null });
            sessionStorage.clear();
          },
        }),
        { name: 'account', storage: createJSONStorage(() => sessionStorage) },
      ),
    ),
  ),
);

export default useAccountStore;
