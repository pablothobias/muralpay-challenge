import { css } from '@emotion/react';
import { ThemeType } from '@/styles/theme';

export const cardWrapperCss = (theme: ThemeType) => css`
  background: var(--background);
  border-radius: var(--border-radius);
  border: 1px solid var(--border);
  padding: var(--spacing-lg);
  transition: all 0.2s ease-in-out;
  box-shadow: ${theme.shadows.sm};

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

export const cardHeaderCss = css`
  margin-bottom: var(--spacing-md);

  h2,
  h3,
  h4 {
    color: var(--foreground);
    margin: 0;
  }
`;

export const cardContentCss = css`
  color: var(--foreground);
`;

export const cardFooterCss = css`
  margin-top: var(--spacing-md);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
`;

export const cardVariantCss = (theme: ThemeType) => ({
  outlined: css`
    background: ${theme.colors.muted};
    border: 1px solid var(--border);
  `,
  elevated: css`
    border: none;
    box-shadow: ${theme.shadows.lg};
  `,
  flat: css`
    border: none;
    box-shadow: none;
  `,
});
