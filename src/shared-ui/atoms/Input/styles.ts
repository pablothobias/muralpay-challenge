import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const inputGroupCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: var(--font-size-base);
    color: ${theme.colors.foreground};
    margin-bottom: var(--spacing-xs);
  }

  input {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    background: ${colors.neutral[50]};
    color: ${colors.background.dark} !important;
    outline: none;
    transition: border 0.2s ease-in-out;

    &::placeholder {
      color: ${colors.background.dark};
    }

    &:focus {
      border-color: var(--primary);
      box-shadow: ${theme.shadows.md};
    }
  }
`;

export const inputStyles = (theme: ThemeType) => css`
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
  border: 1px solid var(--border);
  background: ${theme.colors.foreground};
  color: ${theme.colors.background};
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
