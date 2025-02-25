import { CURRENCY, mapToCurrencyLocaleValues } from '../constants';

export const formatCurrency = (amount: number = 0, currency: string = 'USD') => {
  const currencyCode = Object.values(CURRENCY).find((value) => value === currency) || 'USD';

  const locale = mapToCurrencyLocaleValues[currency] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
