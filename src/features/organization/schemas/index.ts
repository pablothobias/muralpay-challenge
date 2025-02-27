import { z } from 'zod';

import { RECIPIENT_TYPE } from '@/utils/constants';

const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  PHONE: {
    PATTERN: /^\+?[1-9]\d{1,14}$/,
  },
  TAX_ID: {
    MIN_LENGTH: 11,
    MAX_LENGTH: 14,
  },
  ADDRESS: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
  },
  COUNTRY_CODE: {
    LENGTH: 2,
  },
  ZIP: {
    MIN_LENGTH: 5,
  },
} as const;

const ERROR_MESSAGES = {
  name: {
    required: 'Name is required',
    tooShort: `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`,
    tooLong: `Name cannot exceed ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`,
  },
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  organizationType: {
    required: 'Organization type is required',
    invalid: 'Invalid organization type',
  },
  phone: {
    required: 'Phone number is required',
    invalid: 'Please enter a valid phone number in international format (e.g., +1234567890)',
  },
  taxId: {
    required: 'Tax ID is required',
    invalid: 'Please enter a valid Tax ID',
    tooShort: `Tax ID must be at least ${VALIDATION_RULES.TAX_ID.MIN_LENGTH} characters`,
    tooLong: `Tax ID cannot exceed ${VALIDATION_RULES.TAX_ID.MAX_LENGTH} characters`,
  },
  formationDate: {
    required: 'Formation date is required',
    invalid: 'Please enter a valid date',
    future: 'Formation date cannot be in the future',
  },
  address: {
    required: 'Address is required',
    tooShort: `Address must be at least ${VALIDATION_RULES.ADDRESS.MIN_LENGTH} characters`,
    tooLong: `Address cannot exceed ${VALIDATION_RULES.ADDRESS.MAX_LENGTH} characters`,
  },
} as const;

const isValidPastDate = (date: string) => {
  const formationDate = new Date(date);
  const today = new Date();
  return formationDate <= today;
};

const physicalAddressSchema = z.object({
  address1: z
    .string()
    .min(VALIDATION_RULES.ADDRESS.MIN_LENGTH, ERROR_MESSAGES.address.tooShort)
    .max(VALIDATION_RULES.ADDRESS.MAX_LENGTH, ERROR_MESSAGES.address.tooLong),
  address2: z.string().max(VALIDATION_RULES.ADDRESS.MAX_LENGTH).optional().nullable(),
  country: z.string().length(VALIDATION_RULES.COUNTRY_CODE.LENGTH),
  state: z.string().min(2),
  city: z.string().min(2),
  zip: z.string().min(VALIDATION_RULES.ZIP.MIN_LENGTH),
});

const baseKycData = {
  email: z.string().min(1, ERROR_MESSAGES.email.required).email(ERROR_MESSAGES.email.invalid),
  phoneNumber: z.string().min(1, ERROR_MESSAGES.phone.required),
  taxId: z
    .string()
    .min(VALIDATION_RULES.TAX_ID.MIN_LENGTH, ERROR_MESSAGES.taxId.tooShort)
    .max(VALIDATION_RULES.TAX_ID.MAX_LENGTH, ERROR_MESSAGES.taxId.tooLong)
    .refine((val) => /^\d+$/.test(val), ERROR_MESSAGES.taxId.invalid),
  formationDate: z
    .string()
    .min(1, ERROR_MESSAGES.formationDate.required)
    .refine((date) => !isNaN(Date.parse(date)), ERROR_MESSAGES.formationDate.invalid)
    .refine(isValidPastDate, ERROR_MESSAGES.formationDate.future),
  nationality: z.string().min(2),
  physicalAddress: physicalAddressSchema,
};

const kycDelegatedDataSchema = z.object(baseKycData);

const individualSchema = z.object({
  organizationType: z.literal(RECIPIENT_TYPE.INDIVIDUAL),
  name: z
    .string()
    .min(VALIDATION_RULES.NAME.MIN_LENGTH, ERROR_MESSAGES.name.tooShort)
    .max(VALIDATION_RULES.NAME.MAX_LENGTH, ERROR_MESSAGES.name.tooLong),
  lastName: z.string().min(VALIDATION_RULES.NAME.MIN_LENGTH, ERROR_MESSAGES.name.tooShort),
  kycDelegatedData: kycDelegatedDataSchema,
});

const businessSchema = z.object({
  organizationType: z.literal(RECIPIENT_TYPE.BUSINESS),
  name: z
    .string()
    .min(VALIDATION_RULES.NAME.MIN_LENGTH, ERROR_MESSAGES.name.tooShort)
    .max(VALIDATION_RULES.NAME.MAX_LENGTH, ERROR_MESSAGES.name.tooLong),
  lastName: z.string().min(VALIDATION_RULES.NAME.MIN_LENGTH, ERROR_MESSAGES.name.tooShort),
  kycDelegatedData: kycDelegatedDataSchema.extend({
    businessName: z
      .string()
      .min(VALIDATION_RULES.NAME.MIN_LENGTH, ERROR_MESSAGES.name.tooShort)
      .max(VALIDATION_RULES.NAME.MAX_LENGTH, ERROR_MESSAGES.name.tooLong),
  }),
});

export const organizationSchema = z.discriminatedUnion('organizationType', [
  individualSchema,
  businessSchema,
]);

export type IndividualSchema = z.infer<typeof individualSchema>;
export type BusinessSchema = z.infer<typeof businessSchema>;
export type OrganizationSchema = z.infer<typeof organizationSchema>;

export * from './response';
