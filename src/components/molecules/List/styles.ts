import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const loadingContainerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50vh;
  background: ${colors.neutral[200]};
`;

export const listContainerCss = (applyShouldInset: boolean) => css`
  width: 100%;
  border-radius: 0 0 8px 8px;
  overflow-y: auto;
  background: ${colors.neutral[400]};
  ${applyShouldInset && { 'box-shadow': `inset 0px 0px 18px -4px rgba(0,0,0,0.75)` }};
`;

export const listItemCss = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid ${theme.colors.border};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${colors.neutral[50]};
    background: ${colors.neutral[600]};
  }

  &:nth-of-type(even) {
    background-color: ${colors.background.light};
    color: ${colors.background.dark};

    &:hover {
      color: ${colors.neutral[50]};
      background-color: ${colors.neutral[600]};
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

export const emptyStateCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-xl);
  text-align: center;
  color: ${theme.colors.inverted};

  svg {
    margin-bottom: var(--spacing-md);
    color: ${theme.colors.inverted};
  }
`;
