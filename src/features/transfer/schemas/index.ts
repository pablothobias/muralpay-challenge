import { z } from 'zod';

export const transferStatusEnum = z.enum(['pending', 'completed', 'failed']);
export const transferCurrencyEnum = z.enum(['COP', 'USD', 'EUR']);
export const transferRecipientEnum = z.enum(['SAVINGS', 'CHECKING']);

export const physicalAddressSchema = z.object({
  address1: z.string(),
  address2: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  zip: z.string(),
});

export const bankContactDetailsSchema = z.object({
  bankName: z.string(),
  bankAccountOwnerName: z.string(),
  currencyCode: z.string(),
  accountType: transferRecipientEnum,
  bankAccountNumber: z.string(),
  bankRoutingNumber: z.string(),
  bankCode: z.string(),
  documentNumber: z.string(),
  documentType: z.enum(['NATIONAL_ID', 'PASSPORT', 'OTHER']),
  physicalAddress: physicalAddressSchema,
});

export const walletDetailsSchema = z.object({
  walletAddress: z.string(),
  blockchain: z.enum(['POLYGON', 'ETHEREUM', 'BASE', 'CELO']),
});

export const recipientInfoSchema = z.object({
  name: z.string(),
  currencyCode: transferCurrencyEnum,
  tokenAmount: z.number(),
  email: z.string().email(),
  dateOfBirth: z.string(),
  phoneNumber: z.string(),
  recipientTransferType: z.enum(['FIAT', 'BLOCKCHAIN']),
  recipientType: z.enum(['INDIVIDUAL', 'BUSINESS']),
  bankContactDetails: bankContactDetailsSchema,
  walletDetails: walletDetailsSchema,
});

export const transferSchema = z.object({
  payoutAccountId: z.string(),
  memo: z.string(),
  recipientsInfo: z.array(recipientInfoSchema),
});

export const transferResponseSchema = z.object({
  id: z.string(),
  status: transferStatusEnum,
});

export const transferListResponseSchema = z.object({
  results: z.array(transferResponseSchema),
  total: z.number(),
});

export const transferResponseArraySchema = z.array(transferResponseSchema);
