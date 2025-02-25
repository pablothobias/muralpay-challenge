import { ThemeType } from '@/styles/theme';
import { css } from '@emotion/react';

export const heroSectionStyles = css`
  position: relative;
  z-index: 2;

  .content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    z-index: 2;
  }
`;

export const welcomeCardStyles = (theme: ThemeType) => css`
  padding: 2rem;
  background: ${theme.colors.muted};

  .welcome-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    color: ${theme.colors.foreground};
  }

  .welcome-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;

      strong {
        &:first-of-type {
          color: ${theme.colors.primary};
        }
      }
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }
`;

export const cardGridStyles = css`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const infoContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
