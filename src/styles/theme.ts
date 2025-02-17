import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from './variables';
import '@emotion/react';

export const lightTheme = {
  colors: {
    background: colors.white,
    foreground: colors.foreground,
    primary: colors.primary,
    secondary: colors.secondary,
    muted: colors.muted,
    border: colors.border,
    error: colors.error,
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows.primary,
};

export const darkTheme = {
  colors: {
    background: colors.dark.background,
    foreground: colors.dark.foreground,
    primary: colors.white,
    secondary: colors.secondary,
    muted: colors.dark.muted,
    border: colors.dark.border,
    error: colors.error,
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows.black,
};

export type ThemeType = typeof lightTheme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeType {}
}
