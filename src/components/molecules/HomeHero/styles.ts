import { css } from '@emotion/react';

export const heroSectionStyles = css`
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

  .buttonGroup {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;

    @media (min-width: 640px) {
      flex-direction: row;
    }
  }
`;
