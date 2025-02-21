import { colors, spacing, typography } from '@/styles/variables';
import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${spacing.xl};
  text-align: center;
`;

export const iconCss = css`
  color: ${colors.error.dark};
  margin-bottom: ${spacing.md};
`;

export const titleCss = css`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral[900]};
  margin-bottom: ${spacing.sm};
`;

export const messageCss = css`
  font-size: ${typography.fontSize.md};
  color: ${colors.neutral[600]};
  margin-bottom: ${spacing.lg};
  max-width: 500px;
`;

export const buttonsCss = css`
  display: flex;
  gap: ${spacing.md};
`;

export const errorDetailsCss = css`
  margin-top: ${spacing.xl};
  padding: ${spacing.md};
  background: ${colors.neutral[100]};
  border-radius: 8px;
  text-align: left;
  width: 100%;
  max-width: 800px;
  overflow: auto;

  pre {
    font-size: ${typography.fontSize.sm};
    color: ${colors.neutral[700]};
    margin: 0;
  }
`;
