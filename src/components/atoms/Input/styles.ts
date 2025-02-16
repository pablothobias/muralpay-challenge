import { css } from '@emotion/react';

export const inputGroupCss = css`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: var(--font-size-base);
    color: var(--foreground);
    margin-bottom: var(--spacing-xs);
  }

  input {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    background: var(--background);
    color: var(--foreground);
    outline: none;
    transition: border 0.2s ease-in-out;

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
    }
  }
`;

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

export const errorTextCss = css`
  font-size: var(--font-size-sm);
  color: var(--error);
  margin-top: var(--spacing-xs);
`;
