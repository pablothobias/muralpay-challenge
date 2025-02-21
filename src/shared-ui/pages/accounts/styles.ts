import { css } from '@emotion/react';

export const pageContainer = css`
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 480px;

  @media (min-width: 768px) {
    max-width: 720px;
    padding: 20px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
  }
`;

export const sectionContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const sectionHeader = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const buttonStyles = css`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
    font-size: 18px;
  }
`;
