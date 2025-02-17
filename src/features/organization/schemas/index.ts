import { OrganizationType } from '@/utils/constants';
import { z } from 'zod';

const ERROR_MESSAGES = {
  nameRequired: 'Name is required',
  emailRequired: 'Email is required',
};

const nameSchema = z.string().min(3, ERROR_MESSAGES.nameRequired);
const organizationTypeSchema = z.enum([OrganizationType.BUSINESS, OrganizationType.INDIVIDUAL]);

export const organizationSchema = z.object({
  name: nameSchema,
  lastName: nameSchema.optional(),
  email: z.string().email().optional(),
  organizationType: organizationTypeSchema,
});

export const organizationResponseSchema = z.object({
  id: z.string().optional(),
  name: nameSchema.optional(),
  organizationType: organizationTypeSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  currenciesInfo: z.array(z.any()).optional(),
  status: z.string().optional(),
});
