import { css } from '@emotion/react';

interface ButtonStyleProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  hasIcon: boolean;
}

const sizeStyles = {
  small: css`
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
    gap: var(--spacing-xs);
  `,
  medium: css`
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-md);
    gap: var(--spacing-sm);
  `,
  large: css`
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
    gap: var(--spacing-md);
  `,
};

const variantStyles = {
  primary: css`
    background: var(--primary);
    color: var(--primary-foreground);

    &:hover:not(:disabled) {
      background: var(--primary-dark);
    }

    &:disabled {
      background: var(--muted);
      cursor: not-allowed;
    }
  `,
  secondary: css`
    background: transparent;
    color: var(--foreground);
    border: 1px solid var(--border);

    &:hover:not(:disabled) {
      background: var(--muted);
    }

    &:disabled {
      color: var(--muted-foreground);
      cursor: not-allowed;
    }
  `,
};

export const buttonStyles = ({ size, variant }: ButtonStyleProps) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  ${sizeStyles[size]}
  ${variantStyles[variant]}

  svg {
    width: ${size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px'};
    height: ${size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px'};
  }
`;
