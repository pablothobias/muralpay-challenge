import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Transfers, type TransferState } from './types';

const useTransferStore = create<TransferState>()(
  devtools(
    persist(
      (set) => ({
        transfers: [],
        loading: false,
        error: null,
        setTransfersState: (transfers: Transfers, loading: boolean, error: string | undefined) =>
          set({ transfers, loading, error }),
        onLogout: () => set({ transfers: [], loading: false, error: null }),
      }),
      { name: 'transfer' },
    ),
  ),
);

export default useTransferStore;
