import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const inputGroupCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: var(--spacing-md);

  label {
    font-size: var(--font-size-base);
    color: ${colors.background.dark};
    margin-bottom: var(--spacing-xs);
  }

  input {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    background: ${colors.inverted.dark};
    color: ${colors.background.dark};
    outline: none;
    transition: border 0.2s ease-in-out;

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
  background: ${theme.colors.inverted};
  color: ${theme.colors.background};
  outline: none;
  transition: 0.2s all;

  &:focus {
    border-color: var(--primary);
    box-shadow: ${theme.shadows.md};
  }
`;

export const errorTextCss = css`
  font-size: var(--font-size-sm);
  color: var(--error);
  margin-top: var(--spacing-xs);
`;
