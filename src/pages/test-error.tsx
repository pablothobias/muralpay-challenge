import { ErrorTest } from '@/components/test/ErrorTest';
import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';

export default function TestErrorPage() {
  return (
    <ErrorBoundary>
      <ErrorTest />
    </ErrorBoundary>
  );
}
