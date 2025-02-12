import { useState } from 'react';
import CustomerService from '@/features/customer/services';
import { AccountResponse, CustomerData } from '@/features/customer/schemas';

export const useCustomer = () => {
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createAccount = async (data: CustomerData) => {
    setLoading(true);
    try {
      const accountData = await CustomerService.createCustomerAccount(data);
      setAccount(accountData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  };

  return { account, error, loading, createAccount };
};
