import Icon from '@/shared-ui/atoms/Icon';
import LoadingSpinner from '@/shared-ui/atoms/LoadingSpinner';
import useAccountStore from '@/store/account';
import useAuthStore from '@/store/auth';
import useOrganizationStore from '@/store/organization';
import useTransferStore from '@/store/transfer';
import { useToggleTheme } from '@/utils/context/toggleThemeContext';
import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { headerStyles, navLinkStyles } from './styles';
import { useEffect, useState } from 'react';

const Button = dynamic(() => import('@/shared-ui/atoms/Button'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Header = () => {
  const theme = useTheme();
  const { toggleTheme } = useToggleTheme();
  const { logout, isAuthenticated = false } = useAuthStore((state) => state);
  const accountStoreOnLogout = useAccountStore((state) => state.onLogout);
  const organizationStoreOnLogout = useOrganizationStore((state) => state.onLogout);
  const transferStoreOnLogout = useTransferStore((state) => state.onLogout);

  const [isAuthenticatedValue, setIsAuthenticatedValue] = useState(isAuthenticated);

  useEffect(() => {
    setIsAuthenticatedValue(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <header css={headerStyles(theme)}>
      <div className="logo">
        <Image src="/assets/images/logo.jpeg" alt="Mural Pay" priority width={50} height={50} />
        <h1>Mural Pay</h1>
      </div>
      <nav>
        {isAuthenticatedValue && (
          <>
            <Link href="/" css={navLinkStyles(theme)}>
              <Icon name="home" size={15} />
              Home
            </Link>
            <Link href="/accounts" css={navLinkStyles(theme)}>
              <Icon name="users" size={15} />
              Accounts
            </Link>
            <Link href="/transfers" css={navLinkStyles(theme)}>
              <Icon name="transfer" size={15} />
              Transfers
            </Link>
            <Link
              href="/"
              onClick={() => {
                logout();
                accountStoreOnLogout();
                transferStoreOnLogout();
                organizationStoreOnLogout();
              }}
              css={navLinkStyles(theme)}
            >
              <Icon name="logout" size={15} />
              Logout
            </Link>
          </>
        )}
        <Button onClick={toggleTheme} variant="secondary">
          <Icon name="refresh" size={15} />
          <b>Theme</b>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
