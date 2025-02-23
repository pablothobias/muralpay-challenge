import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

type ButtonStyleProps = {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outlined';
  size: 'small' | 'medium' | 'large';
  theme: ThemeType;
};

const sizeStyles = (theme: ThemeType) => ({
  small: css`
    position: relative;
    z-index: 2;
    box-shadow: ${theme.shadows.lg};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
    gap: ${theme.spacing.xs};
  `,
  medium: css`
    position: relative;
    z-index: 2;
    box-shadow: ${theme.shadows.lg};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.base};
    gap: ${theme.spacing.sm};
  `,
  large: css`
    position: relative;
    z-index: 2;
    box-shadow: ${theme.shadows.lg};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.lg};
    gap: ${theme.spacing.md};
  `,
});

const variantStyles = (theme: ThemeType) => ({
  primary: css`
    background: transparent;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${theme.colors.primary};
      color: ${theme.colors.background};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  secondary: css`
    background: ${theme.colors.foreground};
    color: ${theme.colors.background};
    border: 1px solid ${theme.colors.muted};

    &:hover:not(:disabled) {
      background: ${theme.colors.neutral[400]};
      color: ${theme.colors.muted};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  success: css`
    background: transparent;
    color: ${theme.colors.success};
    border: 1px solid ${theme.colors.success};

    &:hover:not(:disabled) {
      background: ${theme.colors.success};
      color: ${theme.colors.background};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  warning: css`
    background: transparent;
    color: ${theme.colors.warning};
    border: 1px solid ${theme.colors.warning};

    &:hover:not(:disabled) {
      background: ${theme.colors.warning};
      color: ${theme.colors.background};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  danger: css`
    background: transparent;
    color: ${theme.colors.error};
    border: 1px solid ${theme.colors.error};

    &:hover:not(:disabled) {
      background: ${theme.colors.error};
      color: ${theme.colors.background};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  outlined: css`
    border: 1px solid ${theme.colors.foreground};
    background: transparent;
    color: ${theme.colors.background};

    &:hover:not(:disabled) {
      background: ${theme.colors.muted};
      color: ${theme.colors.foreground};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
});

export const buttonStyles = ({ size, variant, theme }: ButtonStyleProps) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  ${sizeStyles(theme)[size]}
  ${variantStyles(theme)[variant]}

  svg {
    width: ${size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px'};
    height: ${size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px'};
  }

  &:hover {
    svg {
      color: ${theme.colors.background} !important;
    }
  }
`;
