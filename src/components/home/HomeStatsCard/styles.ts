import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

export const statsCardStyles = (theme: ThemeType, variant?: string) => css`
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.3s ease;
  max-width: 400px;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: ${theme.colors.invertedLight};

    .stats-value {
      color: ${variant === 'warning' ? theme.colors.warning : theme.colors.secondary} !important;
    }

    .stats-label {
      color: ${theme.colors.foreground} !important;
      font-size: 1.1rem !important;
    }

    svg {
      transition: color 0.3s ease-in-out;
      color: ${variant === 'warning' ? theme.colors.warning : theme.colors.secondary} !important;
    }
  }

  .stats-content {
    h3 {
      font-size: 1.1rem;
      color: ${theme.colors.foreground};
      margin-bottom: 0.5rem;
      transition: color 0.3s ease-in-out;
    }

    .stats-value {
      font-size: 1.8rem;
      font-weight: bold;
      color: ${theme.colors.primary};
      margin: 0.5rem 0;
      transition: all 0.3s ease-in-out;
    }

    .stats-label {
      font-size: 0.9rem;
      color: ${theme.colors.muted};
      transition: color 0.3s ease-in-out;
    }
  }
`;
