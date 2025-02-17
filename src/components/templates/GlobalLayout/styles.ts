import { colors } from '@/styles/variables';
import { css } from '@emotion/react';

export const layoutStyles = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.white};
`;

export const mainStyles = css`
  flex: 1;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;
