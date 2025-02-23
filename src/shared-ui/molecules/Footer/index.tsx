import { useTheme } from '@emotion/react';
import { footerStyles, socialMediaStyles } from './styles';
import Icon from '@/shared-ui/atoms/Icon';
import { useResponsive } from '@/utils/context/ResponsiveContext';

const Footer = () => {
  const theme = useTheme();
  const { isMobile } = useResponsive();

  const iconSize = isMobile ? 36 : 32;

  return (
    <footer css={footerStyles({ theme, isMobile })}>
      <div>
        <nav css={socialMediaStyles(theme)}>
          <a
            href="https://www.facebook.com/people/Mural-Pay/61569599751475/#"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="facebook" color={theme.colors.foregroundPrimary} size={iconSize} />
          </a>
          <a
            href="https://x.com/mural_pay/"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="twitter" color={theme.colors.foregroundPrimary} size={iconSize} />
          </a>
          <a
            href="https://www.instagram.com/mural_pay/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="instagram" color={theme.colors.foregroundPrimary} size={iconSize} />
          </a>
        </nav>
      </div>
      <b>© 2025 Mural Pay. All rights reserved.</b>
    </footer>
  );
};

export default Footer;
