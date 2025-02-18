import { z } from 'zod';
import {
  accountResponseArraySchema,
  accountResponseSchema,
  accountSchema,
  balanceSchema,
  depositAccountSchema,
} from '../schemas';

export type AccountBalance = z.infer<typeof balanceSchema>;
export type DepositAccount = z.infer<typeof depositAccountSchema>;
export type AccountSchema = z.infer<typeof accountSchema>;
export type AccountResponse = z.infer<typeof accountResponseSchema>;
export type AccountResponseArray = z.infer<typeof accountResponseArraySchema>;

export type AccountServiceType = {
  create(data: AccountSchema): Promise<AccountResponse>;
  get(id?: string): Promise<AccountResponse>;
};
