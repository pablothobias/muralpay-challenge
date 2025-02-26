import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { createSerializer } from '@emotion/jest';
import { configure } from '@testing-library/react';

jest.setTimeout(10000);

configure({
  asyncUtilTimeout: 5000,
  testIdAttribute: 'data-testid',
});

beforeEach(() => {
  document.title = '';

  const metaTags = document.querySelectorAll('meta');
  metaTags.forEach((tag) => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag);
    }
  });
});

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const originalConsole = {
  error: console.error,
  warn: console.warn,
};

const suppressedMessages = [
  'Invalid value used as weak map key',
  'Consider adding an error boundary',
  'The above error occurred in the <ThemeProvider>',
  'Warning: Render methods should be a pure function',
  'Warning: An update to Component inside a test was not wrapped in act',
  'Warning: Cannot update a component',
  'Warning: componentWillReceiveProps has been renamed',
  'Warning: ReactDOM.render is no longer supported',
];

const shouldSuppress = (message: unknown) => {
  return (
    typeof message === 'string' &&
    suppressedMessages.some((suppressedMessage) => message.includes(suppressedMessage))
  );
};

console.error = (...args: unknown[]) => {
  if (!shouldSuppress(args[0])) {
    originalConsole.error.apply(console, args);
  }
};

console.warn = (...args: unknown[]) => {
  if (!shouldSuppress(args[0])) {
    originalConsole.warn.apply(console, args);
  }
};

afterAll(() => {
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
});

expect.extend(matchers);
expect.addSnapshotSerializer(createSerializer());
