import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';
import { ErrorTest } from '@/components/test/ErrorTest';

export default function TestErrorPage() {
  return (
    <ErrorBoundary>
      <ErrorTest />
    </ErrorBoundary>
  );
}
