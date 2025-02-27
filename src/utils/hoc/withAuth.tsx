import { useEffect } from 'react';

import { type NextPage } from 'next';
import { useRouter } from 'next/router';

import useAuthStore from '@/store/auth';

type UseAuthRedirectOptions = {
  isPrivate?: boolean;
  redirectTo?: string;
};
const withAuth = (
  Page: NextPage,
  { isPrivate = false, redirectTo = '/register' }: UseAuthRedirectOptions,
) => {
  const AuthenticatedComponent = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
      if (isPrivate && !isAuthenticated) {
        router.replace(redirectTo);
      }
    }, [isAuthenticated, router]);

    if (isPrivate && !isAuthenticated) return null;

    return <Page />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
