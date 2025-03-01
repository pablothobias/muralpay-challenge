import { z } from 'zod';

import { organizationTypeSchema } from './shared';

const RESPONSE_VALIDATION = {
  ID: {
    MIN_LENGTH: 1,
  },
  NAME: {
    MIN_LENGTH: 1,
  },
  CURRENCY: {
    CODE_LENGTH: 3,
  },
} as const;

const currencyInfoSchema = z.object({
  id: z.string().min(RESPONSE_VALIDATION.ID.MIN_LENGTH),
  name: z.string().min(RESPONSE_VALIDATION.NAME.MIN_LENGTH),
  code: z.string().length(RESPONSE_VALIDATION.CURRENCY.CODE_LENGTH),
});

export const organizationResponseSchema = z.object({
  id: z.string().min(RESPONSE_VALIDATION.ID.MIN_LENGTH),
  name: z.string().min(RESPONSE_VALIDATION.NAME.MIN_LENGTH),
  organizationType: organizationTypeSchema,
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  currenciesInfo: z.array(currencyInfoSchema).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
});

export const organizationsListResponseSchema = z
  .object({
    nextId: z.string().optional(),
    results: z.array(organizationResponseSchema),
    total: z.number().int().nonnegative(),
  })
  .nullable();

export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
export type OrganizationsListResponse = z.infer<typeof organizationsListResponseSchema>;
