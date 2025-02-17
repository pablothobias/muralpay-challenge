import apiClient from '@/config/api.config';
import { AxiosError } from 'axios';
import { ERROR_TYPES } from '@/utils/constants';
import { AccountServiceError, AccountValidationError } from '../errors';
import { AccountResponse, AccountSchema } from '../types';
import { accountResponseSchema, accountSchema } from '../schemas';
import { ZodError } from 'zod';

const endpoint = '/accounts' as const;

const AccountService = {
  create: async (data: AccountSchema): Promise<AccountResponse> => {
    try {
      const validatedData = accountSchema.parse(data);

      if (!validatedData) {
        throw new AccountValidationError(
          'Invalid data format',
          ERROR_TYPES.VALIDATION,
        );
      }

      const response = await apiClient.post(endpoint, validatedData);
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new AccountServiceError(
          error.response?.data?.message || 'Failed to create account',
          ERROR_TYPES.API_ERROR,
          error,
        );
      }

      if (error instanceof ZodError) {
        throw new AccountValidationError(error.message, ERROR_TYPES.VALIDATION);
      }

      throw new AccountServiceError(
        'Unexpected error occurred',
        ERROR_TYPES.UNKNOWN_ERROR,
        error,
      );
    }
  },
  get: async (accountId?: string): Promise<AccountResponse> => {
    try {
      const response = await apiClient.get(`${endpoint}/${accountId}`);
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new AccountServiceError(
          error.response?.data?.message || 'Failed to get account',
          ERROR_TYPES.API_ERROR,
          error,
        );
      }

      throw new AccountServiceError(
        'Unexpected error occurred',
        ERROR_TYPES.UNKNOWN_ERROR,
        error,
      );
    }
  },
};

export default AccountService;
