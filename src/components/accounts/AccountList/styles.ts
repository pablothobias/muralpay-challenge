import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const accountListContainerCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  width: 100%;
  max-height: 70vh;
  margin-top: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};

  h2 {
    color: ${theme.colors.foreground};
  }
`;

export const accountListHeaderCss = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-lg);
  box-shadow: 0 4px 4px -2px gray;
  z-index: 2;
`;

export const contentCss = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);

  h3 {
    margin: 0;
    font-size: var(--font-size-sm);
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
  }
`;

export const statusCss = (status: string) => css`
  border-radius: 50%;
  background: ${colors.neutral[50]};
  border: 1px solid ${status === 'ACTIVE' ? colors.success.light : colors.warning.light};
  width: 12px;
  height: 12px;
`;

export const statusBadgeCss = (status: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 16px;
  border: 1px solid ${status === 'ACTIVE' ? colors.success.light : colors.warning.light};
  font-weight: 500;
  font-size: var(--font-size-sm);
  background: ${status === 'ACTIVE' ? colors.success.light : colors.warning.light};
  color: ${colors.neutral[50]};
`;

export const leftContentCss = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
`;

export const rightContentCss = css`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 120px;

  span {
    font-weight: 600;
  }

  small {
    color: var(--muted-foreground);
  }
`;

export const accountInfo = css`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 700;
`;

export const accountItemRightRow = css`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  justify-content: space-between;
`;
