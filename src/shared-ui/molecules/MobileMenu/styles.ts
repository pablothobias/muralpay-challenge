import { css } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

export const menuButtonCss = css`
  display: none;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: var(--hover);
  }
`;

export const menuOverlayCss = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 998;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const containerCss = (theme: ThemeType) => css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 360px;
  background-color: ${theme.colors.background};
  box-shadow: ${theme.shadows.lg};
  z-index: 999;
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const menuHeaderCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const menuContentCss = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 72px);
`;

export const menuItemCss = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  color: ${theme.colors.primary};
  font-size: 1rem;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: ${theme.colors.primary};
  }
`;
