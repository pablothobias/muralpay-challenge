import { css } from '@emotion/react';

export const inputStyles = () => css`
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
  border: 1px solid var(--border);
  background: var(--muted);
  color: var(--foreground);
  outline: none;
  transition: 0.2s all;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
  }
`;
