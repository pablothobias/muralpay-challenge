import { z } from 'zod';
import {
  recipientInfoSchema,
  transferCurrencyEnum,
  transferListResponseSchema,
  transferRecipientEnum,
  transferResponseSchema,
  transferSchema,
  transferStatusEnum,
  bankRecipientSchema,
  blockchainRecipientSchema,
} from '../schemas';

export type TransferSchema = z.infer<typeof transferSchema>;
export type TransferResponse = z.infer<typeof transferResponseSchema>;
export type TRANSFER_STATUSEnum = z.infer<typeof transferStatusEnum>;
export type TransferCurrencyEnum = z.infer<typeof transferCurrencyEnum>;
export type TransferRecipientEnum = z.infer<typeof transferRecipientEnum>;
export type RecipientInfoSchema = z.infer<typeof recipientInfoSchema>;
export type TransferListResponseSchema = z.infer<typeof transferListResponseSchema>;

export type BankRecipient = z.infer<typeof bankRecipientSchema>;
export type BlockchainRecipient = z.infer<typeof blockchainRecipientSchema>;

export type TransferFormSchema = {
  payoutAccountId: string;
  memo?: string;
  recipientsInfo: (BankRecipient | BlockchainRecipient)[];
};

export type TransferServiceType = {
  create(data: TransferSchema, signal?: AbortSignal): Promise<TransferResponse | undefined>;
  get(signal?: AbortSignal): Promise<TransferListResponseSchema | undefined>;
  execute(id: string, signal?: AbortSignal): Promise<TransferResponse | undefined>;
  cancel(id: string, signal?: AbortSignal): Promise<TransferResponse | undefined>;
  handleError(error: unknown, defaultMessage: string): undefined;
};
