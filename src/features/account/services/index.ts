import apiClient from '@/config/api.config';
import { API_ENDPOINTS, ERROR_TYPES } from '@/utils/constants';
import logError from '@/utils/functions/logError';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { AccountServiceError, AccountValidationError } from '../errors';
import { accountResponseArraySchema, accountResponseSchema, accountSchema } from '../schemas';
import { AccountResponse, AccountResponseArray, AccountSchema, AccountServiceType } from '../types';

const AccountService: AccountServiceType = {
  create: async (
    data: AccountSchema,
    signal?: AbortSignal,
  ): Promise<AccountResponse | undefined> => {
    try {
      const validatedData = accountSchema.parse(data);

      if (!validatedData) {
        throw new AccountValidationError('Invalid data format', ERROR_TYPES.VALIDATION);
      }

      const response = await apiClient.post(API_ENDPOINTS.ACCOUNTS, validatedData, {
        ...(signal && { signal }),
      });
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error);
    }
  },
  get: async (signal?: AbortSignal): Promise<AccountResponseArray | undefined> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ACCOUNTS, { ...(signal && { signal }) });
      return accountResponseArraySchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error);
    }
  },
  getById: async (id?: string, signal?: AbortSignal): Promise<AccountResponse | undefined> => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ACCOUNTS}/${id}`, {
        ...(signal && { signal }),
      });
      return accountResponseSchema.parse(response.data);
    } catch (error) {
      return AccountService.handleError(error);
    }
  },
  handleError: (error: unknown) => {
    logError(error, 'AccountService.create');

    if (error instanceof AxiosError)
      throw new AccountServiceError(
        error.response?.data?.message || 'Failed to get account',
        ERROR_TYPES.API_ERROR,
        error,
      );
    else if (error instanceof ZodError)
      throw new AccountValidationError(error.message, ERROR_TYPES.VALIDATION);
    else
      throw new AccountServiceError('Unexpected error occurred', ERROR_TYPES.UNKNOWN_ERROR, error);
  },
};

export default AccountService;
