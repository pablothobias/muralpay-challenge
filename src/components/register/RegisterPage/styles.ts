import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const pageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

export const cardContainerCss = css`
  width: 100%;
  max-width: 600px;
  padding: 1rem;

  @media (min-width: 640px) {
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
