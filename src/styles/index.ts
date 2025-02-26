import { css } from '@emotion/react';

import { inter } from './fonts';
import { ThemeType } from './theme';

export const globalStyles = (theme: ThemeType) => css`
  :root {
    --font-inter: ${inter.style.fontFamily};
    --primary: ${theme.colors.primary};
    --secondary: ${theme.colors.secondary};
    --background: ${theme.colors.background};
    --foreground: ${theme.colors.foreground};
    --muted: ${theme.colors.muted};
    --border: ${theme.colors.border};
    --error: ${theme.colors.error};

    --font-primary: ${theme.typography.fontFamily};
    --font-size-base: ${theme.typography.fontSize.base};
    --font-size-sm: ${theme.typography.fontSize.sm};
    --font-size-md: ${theme.typography.fontSize.md};
    --font-size-lg: ${theme.typography.fontSize.lg};

    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};
    --border-radius: ${theme.borderRadius.md};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    color: var(--foreground);
    background: var(--background);
    line-height: 1.6;
    overflow-x: hidden;
    transition:
      background 0.3s ease-in-out,
      color 0.3s ease-in-out;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    background: transparent;
    border: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }
`;
