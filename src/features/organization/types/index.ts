import { z } from 'zod';

import { RECIPIENT_TYPE } from '@/utils/constants';

import { organizationSchema } from '../schemas';

type BaseKycData = {
  email: string;
  phoneNumber: string;
  taxId: string;
  formationDate: string;
  nationality: string;
  physicalAddress: {
    address1: string;
    address2?: string | null;
    country: string;
    state: string;
    city: string;
    zip: string;
  };
};

export type IndividualFormData = {
  organizationType: typeof RECIPIENT_TYPE.INDIVIDUAL;
  name: string;
  lastName: string;
  kycDelegatedData: BaseKycData;
};

export type BusinessFormData = {
  organizationType: typeof RECIPIENT_TYPE.BUSINESS;
  name: string;
  lastName: string;
  kycDelegatedData: BaseKycData & {
    businessName: string;
  };
};

export type FormData = IndividualFormData | BusinessFormData;

export type FormDataByType = {
  INDIVIDUAL: IndividualFormData;
  BUSINESS: BusinessFormData;
};

export type FormFields<T extends keyof FormDataByType> = FormDataByType[T];

export type OrganizationSchema = z.infer<typeof organizationSchema>;

export type OrganizationServiceType = {
  create(data: OrganizationSchema, signal?: AbortSignal): Promise<OrganizationResponse | undefined>;
  handleError(error: unknown, defaultMessage: string): undefined;
};

export type OrganizationListParams = {
  limit?: number;
  nextId?: string;
};

export type OrganizationListResponse = {
  nextId?: string;
  results: OrganizationResponse[];
  total: number;
} | null;

export type OrganizationResponse = {
  id: string;
  name: string;
  organizationType: string;
  createdAt?: string;
  updatedAt?: string;
  currenciesInfo?: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  status: string;
};

export type OrganizationEmptyState = {
  results: [];
  total: number;
};

export type OrganizationType = 'INDIVIDUAL' | 'BUSINESS';
