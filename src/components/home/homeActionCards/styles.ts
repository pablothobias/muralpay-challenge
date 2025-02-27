import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const actionCardStyles = (theme: ThemeType) => css`
  padding: 1.5rem;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;

  h3 {
    font-size: 1.2rem;
    color: ${theme.colors.foreground};
    margin: 1rem 0 0.5rem;
  }

  p {
    color: ${theme.colors.muted};
    font-size: 0.9rem;
  }

  &:hover {
    transform: translateY(-5px);
    background: ${theme.colors.primary};
    color: ${theme.colors.neutral[50]};
    margin: 0 auto;

    h3,
    p {
      color: ${theme.colors.neutral[50]};
    }

    svg {
      color: ${theme.colors.neutral[50]} !important;
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  strong {
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;
