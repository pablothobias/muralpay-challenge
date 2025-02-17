import { z } from 'zod';
import { organizationResponseSchema, organizationSchema } from '../schemas';

export type OrganizationSchema = z.infer<typeof organizationSchema>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
