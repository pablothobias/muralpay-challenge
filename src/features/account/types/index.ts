import { z } from 'zod';
import {
  accountResponseSchema,
  accountSchema,
  balanceSchema,
  depositAccountSchema,
} from '../schemas';

export type AccountBalance = z.infer<typeof balanceSchema>;
export type DepositAccount = z.infer<typeof depositAccountSchema>;
export type AccountSchema = z.infer<typeof accountSchema>;
export type AccountResponse = z.infer<typeof accountResponseSchema>;
