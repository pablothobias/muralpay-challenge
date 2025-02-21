import apiClient from '@/config/api.config';
import { API_ENDPOINTS, ERROR_TYPES } from '@/utils/constants';
import logError from '@/utils/functions/logError';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { TransferServiceError, TransferValidationError } from '../errors';
import { transferListResponseSchema, transferResponseSchema, transferSchema } from '../schemas';
import {
  TransferListResponseSchema,
  TransferResponse,
  TransferSchema,
  TransferServiceType,
} from '../types';

const TransferService: TransferServiceType = {
  create: async (
    data: TransferSchema,
    signal?: AbortSignal,
  ): Promise<TransferResponse | undefined> => {
    try {
      const validatedData = transferSchema.parse(data);

      if (!validatedData) {
        throw new TransferValidationError('Invalid data format', ERROR_TYPES.VALIDATION);
      }

      const response = await apiClient.post(API_ENDPOINTS.TRANSFER_REQUESTS, validatedData, {
        ...(signal && { signal }),
      });
      return transferResponseSchema.parse(response.data);
    } catch (error) {
      return TransferService.handleError(error, 'Failed to create transfer');
    }
  },
  get: async (signal?: AbortSignal): Promise<TransferListResponseSchema | undefined> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRANSFER_REQUESTS, {
        ...(signal && { signal }),
      });
      return transferListResponseSchema.parse(response.data);
    } catch (error) {
      return TransferService.handleError(error, 'Failed to get transfers');
    }
  },
  execute: async (id: string, signal?: AbortSignal): Promise<TransferResponse | undefined> => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.TRANSFER_REQUESTS_EXECUTE,
        { transferRequestId: id },
        {
          ...(signal && { signal }),
        },
      );
      return transferResponseSchema.parse(response.data);
    } catch (error) {
      return TransferService.handleError(error, 'Failed to execute transfer');
    }
  },
  cancel: async (
    id: string,
    signal?: AbortSignal,
  ): Promise<TransferListResponseSchema | undefined> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRANSFER_REQUESTS_CANCEL, {
        ...(signal && { signal }),
      });
      return transferListResponseSchema.parse(response.data);
    } catch (error) {
      return TransferService.handleError(error, 'Failed to cancel transfers');
    }
  },
  handleError: (error: unknown, defaultMessage: string) => {
    logError(error, 'TransferService.create');

    if (error instanceof AxiosError)
      throw new TransferServiceError(
        error.response?.data?.message || defaultMessage,
        ERROR_TYPES.API_ERROR,
        error,
      );
    else if (error instanceof ZodError)
      throw new TransferValidationError(error.message, ERROR_TYPES.VALIDATION);
    else
      throw new TransferServiceError('Unexpected error occurred', ERROR_TYPES.UNKNOWN_ERROR, error);
  },
};

export default TransferService;
