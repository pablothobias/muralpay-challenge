export const API_ENDPOINTS = {
  ORGANIZATION: '/organizations',
  ACCOUNTS: '/accounts',
  TRANSFERS: '/transfers',
};

export const ERROR_TYPES = {
  VALIDATION: 'validation',
  API_ERROR: 'api_error',
  UNKNOWN_ERROR: 'unknown_error',
};

export enum OrganizationType {
  BUSINESS = 'BUSINESS',
  INDIVIDUAL = 'INDIVIDUAL',
}
