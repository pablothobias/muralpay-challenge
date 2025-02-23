import { ThemeType } from '@/styles/theme';
import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const emptyStateCss = (theme: ThemeType) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-xl);
  text-align: center;
  background-color: ${theme.colors.neutral[100]};
  color: ${colors.background.dark};
  border-radius: 0 0 8px 8px;

  svg {
    margin-bottom: var(--spacing-md);
    color: ${theme.colors.foreground};
  }
`;
