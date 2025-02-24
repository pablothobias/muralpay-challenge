import { spacing, typography } from '@/styles/variables';
import { css, Theme } from '@emotion/react';

export const containerCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${spacing.xl};
  text-align: center;
  background: ${theme.colors.background};
  color: ${theme.colors.foreground};
  border-radius: 12px;
  width: 70%;
  margin: 0 auto;
`;

export const contentWrapperCss = css`
  max-width: 600px;
  width: 100%;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const illustrationCss = (theme: Theme) => css`
  display: block;
  margin-bottom: ${spacing.xl};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: ${theme.colors.background === '#181818'
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.02)'};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const titleCss = (theme: Theme) => css`
  span {
    font-size: 2rem;
    font-weight: ${typography.fontWeight.bold};
    margin: ${spacing.lg} 0;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  margin: ${spacing.lg} 0;
`;

export const messageCss = (theme: Theme) => css`
  font-size: ${typography.fontSize.lg};
  line-height: 1.6;
  color: ${theme.colors.foreground};
  margin-bottom: ${spacing.xl};
`;

export const buttonsCss = css`
  display: flex;
  gap: ${spacing.lg};
  justify-content: center;
  margin-top: ${spacing.xl};

  button {
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const errorDetailsCss = (theme: Theme) => css`
  margin-top: ${spacing.xl};
  padding: ${spacing.lg};
  background: ${theme.colors.background};
  border-radius: 12px;
  text-align: left;
  width: 100%;
  max-width: 800px;
  overflow: auto;
  border: 1px solid ${theme.colors.border};

  pre {
    font-family: 'Fira Code', monospace;
    font-size: ${typography.fontSize.sm};
    color: ${theme.colors.foreground};
    margin: 0;
  }
`;
