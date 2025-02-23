import { z } from 'zod';
import { RECIPIENT_TYPE } from '@/utils/constants';

const OrganizationType = RECIPIENT_TYPE;

const ERROR_MESSAGES = {
  nameRequired: 'Name is required',
  emailRequired: 'Email is required',
  organizationTypeRequired: 'Organization type is required',
};

const nameSchema = z.string().min(3, ERROR_MESSAGES.nameRequired);
const organizationTypeSchema = z.nativeEnum(OrganizationType, {
  errorMap: () => ({ message: ERROR_MESSAGES.organizationTypeRequired }),
});

export const organizationSchema = z.object({
  name: nameSchema,
  lastName: z.string().optional(),
  email: z.string().email(ERROR_MESSAGES.emailRequired).optional(),
  organizationType: organizationTypeSchema,
});

export const organizationResponseSchema = z.object({
  id: z.string(),
  name: nameSchema,
  organizationType: organizationTypeSchema,
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  currenciesInfo: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        code: z.string(),
      }),
    )
    .optional(),
  status: z.string(),
});

export const organizationsListResponseSchema = z
  .object({
    nextId: z.string().optional(),
    results: z.array(organizationResponseSchema),
    total: z.number(),
  })
  .nullable();
