import { CURRENCY, mapToCurrencyLocaleValues } from '../constants';

export const formatCurrency = (amount: number = 0, currency: string = 'USD') => {
  try {
    const currencyCode = Object.values(CURRENCY).find(value => value === currency) || currency;

    const locale = mapToCurrencyLocaleValues[currency] || 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.warn(`Error formatting currency ${currency}:`, error);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
};
