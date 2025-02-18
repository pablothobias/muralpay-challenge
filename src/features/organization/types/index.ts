import { z } from 'zod';
import { OrganizationServiceError, OrganizationValidationError } from '../errors';
import { organizationResponseSchema, organizationSchema } from '../schemas';

export type OrganizationSchema = z.infer<typeof organizationSchema>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;

export type OrganizationServiceType = {
  create(data: OrganizationSchema): Promise<OrganizationResponse>;
  handleError(error: unknown): OrganizationServiceError | OrganizationValidationError;
};
