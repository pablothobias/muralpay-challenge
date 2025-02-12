import apiClient from '@/config/api.config';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { AccountResponse, CustomerData, schemas } from '../schemas';
import CustomerServiceError from '../errors';

const endpoints = { create: '/customers' } as const;

const CustomerService = {
  createCustomerAccount: async (
    data: CustomerData,
  ): Promise<AccountResponse> => {
    try {
      const validatedData = schemas.customer.parse(data);

      const response = await apiClient.post(endpoints.create, validatedData);

      return schemas.account.parse(response.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new CustomerServiceError(
          'Invalid data format',
          'VALIDATION_ERROR',
          error,
        );
      }

      if (error instanceof AxiosError) {
        throw new CustomerServiceError(
          error.response?.data?.message || 'Failed to create customer account',
          'API_ERROR',
          error,
        );
      }

      throw new CustomerServiceError(
        'Unexpected error occurred',
        'UNKNOWN_ERROR',
        error,
      );
    }
  },
};

export default CustomerService;
