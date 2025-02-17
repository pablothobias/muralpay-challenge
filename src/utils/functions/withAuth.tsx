import { useRouter } from 'next/router';
import { useEffect, ComponentType, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { LoadingSpinner } from '@/components';

interface AuthOptions {
  isPrivate?: boolean;
  redirectTo?: string;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType,
  { isPrivate = false, redirectTo = '/register' }: AuthOptions = {},
): ComponentType<P> => {
  function WithAuthWrapper(props: P) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
      setInitialized(true);
      if (isPrivate && initialized && !isAuthenticated) {
        router.replace(redirectTo);
      } else if (!isPrivate && initialized && isAuthenticated) {
        router.replace('/home');
      }
    }, [isAuthenticated, router, isPrivate, redirectTo, initialized]);

    if (!initialized || (isPrivate && !isAuthenticated))
      return <LoadingSpinner />;

    return <WrappedComponent {...props} />;
  }

  WithAuthWrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthWrapper;
};

export default withAuth;
