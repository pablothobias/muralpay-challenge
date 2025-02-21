import { ThemeType } from '@/styles/theme';
import { colors, shadows } from '@/styles/variables';
import { css } from '@emotion/react';

export const selectGroupCss = css`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: var(--font-size-base);
    color: ${colors.background.dark};
    margin-bottom: var(--spacing-xs);
  }

  select {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    margin-bottom: var(--spacing-md);
    background: ${colors.background.light};
    color: ${colors.background.dark};
    outline: none;
    transition: border 0.2s ease-in-out;
    cursor: pointer;

    &:focus {
      border-color: var(--primary);
      box-shadow: ${shadows.md};
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

  select {
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
