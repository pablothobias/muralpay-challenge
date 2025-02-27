export interface PhysicalAddress {
  address1: string;
  address2?: string;
  country: string;
  city: string;
  zip: string;
}

export interface BaseKycDelegatedData {
  email: string;
  phoneNumber: string;
  taxId: string;
  nationality: string;
  physicalAddress: PhysicalAddress;
}

export interface IndividualKycDelegatedData extends BaseKycDelegatedData {
  formationDate: string;
}

export interface BusinessKycDelegatedData extends BaseKycDelegatedData {
  formationDate: string;
  businessName: string;
}

export interface IndividualSchema {
  organizationType: 'INDIVIDUAL';
  name: string;
  lastName: string;
  kycDelegatedData: IndividualKycDelegatedData;
}

export interface BusinessSchema {
  organizationType: 'BUSINESS';
  name: string;
  lastName: string;
  kycDelegatedData: BusinessKycDelegatedData;
}

export type OrganizationSchema = IndividualSchema | BusinessSchema;

export const VALIDATION_RULES = {
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

export const ERROR_MESSAGES = {
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
