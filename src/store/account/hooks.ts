import AccountService from '@/features/account/services';
import { AccountSchema } from '@/features/account/types';
import useAccountStore from '.';
import { Accounts } from './types';

export const useAccountActions = () => {
  const setAccountsState = useAccountStore((state) => state.setAccountsState);

  const refreshAccounts = async (signal?: AbortSignal) => {
    try {
      setAccountsState([], true, undefined);
      const response = await AccountService.get(signal);
      setAccountsState(response, false, undefined);
      return response;
    } catch (error) {
      setAccountsState([], false, (error as Error).message);
      throw error;
    }
  };

  const createAccount = async (data: AccountSchema, signal?: AbortSignal) => {
    try {
      setAccountsState([], true, undefined);
      await AccountService.create(data, signal);
      const response: Accounts = await refreshAccounts(signal);
      setAccountsState(response, false, undefined);
      return response;
    } catch (error) {
      setAccountsState([], false, (error as Error).message);
      throw error;
    }
  };

  return {
    refreshAccounts,
    createAccount,
  };
};
