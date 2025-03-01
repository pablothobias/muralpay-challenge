import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const formGroupCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.lg};
  width: 100%;

  .error-message {
    color: ${theme.colors.error};
    font-size: ${theme.typography.fontSize.sm};
    margin-top: ${theme.spacing.xs};
  }
`;

export const formSectionCss = (theme: ThemeType) => css`
  background-color: ${theme.colors.foreground};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};

  h4 {
    color: ${theme.colors.background};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    margin-bottom: ${theme.spacing.md};
  }
`;

export const recipientFieldsCss = (theme: ThemeType) => css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

export const addressSectionStyles = (theme: ThemeType) => css`
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
`;

export const addressTitleStyles = (theme: ThemeType) => css`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: var(--spacing-md);
`;
