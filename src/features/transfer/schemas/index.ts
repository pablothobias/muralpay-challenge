import {
  BLOCKCHAIN,
  RECIPIENT_TYPE,
  RECIPIENT_TRANSFER_TYPE,
  DOC_TYPE,
  CURRENCY,
  STATUS_TYPES,
  TRANSFER_RECIPIENT,
} from '@/utils/constants';
import { z } from 'zod';

export const transferStatusEnum = z.enum([
  ...(Object.keys(STATUS_TYPES) as [keyof typeof STATUS_TYPES, ...string[]]),
]);
export const transferCurrencyEnum = z.enum([
  ...(Object.keys(CURRENCY) as [keyof typeof CURRENCY, ...string[]]),
]);
export const transferRecipientEnum = z.enum([
  ...(Object.keys(TRANSFER_RECIPIENT) as [keyof typeof TRANSFER_RECIPIENT, ...string[]]),
]);
export const recipientType = z.enum([
  ...(Object.keys(RECIPIENT_TYPE) as [keyof typeof RECIPIENT_TYPE, ...string[]]),
]);
export const recipientTransferTypeEnum = z.enum([
  ...(Object.keys(RECIPIENT_TRANSFER_TYPE) as [keyof typeof RECIPIENT_TRANSFER_TYPE, ...string[]]),
]);
export const blockchainEnum = z.enum([
  ...(Object.keys(BLOCKCHAIN) as [keyof typeof BLOCKCHAIN, ...string[]]),
]);
export const documentTypeEnum = z.enum([
  ...(Object.keys(DOC_TYPE) as [keyof typeof DOC_TYPE, ...string[]]),
]);

export const physicalAddressSchema = z.object({
  address1: z.string().min(1, 'Address line 1 is required'),
  address2: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'ZIP code is required'),
});

export const bankDetailsSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  bankAccountOwnerName: z.string().min(1, 'Account owner name is required'),
  currencyCode: z.string().min(1, 'Currency code is required'),
  accountType: transferRecipientEnum,
  bankAccountNumber: z.string().min(1, 'Account number is required'),
  bankRoutingNumber: z.string().min(1, 'Routing number is required'),
  bankCode: z.string().min(1, 'Bank code is required'),
  documentNumber: z.string().optional(),
  documentType: documentTypeEnum.optional(),
  physicalAddress: physicalAddressSchema.optional(),
});

export const walletDetailsSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
  blockchain: blockchainEnum,
});

export const blockchainRecipientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  currencyCode: transferCurrencyEnum,
  tokenAmount: z.number().optional(),
  email: z.string().email('Invalid email format'),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
  recipientTransferType: z.literal('BLOCKCHAIN'),
  recipientType: recipientType,
  walletDetails: walletDetailsSchema,
});

export const bankRecipientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  currencyCode: transferCurrencyEnum,
  tokenAmount: z.number().optional(),
  email: z.string().email('Invalid email format'),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
  recipientTransferType: z.literal('FIAT'),
  recipientType: recipientType,
  bankDetails: bankDetailsSchema,
});

export const recipientInfoSchema = z.discriminatedUnion('recipientTransferType', [
  blockchainRecipientSchema,
  bankRecipientSchema,
]);

export const transferSchema = z.object({
  payoutAccountId: z.string().min(1, 'Payout account is required'),
  memo: z.string().optional(),
  recipientsInfo: z.array(recipientInfoSchema).min(1, 'At least one recipient is required'),
});

export const transferResponseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  payoutAccountId: z.string(),
  memo: z.string(),
  status: z.string(),
  recipientsInfo: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      recipientTransferType: z.string(),
      tokenAmount: z.number(),
      fiatDetails: z
        .object({
          withdrawalRequestStatus: z.string(),
          currencyCode: z.string(),
          fiatAmount: z.number(),
          transactionFee: z.number(),
          exchangeFeePercentage: z.number(),
          exchangeRate: z.number(),
          feeTotal: z.number(),
        })
        .optional(),
      blockchainDetails: z
        .object({
          blockchain: z.string(),
          walletAddress: z.string(),
        })
        .optional(),
    }),
  ),
});

export const transferListResponseSchema = z.object({
  results: z.array(transferResponseSchema),
  total: z.number(),
});
