import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';
import { ErrorTest } from '@/utils/test/ErrorTest';

export default function TestErrorPage() {
  return (
    <ErrorBoundary>
      <ErrorTest />
    </ErrorBoundary>
  );
}
