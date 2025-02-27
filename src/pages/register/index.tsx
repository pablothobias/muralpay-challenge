import { Suspense, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { LoadingSpinner } from '@/shared-ui';
import useAuthStore from '@/store/auth';

const RegisterPage = dynamic(() => import('@/components/register/RegisterPage'), {
  ssr: true,
  loading: () => null,
});

const Register = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterPage />
    </Suspense>
  );
};

export default Register;
