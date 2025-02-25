import { useState } from 'react';

export const ErrorTest = () => {
  const [shouldError] = useState(true);

  if (shouldError) {
    throw new Error('This is a test error to verify the ErrorBoundary component');
  }

  return <div>This text should not be visible</div>;
};
