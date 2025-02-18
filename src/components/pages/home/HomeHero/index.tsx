import { LoadingSpinner } from '@/components';
import useAuthStore from '@/store/auth';
import { useTheme } from '@emotion/react';
import dynamic from 'next/dynamic';
import { heroSectionStyles } from './styles';

const Card = dynamic(() => import('@/components/atoms/Card'), {
  loading: () => <LoadingSpinner />,
});

const HomeHero = () => {
  const { user } = useAuthStore();
  const theme = useTheme();

  return (
    <section css={heroSectionStyles(theme)}>
      <Card>
        <h1>Welcome {user?.name ? <strong>{user.name}</strong> : ''} to Mural Pay</h1>
        <p>Your modern payment solution for seamless transactions</p>
      </Card>
    </section>
  );
};

export default HomeHero;
