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
  address1: z.string().min(1, 'Address 1 is required'),
  address2: z.string().min(1, 'Address 2 is required'),
  country: z
    .string()
    .min(1, 'Country code is required')
    .regex(/^[A-Z]{2}$/, 'Must be a valid ISO 3166-1 alpha-2 country code (e.g., US, GB, BR)'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

const baseRecipientSchema = {
  name: z.string().min(1, 'Name is required'),
  currencyCode: transferCurrencyEnum,
  tokenAmount: z.number().optional(),
  email: z.string().email('Invalid email format'),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
  recipientType: recipientType,
};

export const bankDetailsSchema = z
  .object({
    bankName: z.string().min(1, 'Bank name is required'),
    bankAccountOwnerName: z.string().min(1, 'Account owner name is required'),
    currencyCode: transferCurrencyEnum,
    accountType: transferRecipientEnum,
    bankAccountNumber: z.string().min(1, 'Bank account number is required'),
    bankRoutingNumber: z.string().min(1, 'Bank routing number is required'),
    bankCode: z.string().min(1, 'Bank code is required'),
    documentNumber: z.string().min(1, 'Document number is required'),
    documentType: documentTypeEnum,
    physicalAddress: physicalAddressSchema,
    tokenAmount: z.number().optional(),
    exchangeRate: z.number().optional(),
    transactionFee: z.number().optional(),
    exchangeFeePercentage: z.number().optional(),
    feeTotal: z.number().optional(),
  })
  .required({
    bankName: true,
    bankAccountOwnerName: true,
    accountType: true,
    bankAccountNumber: true,
    bankCode: true,
  });

export const walletDetailsSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
  blockchain: blockchainEnum,
});

export const blockchainRecipientSchema = z.object({
  ...baseRecipientSchema,
  recipientTransferType: z.literal('BLOCKCHAIN'),
  walletDetails: walletDetailsSchema,
});

export const bankRecipientSchema = z.object({
  ...baseRecipientSchema,
  recipientTransferType: z.literal('FIAT'),
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
  status: transferStatusEnum,
  recipientsInfo: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      recipientTransferType: recipientTransferTypeEnum,
      tokenAmount: z.number(),
      name: z.string().optional(),
      email: z.string().optional(),
      recipientType: recipientType.optional(),
      currencyCode: transferCurrencyEnum.optional(),
      bankDetails: bankDetailsSchema.optional(),
      walletDetails: walletDetailsSchema.optional(),
    }),
  ),
});

export const transferListResponseSchema = z.object({
  results: z.array(transferResponseSchema),
  total: z.number(),
});
