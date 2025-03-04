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
  padding: 0;

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;
