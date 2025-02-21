import { useTheme } from '@emotion/react';
import { footerStyles, linkStyles, socialMediaStyles } from './styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <footer css={footerStyles(theme)}>
      <div>
        <nav>
          <a href="/about" css={linkStyles(theme)}>
            About Us
          </a>
          <a href="/contact" css={linkStyles(theme)}>
            Contact
          </a>
          <a href="/privacy" css={linkStyles(theme)}>
            Privacy Policy
          </a>
        </nav>
      </div>
      <div css={socialMediaStyles(theme)}>
        <a href="https://facebook.com" aria-label="Facebook">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p>© 2025 Mural Pay. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
