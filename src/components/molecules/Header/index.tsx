import { useTheme } from '@emotion/react';
import { headerStyles, navLinkStyles } from './styles';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const theme = useTheme();

  return (
    <header css={headerStyles(theme)}>
      <div className="logo">
        <Image src="/assets/images/logo.jpeg" alt="Mural Pay" priority width={50} height={50} />
        <h1>Mural Pay</h1>
      </div>
      <nav>
        <Link href="/" css={navLinkStyles(theme)}>
          Home
        </Link>
        <Link href="/about" css={navLinkStyles(theme)}>
          About
        </Link>
        <Link href="/services" css={navLinkStyles(theme)}>
          Services
        </Link>
        <Link href="/contact" css={navLinkStyles(theme)}>
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
