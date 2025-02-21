import { AccountResponse } from '@/features/account/types';
import { useTheme } from '@emotion/react';
import React from 'react';
import { containerCss, contentCss, footerCss, infoItemCss } from './styles';

export interface AccountInfoModalContentProps {
  account: AccountResponse;
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
            {account.balance.balance} {account.balance.tokenSymbol}
          </span>
        </div>
        <div css={infoItemCss(theme)}>
          <strong>Status:</strong> <span>{account.isPending ? 'Pending' : 'Active'}</span>
        </div>
        <div css={infoItemCss(theme)}>
          <strong>API Enabled:</strong> <span>{account.isApiEnabled ? 'Yes' : 'No'}</span>
        </div>
      </div>
      <div css={footerCss(theme)}></div>
    </div>
  );
};

export default AccountInfoModalContent;
