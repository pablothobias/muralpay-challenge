export const CURRENCY = {
  COP: 'COP',
  USD: 'USD',
  EUR: 'EUR',
  XBT: 'XBT',
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
};

export const ACC_TYPE = {
  SAVINGS: 'SAVINGS',
  CHECKING: 'CHECKING',
};

export const RECIPIENT_TRANSFER_TYPE = {
  FIAT: 'FIAT',
  BLOCKCHAIN: 'BLOCKCHAIN',
};

export const RECIPIENT_TYPE = {
  INDIVIDUAL: 'INDIVIDUAL',
  BUSINESS: 'BUSINESS',
};

export const BLOCKCHAIN = {
  POLYGON: 'POLYGON',
  ETHEREUM: 'ETHEREUM',
  BASE: 'BASE',
  CELO: 'CELO',
};

export const formatCurrency = (amount: number, currency: string) => {
  const mappedCurrencyValues: Record<string, string> = {
    COP: 'es-CO',
    USD: 'en-US',
    EUR: 'en_GB',
    XBT: 'en-US',
  };

  return `${Intl.NumberFormat(mappedCurrencyValues[currency], { style: 'currency', currency: currency }).format(amount)}`;
};
