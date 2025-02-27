import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const loadingContainerCss = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50vh;
  background: ${theme.colors.neutral[200]};
`;

export const listContainerCss = (theme: ThemeType) => css`
  width: 100%;
  border-radius: 0 0 8px 8px;
  overflow-y: auto;
  background: ${theme.colors.background};
`;

export const listItemCss = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 15vh;
  margin: 0 auto;
  padding: var(--spacing-md);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.neutral[50]};
    background: ${theme.colors.neutral[400]};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
    transform: perspective(0) translate3d(0, 0, 0);
    height: 20vh;

    svg {
      color: ${theme.colors.neutral[50]} !important;
    }
  }

  &:nth-of-type(even) {
    background-color: ${theme.colors.muted};
    color: ${theme.colors.foreground};

    &:hover {
      color: ${theme.colors.neutral[50]};
      background: ${theme.colors.neutral[400]};
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
      transform: perspective(0) translate3d(0, 0, 0);

      svg {
        color: ${theme.colors.neutral[50]} !important;
      }
    }
  }

  &:nth-last-of-type(1) {
    border-radius: 0 0 8px 8px;
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
