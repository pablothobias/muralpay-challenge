import { css } from '@emotion/react';
import { ThemeType } from '@/styles/theme';
import { shadows } from '@/styles/variables';

export const headerStyles = (theme: ThemeType) => css`
  background-color: ${theme.colors.background};
  color: ${theme.colors.foreground};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  box-shadow: ${shadows.black.md};

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
  }

  nav {
    display: flex;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    nav {
      margin-top: 0.5rem;
    }
  }
`;

export const navLinkStyles = (theme: ThemeType) => css`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: ${theme.colors.secondary};
    text-decoration: underline;
  }
`;
