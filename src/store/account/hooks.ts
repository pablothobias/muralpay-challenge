import AccountService from '@/features/account/services';
import { AccountSchema } from '@/features/account/types';
import useAccountStore from '.';
import { Accounts } from './types';

export const useAccountActions = () => {
  const setAccountsState = useAccountStore((state) => state.setAccountsState);

  const refreshAccounts = async () => {
    try {
      setAccountsState([], true, undefined);
      const response = await AccountService.get();
      setAccountsState(response, false, undefined);
      return response;
    } catch (error) {
      setAccountsState([], false, (error as Error).message);
      throw error;
    }
  };

  const createAccount = async (data: AccountSchema) => {
    try {
      setAccountsState([], true, undefined);
      await AccountService.create(data);
      const response: Accounts = await refreshAccounts();
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
