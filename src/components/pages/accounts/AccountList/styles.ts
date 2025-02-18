import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const accountListContainerCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 70vh;
  margin-top: var(--spacing-xl);
  border: 1px solid ${theme.colors.border};
  border-radius: var(--border-radius);

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
  z-index: 10;
`;

export const contentCss = css`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  background: ${status === 'ACTIVE' ? colors.success.light : colors.warning.light};
  border: 1px solid ${status === 'ACTIVE' ? colors.success.light : colors.warning.light};
  box-shadow: 0 0 0 2px ${status === 'ACTIVE' ? colors.success.light : colors.warning.light};
  width: 12px;
  height: 12px;
`;

export const statusFontCss = (status: string) => css`
  font-weight: 500;
  font-size: var(--font-size-sm);
  color: ${status === 'ACTIVE' ? colors.success.light : colors.warning.light};
`;

export const rightContentCss = css`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: var(--spacing-xs);

  span {
    font-weight: 600;
  }

  small {
    color: var(--muted-foreground);
  }
`;

export const emptyStateCss = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  background: ${theme.colors.muted};
  padding: var(--spacing-lg);
  border: 1px solid ${theme.colors.muted};
  border-radius: var(--border-radius);
`;

export const accountBalance = css`
  font-weight: 700;
`;

export const accountItemRightRow = css`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: space-between;
`;
