import { z } from 'zod';
import {
  organizationResponseSchema,
  organizationSchema,
  organizationsListResponseSchema,
} from '../schemas';

export type OrganizationSchema = z.infer<typeof organizationSchema>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
export type OrganizationsListResponse = z.infer<typeof organizationsListResponseSchema>;

export type OrganizationEmptyState = {
  results: [];
  total: number;
};

export type OrganizationServiceType = {
  create(data: OrganizationSchema): Promise<OrganizationResponse | undefined>;
  handleError(error: unknown, defaultMessage: string): undefined;
};

export enum OrganizationType {
  BUSINESS = 'BUSINESS',
  INDIVIDUAL = 'INDIVIDUAL',
}
