import { colors, spacing, typography } from '@/styles/variables';
import { css } from '@emotion/react';

export const transfersPageCss = css`
  padding: ${spacing.lg};

  h1 {
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${spacing.sm};
    h1 {
      font-size: ${typography.fontSize.lg};
      font-weight: ${typography.fontWeight.bold};
    }
  }
`;

export const sectionContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  border: 1px solid ${colors.neutral[300]};
  border-radius: var(--border-radius);
`;

export const sectionHeader = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-lg);
  box-shadow: 0 4px 4px -2px gray;
  z-index: 10;
`;

export const transferRowCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    span {
      font-size: 1.5rem;
      margin-right: ${spacing.sm};
    }
    strong {
      font-weight: bold;
    }
  }
`;

export const rowRightContentCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end !important;
  gap: var(--spacing-sm);
`;

export const rowLeftContentCss = css`
  display: flex;
  flex-direction: column;
  align-items: start !important;
  justify-content: center;
  gap: var(--spacing-sm);
`;

export const rowMiddleContentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
`;

export const transferBadgeCss = (status: string) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sm};
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${status === 'completed' ? colors.success.light : colors.warning.light};
  color: #fff;
  font-weight: bold;
`;

export const transferButtonCss = css`
  padding: ${spacing.xs} ${spacing.sm};
  background-color: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: ${spacing.xs};
  cursor: pointer;
  transition: background-color 0.3s;
`;
