import { shadows } from '@/styles/variables';
import { css } from '@emotion/react';

export const selectGroupCss = css`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: var(--font-size-base);
    color: var(--foreground);
    margin-bottom: var(--spacing-xs);
  }

  select {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    background: var(--background);
    color: var(--foreground);
    outline: none;
    transition: border 0.2s ease-in-out;
    cursor: pointer;

    &:focus {
      border-color: var(--primary);
      box-shadow: ${shadows.black.md};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

export const errorTextCss = css`
  font-size: var(--font-size-sm);
  color: var(--error);
  margin-top: var(--spacing-xs);
`;
