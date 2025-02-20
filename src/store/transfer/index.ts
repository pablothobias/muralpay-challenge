import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { TransferState } from './types';

const useTransferStore = create<TransferState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          transfers: { results: [], total: 0 },
          loading: false,
          error: null,
          setTransfersState: (transfers, loading, error) => set({ transfers, loading, error }),
          onLogout: () => set({ transfers: undefined, loading: false, error: null }),
        }),
        { name: 'transfers', storage: createJSONStorage(() => sessionStorage) },
      ),
    ),
  ),
);

export default useTransferStore;
