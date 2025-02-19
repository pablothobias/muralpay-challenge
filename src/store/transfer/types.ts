import { TransferSchema } from '@/features/transfer/types';

export type Transfers = TransferSchema[];

export type TransferState = {
  loading: boolean;
  error: string | null;
  transfers: Transfers;
  setTransfersState: (transfers: Transfers, loading: boolean, error: string | undefined) => void;
  onLogout: () => void;
};
