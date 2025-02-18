import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

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
