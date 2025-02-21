import { ComponentType, ReactNode } from 'react';
import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';

interface WithErrorBoundaryOptions {
  fallback?: ReactNode;
}

export function withErrorBoundary<P extends object>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>,
  options: WithErrorBoundaryOptions = {},
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={options.fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
