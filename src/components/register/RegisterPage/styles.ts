import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';
import { breakpoints } from '@/styles/variables';

export const pageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media (min-width: ${breakpoints.md}) {
    padding: 2rem;
  }
`;

export const cardContainerCss = css`
  width: 100%;
  max-width: 600px;
  padding: 0;

  @media (min-width: ${breakpoints.sm}) {
    padding: 1rem;
  }

  @media (min-width: ${breakpoints.md}) {
    padding: 2rem;
  }
`;

export const titleCss = (theme: ThemeType) => css`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.foreground};
`;

export const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const sectionTitleCss = css`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const warningMessageCss = (theme: ThemeType) => css`
  background-color: ${theme.colors.warning}20;
  color: ${theme.colors.warning};
  padding: 12px 16px;
  border-radius: 4px;
  margin: 16px 0;
  font-weight: 500;
  border-left: 4px solid ${theme.colors.warning};
`;
