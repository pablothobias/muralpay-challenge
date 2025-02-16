import { OrganizationType } from '@/utils/constants';
import { z } from 'zod';

const ERROR_MESSAGES = {
  nameRequired: 'Name is required',
  emailRequired: 'Email is required',
};

const nameSchema = z.string().min(1, ERROR_MESSAGES.nameRequired);
const organizationTypeSchema = z.enum([
  OrganizationType.BUSINESS,
  OrganizationType.INDIVIDUAL,
]);

export const organizationSchema = z.object({
  name: nameSchema,
  organizationType: organizationTypeSchema,
});

export const organizationResponseSchema = z.object({
  id: z.string().optional(),
  name: nameSchema.optional(),
  organizationType: organizationTypeSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.boolean().optional(),
});

export type OrganizationSchema = z.infer<typeof organizationSchema>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
