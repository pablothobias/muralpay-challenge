// src/styles/theme.ts
import { colors, typography, spacing, borderRadius } from './variables';
import '@emotion/react'; // Import Emotion's default Theme type

export const lightTheme = {
  colors: {
    background: colors.background,
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
};

export const darkTheme: ThemeType = {
  colors: {
    background: colors.dark.background,
    foreground: colors.dark.foreground,
    primary: colors.primary,
    secondary: colors.secondary,
    muted: colors.dark.muted,
    border: colors.dark.border,
    error: colors.error,
  },
  typography,
  spacing,
  borderRadius,
};

export type ThemeType = typeof lightTheme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeType {}
}
