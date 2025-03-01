import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const inputGroupCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;

  label {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.foreground};
    margin-bottom: ${theme.spacing.xs};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

export const inputStyles = (theme: ThemeType) => css`
  width: 100%;
  padding: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.base};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.background};
  color: ${theme.colors.foreground};
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${theme.colors.neutral[400]};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    background: ${theme.colors.muted};
    cursor: not-allowed;
  }
`;

export const errorTextCss = (theme: ThemeType) => css`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
`;
