import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const containerCss = css`
  width: 100%;
  margin: 0 auto;
`;

export const headerCss = (theme: ThemeType) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};

  span {
    font-size: ${theme.typography.fontSize.md};
  }
`;

export const contentCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.md};
  line-height: 1.4;
`;

export const infoItemCss = (theme: ThemeType) => css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${theme.spacing.xs};

  strong {
    flex-basis: 120px;
    color: ${theme.colors.foreground};
  }

  span {
    color: ${theme.colors.foreground};
  }
`;
