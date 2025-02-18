import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const listContainerCss = (applyShouldInset: boolean) => css`
  width: 100%;
  border-radius: 0 0 var(--border-radius);
  overflow-y: auto;
  background: ${colors.neutral[500]};
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
    background: ${theme.colors.muted};
  }

  &:nth-child(even) {
    background-color: ${colors.background.light};
    color: ${colors.background.dark};

    &:hover {
      background: ${colors.muted.dark};
      color: ${colors.neutral[50]};
    }
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
