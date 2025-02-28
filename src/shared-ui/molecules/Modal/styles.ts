import { css, keyframes } from '@emotion/react';

import { ThemeType } from '@/styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const modalOverlayCss = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const modalContentWrapperCss = (theme: ThemeType, isMobile: boolean) => css`
  position: relative;
  max-width: ${isMobile ? '100%' : '90vw'};
  max-height: ${isMobile ? '100%' : '90vw'};
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease-out;

  &:focus {
    outline: none;
    box-shadow: ${theme.shadows.lg};
  }
`;

export const modalHeaderCss = (theme: ThemeType) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid ${theme.colors.border};

  h2 {
    margin: 0;
    font-size: var(--font-size-lg);
    color: ${theme.colors.foreground};
  }
`;

export const closeButtonCss = (theme: ThemeType) => css`
  background: transparent;
  border: none;
  padding: var(--spacing-sm);
  cursor: pointer;
  color: ${theme.colors.background}
  transition: all 0.2s;
  border-radius: var(--border-radius);

  &:hover {
    background: ${theme.colors.muted};
  }

  &:focus {
    outline: none;
    box-shadow: ${theme.shadows.sm};
  }
`;

export const modalBodyCss = css`
  margin-bottom: var(--spacing-lg);
`;

export const modalFooterCss = css`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border);
`;
