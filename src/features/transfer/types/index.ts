import { z } from 'zod';

import {
  recipientInfoSchema,
  transferCurrencyEnum,
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

export type BankRecipient = z.infer<typeof bankRecipientSchema>;
export type BlockchainRecipient = z.infer<typeof blockchainRecipientSchema>;

export type BlockchainDetails = {
  walletAddress: string;
  blockchain: string;
};

export type FiatDetails = {
  currencyCode: string;
  fiatAmount: number;
  withdrawalRequestStatus: string;
  transactionFee: number;
  exchangeFeePercentage: number;
  exchangeRate: number;
  feeTotal: number;
};

export type TransferFormSchema = {
  payoutAccountId: string;
  memo?: string;
  recipientsInfo: (BankRecipient | BlockchainRecipient)[];
};

export type TransferListResponseSchema =
  | TransferResponse[]
  | { results: TransferResponse[]; total: number };

export type TransferServiceType = {
  create(_data: TransferSchema, _signal?: AbortSignal): Promise<TransferResponse | undefined>;
  get(_signal?: AbortSignal): Promise<TransferListResponseSchema | undefined>;
  execute(_id: string, _signal?: AbortSignal): Promise<TransferResponse | undefined>;
  cancel(_id: string, _signal?: AbortSignal): Promise<TransferResponse | undefined>;
  handleError(_error: unknown, _defaultMessage: string): undefined;
};
