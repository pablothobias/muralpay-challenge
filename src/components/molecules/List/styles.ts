import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

export const listContainerCss = (theme: ThemeType) => css`
  width: 100%;
  border-radius: var(--border-radius);
  overflow: hidden;
  background: ${theme.colors.background};
`;

export const listItemCss = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid ${theme.colors.border};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.colors.muted};
  }
`;

export const iconWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: var(--spacing-md);
`;

export const emptyStateCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  text-align: center;
  color: ${theme.colors.muted};

  svg {
    margin-bottom: var(--spacing-md);
    color: ${theme.colors.muted};
  }
`;
