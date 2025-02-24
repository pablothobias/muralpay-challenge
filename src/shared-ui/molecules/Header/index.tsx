import { Icon } from '@/shared-ui';
import { MobileMenu, MenuItem } from '@/shared-ui/molecules/MobileMenu';
import useAuthStore from '@/store/auth';
import useAccountStore from '@/store/account';
import useOrganizationStore from '@/store/organization';
import useTransferStore from '@/store/transfer';
import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  desktopNavStyles,
  headerStyles,
  mobileNavLinkStyles,
  navLinkStyles,
  themeBtnStyles,
} from './styles';
import { useEffect, useState } from 'react';
import { useToggleTheme } from '@/utils/context/ToggleThemeContext';
import { useResponsive } from '@/utils/context/ResponsiveContext';
import { IconProps } from '@/shared-ui/atoms/Icon';

const Button = dynamic(() => import('@/shared-ui/atoms/Button'), {
  ssr: false,
});

const Header = () => {
  const theme = useTheme();
  const { toggleTheme } = useToggleTheme();
  const { isAuthenticated, logout } = useAuthStore();
  const onLogoutAccount = useAccountStore((state) => state.onLogout);
  const onLogoutTransfer = useTransferStore((state) => state.onLogout);
  const onLogoutOrganization = useOrganizationStore((state) => state.onLogout);
  const [isAuthenticatedValue, setIsAuthenticatedValue] = useState(isAuthenticated);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    setIsAuthenticatedValue(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    logout();
    onLogoutAccount();
    onLogoutTransfer();
    onLogoutOrganization();
    setIsAuthenticatedValue(false);
  };

  const navigationItems = isAuthenticatedValue
    ? [
        { href: '/', icon: 'home', label: 'Home' },
        { href: '/accounts', icon: 'users', label: 'Accounts' },
        { href: '/transfers', icon: 'transfer', label: 'Transfers' },
        { href: '/register', icon: 'logout', label: 'Logout', onClick: handleLogout },
      ]
    : [];

  return (
    <header css={headerStyles({ theme, isMobile })}>
      <div className="logo">
        <Image
          src="/assets/images/logo.jpeg"
          alt="Mural Pay Logo"
          loading="lazy"
          width={50}
          height={50}
        />
      </div>

      <nav css={desktopNavStyles}>
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href} css={navLinkStyles(theme)} onClick={item.onClick}>
            <Icon name={item.icon as IconProps['name']} size={15} color={theme.colors.primary} />
            <span>{item.label}</span>
          </Link>
        ))}
        <Button onClick={toggleTheme} variant="secondary" css={themeBtnStyles}>
          <Icon name="refresh" size={15} color={theme.colors.primary} />
          <span>Theme</span>
        </Button>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpen={() => setIsMobileMenuOpen(true)}
      >
        {navigationItems.map((item) => (
          <MenuItem
            key={item.href}
            onClick={() => {
              item.onClick?.();
              setIsMobileMenuOpen(false);
            }}
          >
            <Link href={item.href} css={mobileNavLinkStyles(theme)}>
              <Icon name={item.icon as IconProps['name']} size={20} color={theme.colors.primary} />
              <span>{item.label}</span>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={toggleTheme}>
          <div css={mobileNavLinkStyles(theme)}>
            <Icon name="refresh" size={20} color={theme.colors.primary} />
            <span>Theme</span>
          </div>
        </MenuItem>
      </MobileMenu>
    </header>
  );
};

export default Header;
