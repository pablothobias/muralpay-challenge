import { TransferResponse } from '@/features/transfer/types';

export type Transfers =
  | TransferResponse[]
  | { results: TransferResponse[] | []; total: number }
  | undefined;

export type TransferState = {
  loading: boolean;
  error: string | undefined;
  transfers: Transfers;
  setTransfersState: (transfers: Transfers, loading: boolean, error: string | undefined) => void;
  onLogout: () => void;
};
