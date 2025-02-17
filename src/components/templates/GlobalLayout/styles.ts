import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

export const layoutStyles = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

export const mainStyles = css`
  flex: 1;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;
