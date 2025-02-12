import apiClient from '@/lib/ApiClient';
import { z } from 'zod';
import { AxiosError } from 'axios';

const endpoints = {
  create: '/customers',
} as const;

export const schemas = {
  account: z.object({
    balance: z.number().nonnegative(),
    walletAddress: z.string().min(1),
    customerId: z.string().uuid().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
} as const;

export type AccountResponse = z.infer<typeof schemas.account>;
export type CustomerData = z.infer<typeof schemas.customer>;

export class CustomerServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'CustomerServiceError';
  }
}

export async function createCustomerAccount(
  data: CustomerData,
): Promise<AccountResponse> {
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
}
