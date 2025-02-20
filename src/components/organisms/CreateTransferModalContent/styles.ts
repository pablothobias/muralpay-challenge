import { colors, spacing, typography } from '@/styles/variables';
import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacing.lg};
  background: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const formTitleCss = css`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.md};
  color: ${colors.primary};
`;

export const formGroupCss = css`
  display: flex;
  flex-direction: column;
`;

export const recipientsInfoContainerCss = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.md};
`;

export const selectCss = css`
  padding: ${spacing.sm};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: ${typography.fontSize.base};
  background: ${colors.inverted.dark};
  color: ${colors.background.dark};

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

export const ctaContainerCss = css`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-start;
  width: 100%;
`;
