import { css } from '@emotion/react';

export const containerCss = css`
  max-width: 500px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  background: var(--muted);
  border-radius: var(--border-radius);
  box-shadow: var(--shadows-md);
  text-align: center;
`;

export const titleCss = css`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--foreground);
`;

export const formCss = css`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

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

export const errorTextCss = css`
  font-size: var(--font-size-sm);
  color: var(--error);
  margin-top: var(--spacing-xs);
`;
