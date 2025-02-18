import apiClient from '@/config/api.config';
import { ERROR_TYPES } from '@/utils/constants';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { OrganizationServiceError, OrganizationValidationError } from '../errors';
import { organizationResponseSchema, organizationSchema } from '../schemas';
import {
  OrganizationServiceType,
  type OrganizationResponse,
  type OrganizationSchema,
} from '../types';

const endpoints = { create: '/organizations' } as const;

const OrganizationService: OrganizationServiceType = {
  create: async (data: OrganizationSchema): Promise<OrganizationResponse> => {
    try {
      const validatedData = organizationSchema.parse(data);

      if (!validatedData) {
        throw new OrganizationValidationError('Invalid data format', ERROR_TYPES.VALIDATION);
      }

      const response = await apiClient.post(endpoints.create, validatedData);
      return organizationResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) throw error;

      if (error instanceof AxiosError)
        throw new OrganizationServiceError(
          error.response?.data?.message || 'Failed to create organization organization',
          ERROR_TYPES.API_ERROR,
          error,
        );

      throw new OrganizationServiceError(
        'Unexpected error occurred',
        ERROR_TYPES.UNKNOWN_ERROR,
        error,
      );
    }
  },
};

export default OrganizationService;
