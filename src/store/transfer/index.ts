import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { mockTransfers } from '@/mocks/store/transfer';

import { TransferState } from './types';

const useTransferStore = create<TransferState>()(
  devtools(
    subscribeWithSelector(
      persist(
        set => ({
          transfers: mockTransfers,
          loading: false,
          error: undefined,
          setTransfersState: (transfers, loading, error) => set({ transfers, loading, error }),
          onLogout: () => {
            set({ transfers: undefined, loading: false, error: undefined });
            sessionStorage.clear();
          },
        }),
        { name: 'transfers', storage: createJSONStorage(() => sessionStorage) },
      ),
    ),
  ),
);

export default useTransferStore;
