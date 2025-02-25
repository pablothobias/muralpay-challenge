import { LoadingSpinner } from '@/shared-ui';
import RegisterPage from '@/components/register/RegisterPage';
import useAuthStore from '@/store/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

  return <RegisterPage />;
};

export default Register;
