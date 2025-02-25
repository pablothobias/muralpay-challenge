import '@emotion/react';
import { borderRadius, breakpoints, colors, shadows, spacing, typography } from './variables';

export const lightTheme = {
  colors: {
    white: colors.white.light,
    background: colors.background.light,
    foreground: colors.foreground.light,
    invertedLight: colors.invertedLight.light,
    primary: colors.primary.light,
    secondary: colors.secondary.light,
    accent: colors.accent,
    muted: colors.muted.light,
    border: colors.border.light,
    error: colors.error.light,
    warning: colors.warning.light,
    success: colors.success.light,
    info: colors.info.light,
    neutral: colors.neutral,
    foregroundPrimary: colors.foregroundPrimary.light,
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows.light,
  breakpoints,
};

export const darkTheme = {
  colors: {
    white: colors.white.light,
    background: colors.background.dark,
    foreground: colors.foreground.dark,
    invertedLight: colors.invertedLight.dark,
    primary: colors.primary.dark,
    secondary: colors.secondary.dark,
    accent: colors.accent,
    muted: colors.muted.dark,
    border: colors.border.dark,
    error: colors.error.dark,
    warning: colors.warning.dark,
    success: colors.success.dark,
    info: colors.info.dark,
    neutral: colors.neutral,
    foregroundPrimary: colors.foregroundPrimary.dark,
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows.dark,
  breakpoints,
};

export type ThemeType = typeof lightTheme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeType {}
}
