import { LoadingSpinner } from '@/components';
import useAuthStore from '@/store/auth';
import { useRouter } from 'next/router';
import { type ComponentType, useEffect } from 'react';

type UseAuthRedirectOptions = {
  isPrivate?: boolean;
  redirectTo?: string;
};

const withAuth = (
  Component: ComponentType,
  { isPrivate = false, redirectTo = '/register' }: UseAuthRedirectOptions,
) => {
  const AuthenticatedComponent = () => {
    const isAuthenticated = useAuthStore((state) => state);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && isPrivate) {
        router.replace(redirectTo);
      }
    }, [isAuthenticated, router]);

    return !!isAuthenticated ? <Component /> : <LoadingSpinner />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
