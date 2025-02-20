import { z } from 'zod';
import {
  recipientInfoSchema,
  transferCurrencyEnum,
  transferListResponseSchema,
  transferRecipientEnum,
  transferResponseSchema,
  transferSchema,
  transferStatusEnum,
} from '../schemas';

export type TransferSchema = z.infer<typeof transferSchema>;
export type TransferResponse = z.infer<typeof transferResponseSchema>;
export type TransferStatusEnum = z.infer<typeof transferStatusEnum>;
export type TransferCurrencyEnum = z.infer<typeof transferCurrencyEnum>;
export type TransferRecipientEnum = z.infer<typeof transferRecipientEnum>;
export type RecipientInfoSchema = z.infer<typeof recipientInfoSchema>;
export type TransferListResponseSchema = z.infer<typeof transferListResponseSchema>;

export type TransferServiceType = {
  create(data: TransferSchema): Promise<TransferResponse | undefined>;
  get(signal?: AbortSignal): Promise<TransferListResponseSchema | undefined>;
  execute(id: string, signal?: AbortSignal): Promise<TransferResponse | undefined>;
  cancel(id: string, signal?: AbortSignal): Promise<TransferListResponseSchema | undefined>;
  handleError(error: unknown, defaultMessage: string): undefined;
};

export enum TransferStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  IN_REVIEW = 'IN_REVIEW',
}

export const TransferRecipient = {
  SAVINGS: 'savings',
  CHECKING: 'checking',
};
