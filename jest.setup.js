import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { createSerializer } from '@emotion/jest';

expect.extend(matchers);
expect.addSnapshotSerializer(createSerializer());

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

// Suppress specific console errors
const originalError = console.error;
console.error = (...args) => {
  const suppressedErrors = [
    'Invalid value used as weak map key',
    'Consider adding an error boundary',
    'The above error occurred in the <ThemeProvider>',
  ];

  if (typeof args[0] === 'string' && suppressedErrors.some((error) => args[0].includes(error))) {
    return;
  }

  originalError.call(console, ...args);
};

// Configure Emotion
global.___loader = {
  enqueue: jest.fn(),
};
