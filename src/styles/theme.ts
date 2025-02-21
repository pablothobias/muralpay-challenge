import '@emotion/react';
import { borderRadius, colors, shadows, spacing, typography } from './variables';

export const lightTheme = {
  colors: {
    background: colors.background.light,
    foreground: colors.foreground.light,
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
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows,
};

export const darkTheme = {
  colors: {
    background: colors.background.dark,
    foreground: colors.foreground.dark,
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
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows,
};

export type ThemeType = typeof lightTheme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeType {}
}
