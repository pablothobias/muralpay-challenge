import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { Global, ThemeProvider } from '@emotion/react';
import { LoadingProvider } from '@/utils/context/LoadingContext';
import { ThemeType } from '@/styles/theme';
import { borderRadius, colors, shadows, spacing, typography } from '@/styles/variables';
import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';
import { ToggleThemeProvider } from './toggleThemeContext';
import { ToastProvider } from './ToastContext';
import { GlobalLayout } from '@/shared-ui';

type CustomRenderOptions = {
  withLoading?: boolean;
  withTheme?: boolean;
} & Omit<RenderOptions, 'wrapper'>;

jest.mock('@emotion/react', () => ({
  __esModule: true,
  css: jest.fn((styles) => styles),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: jest.fn((theme) => theme),
}));

const mockTheme: ThemeType = {
  colors: {
    background: colors.background.dark,
    invertedLight: colors.invertedLight.light,
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
    foregroundPrimary: colors.foregroundPrimary.dark,
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows.dark,
};

const TestProviders: React.FC<{
  children: React.ReactNode;
  withLoading: boolean;
  withTheme: boolean;
}> = ({ children, withLoading, withTheme }) => {
  const content = withLoading ? <LoadingProvider>{children}</LoadingProvider> : children;

  return withTheme ? (
    <ErrorBoundary>
      <ToggleThemeProvider>
        <ThemeProvider theme={mockTheme}>
          <LoadingProvider>
            <ToastProvider>
              <Global styles={{}} />
              <GlobalLayout>{content}</GlobalLayout>
            </ToastProvider>
          </LoadingProvider>
        </ThemeProvider>
      </ToggleThemeProvider>
    </ErrorBoundary>
  ) : (
    content
  );
};

function customRender(
  ui: React.ReactElement,
  { withLoading = true, withTheme = true, ...options }: CustomRenderOptions = {},
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <TestProviders withLoading={withLoading} withTheme={withTheme}>
      {children}
    </TestProviders>
  );

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
    mockTheme,
  };
}

export * from '@testing-library/react';
export { customRender as render };
