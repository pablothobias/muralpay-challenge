export const API_ENDPOINTS = {
  ORGANIZATION: '/organizations',
  ACCOUNTS: '/accounts',
  TRANSFERS: '/transfers',
  TRANSFER_REQUESTS: '/transfer-requests',
  TRANSFER_REQUESTS_EXECUTE: '/transfer-requests/execute',
  TRANSFER_REQUESTS_CANCEL: '/transfer-requests/cancel',
};

export const ERROR_TYPES = {
  VALIDATION: 'validation',
  API_ERROR: 'api_error',
  UNKNOWN_ERROR: 'unknown_error',
  AUTH_ERROR: 'auth_error',
  NOT_FOUND_ERROR: 'not_found_error',
  SERVER_ERROR: 'server_error',
};

export const CURRENCY = {
  COP: 'COP',
  USD: 'USD',
  USDC: 'USDC',
  EUR: 'EUR',
  XBT: 'XBT',
  GBP: 'GBP',
  BTC: 'BTC',
  BRL: 'BRL',
};

export const DOC_TYPE = {
  NATIONAL_ID: 'NATIONAL_ID',
  PASSPORT: 'PASSPORT',
  OTHER: 'OTHER',
};

export const currencyFlags: Record<string, string> = {
  COP: '🇨🇴',
  USD: '🇺🇸',
  EUR: '🇪🇺',
  BRL: '🇧🇷',
};

export const RECIPIENT_TRANSFER_TYPE = {
  FIAT: 'FIAT',
  BLOCKCHAIN: 'BLOCKCHAIN',
};

export const RECIPIENT_TYPE = {
  INDIVIDUAL: 'INDIVIDUAL',
  BUSINESS: 'BUSINESS',
};

export const ORGANIZATION_TYPE = RECIPIENT_TYPE;

export const BLOCKCHAIN = {
  POLYGON: 'POLYGON',
  ETHEREUM: 'ETHEREUM',
  BASE: 'BASE',
  CELO: 'CELO',
};

export const PAYMENT_RAILS = {
  ACH: 'ACH',
  WIRE: 'WIRE',
  SEPA: 'SEPA',
  ACH_PUSH: 'ACH_PUSH',
};

export const mapToCurrencyLocaleValues: Record<string, string> = {
  USD: 'en-US',
  USDC: 'en-US',
  EUR: 'pt-PT',
  XBT: 'en-US',
  BTC: 'en-US',
  GBP: 'en-GB',
  COP: 'es-CO',
  BRL: 'pt-BR',
};

export enum STATUS_TYPES {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  IN_REVIEW = 'IN_REVIEW',
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  CANCELED = 'CANCELED',
  ACTIVATED = 'ACTIVATED',
}

export const TRANSFER_RECIPIENT = {
  SAVINGS: 'SAVINGS',
  CHECKING: 'CHECKING',
};
