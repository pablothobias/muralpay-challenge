import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const selectGroupCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: var(--font-size-base);
    color: ${theme.colors.foreground};
    margin-bottom: var(--spacing-xs);
  }

  select {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    outline: none;
    transition: border 0.2s ease-in-out;
    cursor: pointer;

    &:focus {
      border-color: var(--primary);
      box-shadow: ${theme.shadows.md};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

export const selectStyles = (theme: ThemeType) => css`
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
  border: 1px solid var(--border);
  background: ${theme.colors.background};
  color: ${theme.colors.foreground};
  outline: none;
  transition: 0.2s all;

  &:focus {
    border-color: var(--primary);
    box-shadow: ${theme.shadows.md};
  }
`;

export const errorTextCss = (theme: ThemeType) => css`
  font-size: var(--font-size-sm);
  color: ${theme.colors.error};
  margin-top: var(--spacing-xs);
`;

export const inputSelectGroupCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: var(--spacing-md);

  label {
    font-size: var(--font-size-base);
    color: ${theme.colors.foreground};
    margin-bottom: var(--spacing-xs);
  }

  select {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    background: ${theme.colors.foreground};
    color: ${theme.colors.background};
    outline: none;
    transition: border 0.2s ease-in-out;

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: ${theme.shadows.md};
    }
  }
`;
