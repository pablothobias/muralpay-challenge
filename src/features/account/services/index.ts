import apiClient from '@/config/api.config';
import { ERROR_TYPES } from '@/utils/constants';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { AccountServiceError, AccountValidationError } from '../errors';
import { accountResponseArraySchema, accountResponseSchema, accountSchema } from '../schemas';
import { AccountResponse, AccountResponseArray, AccountSchema } from '../types';

const endpoint = '/accounts' as const;

const AccountService = {
  create: async (data: AccountSchema): Promise<AccountResponse | null> => {
    try {
      const validatedData = accountSchema.parse(data);

      if (!validatedData) {
        throw new AccountValidationError('Invalid data format', ERROR_TYPES.VALIDATION);
      }

      const response = await apiClient.post(endpoint, validatedData);
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error);
    }
  },
  get: async (): Promise<AccountResponseArray> => {
    try {
      const response = await apiClient.get(endpoint);
      return accountResponseArraySchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error);
    }
  },
  getById: async (id: string): Promise<AccountResponse> => {
    try {
      const response = await apiClient.get(`${endpoint}/${id}`);
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error);
    }
  },
  handleError: (error: unknown) => {
    console.error(error);

    if (error instanceof AxiosError) {
      throw new AccountServiceError(
        error.response?.data?.message || 'Failed to get account',
        ERROR_TYPES.API_ERROR,
        error,
      );
    } else if (error instanceof ZodError) {
      throw new AccountValidationError(error.message, ERROR_TYPES.VALIDATION);
    } else {
      throw new AccountServiceError('Unexpected error occurred', ERROR_TYPES.UNKNOWN_ERROR, error);
    }
  },
};

export default AccountService;
