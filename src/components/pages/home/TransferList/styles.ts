import { css } from '@emotion/react';
import { ThemeType } from '@/styles/theme';

export const transferListContainerCss = (theme: ThemeType) => css`
  margin-top: var(--spacing-xl);

  h2 {
    margin-bottom: var(--spacing-lg);
    color: ${theme.colors.foreground};
  }
`;

export const transferListHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;
