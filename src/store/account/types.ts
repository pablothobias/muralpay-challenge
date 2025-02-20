import { type AccountResponseArray } from '@/features/account/types';

export type Accounts = AccountResponseArray | [] | undefined;

export type AccountState = {
  loading: boolean;
  error: string | null;
  accounts: Accounts;
  setAccountsState: (accounts: Accounts, loading: boolean, error: string | undefined) => void;
  onLogout: () => void;
};
