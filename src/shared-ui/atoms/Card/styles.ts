import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const cardWrapperCss = (theme: ThemeType) => css`
  background-color: ${theme.colors.foreground};
  border-radius: var(--border-radius);
  border: 1px solid ${theme.colors.foreground};
  padding: var(--spacing-lg);
  transition: all 0.2s ease-in-out;
  box-shadow: ${theme.shadows.md};

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

export const cardHeaderCss = (theme: ThemeType) => css`
  margin-bottom: var(--spacing-md);

  h2,
  h3,
  h4 {
    color: ${theme.colors.background};
    margin: 0;
  }
`;

export const cardContentCss = css`
  color: ${colors.background.dark};
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
    border: 1px solid ${theme.colors.background};
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
