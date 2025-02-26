import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';
import { spacing, typography } from '@/styles/variables';

export const containerCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacing.lg};
  background: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const formTitleCss = (theme: ThemeType) => css`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  margin: ${spacing.md} 0;
  color: ${theme.colors.primary};
`;

export const recipientsInfoContainerCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.md};
  padding: ${spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
`;

export const selectCss = (theme: ThemeType) => css`
  padding: ${spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  font-size: ${typography.fontSize.base};
  background: ${theme.colors.foreground};
  color: ${theme.colors.background};

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;

export const ctaContainerCss = css`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-start;
  width: 100%;
  margin-top: ${spacing.lg};
`;
