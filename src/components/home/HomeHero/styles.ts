import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

export const heroSectionStyles = (theme: ThemeType) => css`
  padding: 4rem 0;
  text-align: center;

  .content {
    max-width: 1024px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  strong {
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;

export const infoContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
