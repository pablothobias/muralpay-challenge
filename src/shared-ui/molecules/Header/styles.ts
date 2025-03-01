import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

type HeaderStylesProps = {
  theme: ThemeType;
  isMobile?: boolean;
};

export const headerStyles = ({ theme }: HeaderStylesProps) => css`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${theme.colors.background};
  color: ${theme.colors.foreground};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.md};
  height: 72px;

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const desktopNavStyles = css`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const themeBtnStyles = css`
  @media (max-width: 767px) {
    display: none;
  }
`;

export const mobileNavLinkStyles = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.neutral[100]};
  }
`;

export const navLinkStyles = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  background-color: transparent;

  &:hover {
    color: ${theme.colors.secondary};
    text-decoration: underline;

    svg {
      color: ${theme.colors.secondary} !important;
    }
  }
`;
