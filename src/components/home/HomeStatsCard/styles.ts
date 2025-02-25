import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

export const statsCardStyles = (theme: ThemeType, variant?: string) => css`
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.3s ease;
  max-width: 100%;
  cursor: default;
  background: ${theme.colors.background};

  @media (min-width: 640px) {
    max-width: 400px;
  }

  &:hover {
    transform: translateY(-5px);
    background: ${theme.colors.muted};

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
      color: transparent;
      transition: color 0.3s ease-in-out;
    }

    [data-testid='trend-value'] {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: ${theme.borderRadius.sm};
      font-size: 0.875rem;
      font-weight: 500;
      margin-left: 0.5rem;

      &.positive {
        color: ${theme.colors.success};
        background: ${theme.colors.success}20;
      }

      &.negative {
        color: ${theme.colors.error};
        background: ${theme.colors.error}20;
      }
    }
  }
`;
