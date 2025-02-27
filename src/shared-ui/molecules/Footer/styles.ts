import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

type FooterStylesProps = {
  theme: ThemeType;
  isMobile?: boolean;
};

export const footerStyles = ({ theme, isMobile = true }: FooterStylesProps) => css`
  text-align: center;
  display: flex;
  gap: 1rem;
  flex-direction: ${isMobile ? 'column' : 'row'};
  align-items: center;
  justify-content: ${isMobile ? 'center' : 'space-between'};
  color: ${theme.colors.foregroundPrimary};
  padding: 1rem;
`;

export const socialMediaStyles = (theme: ThemeType) => css`
  display: flex;
  gap: 1.5rem;
  margin: 0;

  a {
    font-size: 1.5rem;

    svg {
      transition: color 0.5s ease-in-out;

      &:hover {
        color: ${theme.colors.foregroundPrimary} !important;
      }
    }
  }
`;
