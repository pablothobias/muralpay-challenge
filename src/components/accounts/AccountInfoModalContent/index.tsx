import { useTheme } from '@emotion/react';
import React from 'react';

import { AccountResponse } from '@/features/account/types';

import { formatCurrency } from '@/utils/functions/formatCurrency';

import { containerCss, contentCss, infoItemCss } from './styles';

export interface AccountInfoModalContentProps {
  account?: AccountResponse | null;
}

const AccountInfoModalContent: React.FC<AccountInfoModalContentProps> = ({ account }) => {
  const theme = useTheme();

  if (!account) return null;

  return (
    <div css={containerCss}>
      <div css={contentCss(theme)}>
        <div css={infoItemCss(theme)}>
          <strong>ID:</strong> <span>{account.id}</span>
        </div>
        <div css={infoItemCss(theme)}>
          <strong>Blockchain:</strong> <span>{account.blockchain}</span>
        </div>
        <div css={infoItemCss(theme)}>
          <strong>Address:</strong> <span>{account.address}</span>
        </div>
        <div css={infoItemCss(theme)}>
          <strong>Balance:</strong>{' '}
          <span>
            {formatCurrency(account.balance.balance, account.balance.tokenSymbol)}
            &nbsp;
            {account.balance.tokenSymbol}&nbsp;
          </span>
        </div>
        <div css={infoItemCss(theme)} data-testid="status-container">
          <strong data-testid="status-label">Status:</strong>
          <span data-testid="status-value">{account.isPending ? 'Pending' : 'Active'}</span>
        </div>
        <div css={infoItemCss(theme)} data-testid="api-enabled-container">
          <strong data-testid="api-enabled-label">API Enabled:</strong>
          <span data-testid="api-enabled-value">{account.isApiEnabled ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoModalContent;
