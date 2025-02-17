import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

export const footerStyles = (theme: ThemeType) => css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.primary};
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const linkStyles = (theme: ThemeType) => css`
  color: ${theme.colors.primary};
  margin: 0 0.5rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const socialMediaStyles = (theme: ThemeType) => css`
  display: flex;
  gap: 0.5rem;

  a {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
  }
`;
