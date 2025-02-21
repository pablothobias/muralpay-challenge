import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

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

  h2 {
    margin: 0;
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.primary};
  }
`;

export const contentCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize};
  line-height: 1.4;
`;

export const footerCss = (theme: ThemeType) => css`
  margin-top: ${theme.spacing.md};
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: ${theme.spacing.sm};
  }
`;

export const infoItemCss = (theme: ThemeType) => css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${theme.spacing.xs};

  strong {
    flex-basis: 120px;
    color: ${theme.colors.background};
  }

  span {
    color: ${theme.colors.background};
  }
`;
