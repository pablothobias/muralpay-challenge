import { AxiosError } from 'axios';

import { ZodError } from 'zod';

import apiClient from '@/config/api.config';
import { API_ENDPOINTS, ERROR_TYPES } from '@/utils/constants';
import logError from '@/utils/functions/logError';

import { AccountServiceError, AccountValidationError } from '../errors';
import { accountResponseArraySchema, accountResponseSchema, accountSchema } from '../schemas';
import { AccountResponse, AccountResponseArray, AccountSchema } from '../types';

const AccountService = {
  create: async (data: AccountSchema, signal?: AbortSignal): Promise<AccountResponse | null> => {
    try {
      const validatedData = accountSchema.parse(data);

      const response = await apiClient.post(API_ENDPOINTS.ACCOUNTS, validatedData, {
        ...(signal && { signal }),
      });
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error, 'Failed to create account');
    }
  },
  get: async (signal?: AbortSignal): Promise<AccountResponseArray> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ACCOUNTS, {
        ...(signal && { signal }),
      });
      return accountResponseArraySchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error, 'Failed to get accounts');
    }
  },
  getById: async (id: string, signal?: AbortSignal): Promise<AccountResponse> => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ACCOUNTS}/${id}`, {
        ...(signal && { signal }),
      });
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error, 'Failed to get account');
    }
  },
  handleError: (error: unknown, defaultMessage: string) => {
    logError(error, 'AccountService.create');

    if (error instanceof AxiosError)
      throw new AccountServiceError(
        error.response?.data?.message || defaultMessage,
        ERROR_TYPES.API_ERROR,
        error,
      );
    else if (error instanceof ZodError) {
      throw new AccountValidationError(
        error?.message || defaultMessage,
        ERROR_TYPES.API_ERROR,
        error,
      );
    } else {
      throw new AccountServiceError('Unexpected error occurred', ERROR_TYPES.UNKNOWN_ERROR, error);
    }
  },
};

export default AccountService;
