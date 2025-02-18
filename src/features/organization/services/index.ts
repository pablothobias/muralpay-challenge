import apiClient from '@/config/api.config';
import { API_ENDPOINTS, ERROR_TYPES } from '@/utils/constants';
import logError from '@/utils/functions/logError';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { OrganizationServiceError, OrganizationValidationError } from '../errors';
import { organizationResponseSchema, organizationSchema } from '../schemas';
import {
  OrganizationServiceType,
  type OrganizationResponse,
  type OrganizationSchema,
} from '../types';

const OrganizationService: OrganizationServiceType = {
  create: async (data: OrganizationSchema): Promise<OrganizationResponse> => {
    try {
      const validatedData = organizationSchema.parse(data);

      if (!validatedData) {
        throw new OrganizationValidationError('Invalid data format', ERROR_TYPES.VALIDATION);
      }

      const response = await apiClient.post(API_ENDPOINTS.ORGANIZATION, validatedData);
      return organizationResponseSchema.parse(response.data);
    } catch (error) {
      return OrganizationService.handleError(error);
    }
  },
  handleError: (error: unknown) => {
    logError(error, 'OrganizationService.create');

    if (error instanceof ZodError)
      throw new OrganizationValidationError(error.message, ERROR_TYPES.VALIDATION, error);
    else if (error instanceof AxiosError)
      throw new OrganizationServiceError(
        error.response?.data?.message || 'Failed to create organization organization',
        ERROR_TYPES.API_ERROR,
        error,
      );
    else
      throw new OrganizationServiceError(
        'Unexpected error occurred',
        ERROR_TYPES.UNKNOWN_ERROR,
        error,
      );
  },
};

export default OrganizationService;
