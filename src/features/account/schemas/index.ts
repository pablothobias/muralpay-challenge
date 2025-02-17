import { z } from 'zod';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const BlockchainEnum = z.enum(['POLYGON', 'ETHEREUM', 'BSC']);
export const AccountStatusEnum = z.enum([
  'ACTIVATED',
  'PENDING',
  'DEACTIVATED',
]);
export const CurrencyEnum = z.enum(['USD', 'EUR', 'GBP']);
export const PaymentRailsEnum = z.enum(['ACH', 'WIRE', 'SEPA']);

export const balanceSchema = z.object({
  balance: z.number().min(0),
  tokenSymbol: z.string().min(1).max(10),
});

export const depositAccountSchema = z.object({
  id: z.string().regex(UUID_REGEX, 'Invalid UUID format'),
  status: AccountStatusEnum,
  currency: CurrencyEnum,
  bankBeneficiaryName: z.string().min(2).max(100),
  bankBeneficiaryAddress: z.string().min(5).max(200),
  bankName: z.string().min(2).max(100),
  bankAddress: z.string().min(5).max(200),
  bankRoutingNumber: z.string().min(9).max(9),
  bankAccountNumber: z.string().min(8).max(20),
  paymentRails: z.array(PaymentRailsEnum).min(1),
});

export const accountSchema = z
  .object({
    name: z.string().min(3).max(100),
    description: z.string().min(3).max(200).optional(),
  })
  .strict();

export const accountResponseSchema = z
  .object({
    id: z.string().regex(UUID_REGEX, 'Invalid UUID format'),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    name: z.string().min(3).max(100),
    blockchain: BlockchainEnum,
    address: z.union([
      z.string().regex(ETH_ADDRESS_REGEX, 'Invalid Ethereum address'),
      z.literal('PENDING'),
    ]),
    balance: balanceSchema,
    isApiEnabled: z.boolean(),
    isPending: z.boolean(),
    depositAccount: depositAccountSchema.optional(),
  })
  .strict();
