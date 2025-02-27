import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CurrencyInput from 'react-currency-input-field';
import InputMask from 'react-input-mask-next';

import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';

export const inputGroupCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: var(--font-size-base);
    color: ${colors.background.dark};
    margin-bottom: var(--spacing-xs);
  }

  input {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    background: ${colors.foreground.dark};
    color: ${colors.background.dark};
    outline: none;
    transition: border 0.2s ease-in-out;

    &::placeholder {
      color: ${colors.neutral[400]};
    }

    &:focus {
      border-color: var(--primary);
      box-shadow: ${theme.shadows.md};
    }
  }
`;

const baseInputStyles = (theme: ThemeType) => css`
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

export const inputStyles = baseInputStyles;

export const StyledInputMask = styled(InputMask)<{ theme: ThemeType }>`
  ${({ theme }) => baseInputStyles(theme)}
`;

export const StyledCurrencyInput = styled(CurrencyInput)<{ theme: ThemeType }>`
  ${({ theme }) => baseInputStyles(theme)}
`;

export const errorTextCss = css`
  font-size: var(--font-size-sm);
  color: var(--error);
  margin-top: var(--spacing-xs);
`;
