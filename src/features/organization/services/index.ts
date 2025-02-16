import apiClient from '@/config/api.config';
import { AxiosError } from 'axios';
import {
  type OrganizationSchema,
  type OrganizationResponse,
  organizationSchema,
  organizationResponseSchema,
} from '../schemas';
import {
  OrganizationServiceError,
  OrganizationValidationError,
} from '../errors';
import { ERROR_TYPES } from '@/utils/constants';

const endpoints = { create: '/organizations' } as const;

const OrganizationService = {
  create: async (data: OrganizationSchema): Promise<OrganizationResponse> => {
    try {
      const validatedData = organizationSchema.parse(data);
      if (!validatedData) {
        throw new OrganizationValidationError(
          'Invalid data format',
          ERROR_TYPES.VALIDATION,
        );
      }

      const response = await apiClient.post(endpoints.create, validatedData);

      return organizationResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof OrganizationValidationError) throw error;

      if (error instanceof AxiosError) {
        throw new OrganizationServiceError(
          error.response?.data?.message ||
            'Failed to create organization organization',
          ERROR_TYPES.API_ERROR,
          error,
        );
      }

      throw new OrganizationServiceError(
        'Unexpected error occurred',
        ERROR_TYPES.UNKNOWN_ERROR,
        error,
      );
    }
  },
};

export default OrganizationService;
