import { css } from '@emotion/react';

export const layoutStyles = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  isolation: isolate;
  overflow: hidden;
`;

export const mainStyles = css`
  flex: 1;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;
