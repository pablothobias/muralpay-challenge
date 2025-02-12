import { css } from '@emotion/react';

interface ButtonStyleProps {
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary';
}

export const buttonStyles = ({ size, variant }: ButtonStyleProps) => css`
  padding: ${size === 'small'
    ? '6px 12px'
    : size === 'large'
    ? '12px 24px'
    : '10px 20px'};
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
  background: ${variant === 'secondary'
    ? 'var(--secondary)'
    : 'var(--primary)'};
  color: white;
  transition: 0.2s all;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;
