import { Global } from '@emotion/react';

import { ThemeProvider } from '@emotion/react';

import { render } from '@testing-library/react';
import { type ReactNode } from 'react';

import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';
import { globalStyles } from '@/styles';
import { darkTheme, lightTheme, ThemeType } from '@/styles/theme';
import { LoadingProvider } from '@/utils/context/LoadingContext';
import { ToastProvider } from '@/utils/context/ToastContext';

import { createMockStore } from './TestHelpers';

export const mockUseThemeStore = createMockStore(() => ({
  theme: lightTheme,
  setTheme: jest.fn<void, [ThemeType]>(),
}));

jest.mock('@/store/theme', () => ({
  __esModule: true,
  default: () => mockUseThemeStore.getState(),
}));

interface TestProvidersProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark';
}

export const TestProviders = ({ children, initialTheme = 'light' }: TestProvidersProps) => {
  const theme = initialTheme === 'light' ? lightTheme : darkTheme;
  mockUseThemeStore.setState({ theme });

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <ToastProvider>
            <Global styles={globalStyles} />
            {children}
          </ToastProvider>
        </LoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

type RenderOptions = {
  initialTheme?: 'light' | 'dark';
};

export const renderWithProviders = (ui: React.ReactElement, options: RenderOptions = {}) => {
  const { rerender, ...rest } = render(
    <TestProviders initialTheme={options.initialTheme || 'light'}>{ui}</TestProviders>,
  );

  return {
    ...rest,
    rerender: (newUi: React.ReactElement) =>
      rerender(
        <TestProviders initialTheme={options.initialTheme || 'light'}>{newUi}</TestProviders>,
      ),
  };
};

export * from '@testing-library/react';
export { renderWithProviders as render };
