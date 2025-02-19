import { z } from 'zod';
import {
  recipientInfoSchema,
  transferCurrencyEnum,
  transferRecipientEnum,
  transferResponseArraySchema,
  transferResponseSchema,
  transferSchema,
  transferStatusEnum,
} from '../schemas';

export type TransferSchema = z.infer<typeof transferSchema>;
export type TransferResponse = z.infer<typeof transferResponseSchema>;
export type TransferResponseArray = z.infer<typeof transferResponseArraySchema>;
export type TransferStatusEnum = z.infer<typeof transferStatusEnum>;
export type TransferCurrencyEnum = z.infer<typeof transferCurrencyEnum>;
export type TransferRecipientEnum = z.infer<typeof transferRecipientEnum>;
export type RecipientInfoSchema = z.infer<typeof recipientInfoSchema>;

export type TransferListResponse = {
  results: TransferResponseArray | [];
  total: number;
};

export type TransferServiceType = {
  create(data: TransferSchema): Promise<TransferResponse | undefined>;
  get(signal?: AbortSignal): Promise<TransferListResponse | undefined>;
  handleError(error: unknown, defaultMessage: string): undefined;
};

export enum TransferStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export const TransferRecipient = {
  SAVINGS: 'savings',
  CHECKING: 'checking',
};
