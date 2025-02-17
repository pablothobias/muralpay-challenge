import { css } from '@emotion/react';
import { ThemeType } from '@/styles/theme';

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
