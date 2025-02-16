import { HomeHero } from '@/components';
import { containerStyles } from '@/components/pages/home/styles';

export const metadata = {
  title: 'Mural Pay',
  description: 'Your modern payment solution for seamless transactions',
};

const HomePage = () => {
  return (
    <main css={containerStyles}>
      <HomeHero />
    </main>
  );
};

export default HomePage;
