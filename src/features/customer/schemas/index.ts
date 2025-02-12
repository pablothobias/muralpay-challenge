import { z } from 'zod';

export const schemas = {
  account: z.object({
    balance: z.number().nonnegative(),
    walletAddress: z.string().min(1),
    customerId: z.string().uuid().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  }),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
} as const;

export type AccountSchema = z.infer<typeof schemas.account>;
export type CustomerSchema = z.infer<typeof schemas.customer>;

export type AccountResponse = z.infer<typeof schemas.account>;
export type CustomerData = z.infer<typeof schemas.customer>;
