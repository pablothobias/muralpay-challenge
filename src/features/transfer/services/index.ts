import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import apiClient from '@/config/api.config';
import { API_ENDPOINTS, ERROR_TYPES } from '@/utils/constants';
import logError from '@/utils/functions/logError';

import { TransferServiceError, TransferValidationError } from '../errors';
import { transferListResponseSchema, transferResponseSchema, transferSchema } from '../schemas';
import {
  TransferListResponseSchema,
  TransferResponse,
  TransferSchema,
  TransferServiceType,
} from '../types';

const TransferService: TransferServiceType = {
  create: async (data: TransferSchema, signal?: AbortSignal): Promise<TransferResponse> => {
    try {
      const validatedData = transferSchema.parse(data);
      const response = await apiClient.post(API_ENDPOINTS.TRANSFER_REQUESTS, validatedData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        ...(signal && { signal }),
      });
      return transferResponseSchema.parse(response.data);
    } catch (error) {
      throw TransferService.handleError(error, 'Failed to create transfer');
    }
  },
  get: async (signal?: AbortSignal): Promise<TransferListResponseSchema> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRANSFER_REQUESTS, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        ...(signal && { signal }),
      });
      return transferListResponseSchema.parse(response.data);
    } catch (error) {
      throw TransferService.handleError(error, 'Failed to get transfers');
    }
  },
  execute: async (id: string, signal?: AbortSignal): Promise<TransferResponse> => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.TRANSFER_REQUESTS_EXECUTE,
        { transferRequestId: id },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          ...(signal && { signal }),
        },
      );
      return transferResponseSchema.parse(response.data);
    } catch (error) {
      throw TransferService.handleError(error, 'Failed to execute transfer');
    }
  },
  cancel: async (id: string, signal?: AbortSignal): Promise<TransferResponse> => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.TRANSFER_REQUESTS_CANCEL,
        { transferRequestId: id },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          ...(signal && { signal }),
        },
      );
      return transferResponseSchema.parse(response.data);
    } catch (error) {
      throw TransferService.handleError(error, 'Failed to cancel transfer');
    }
  },
  handleError: (error: unknown, defaultMessage: string): never => {
    // Don't log or throw for cancellation errors
    if (
      error instanceof Error &&
      (error.name === 'CanceledError' ||
        error.name === 'AbortError' ||
        error.message === 'canceled')
    ) {
      throw error; // Just rethrow without transforming
    }

    logError(error, 'TransferService');

    if (error instanceof ZodError) {
      throw new TransferValidationError(error.message, ERROR_TYPES.VALIDATION);
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new TransferServiceError('Resource not found', ERROR_TYPES.NOT_FOUND_ERROR, error);
      }

      if (error.response?.status === 400) {
        throw new TransferValidationError(
          error.response.data?.message || defaultMessage,
          ERROR_TYPES.VALIDATION,
          error,
        );
      }

      throw new TransferServiceError(
        error.response?.data?.message || defaultMessage,
        ERROR_TYPES.API_ERROR,
        error,
      );
    }

    throw new TransferServiceError(defaultMessage, ERROR_TYPES.UNKNOWN_ERROR, error);
  },
};

export default TransferService;
