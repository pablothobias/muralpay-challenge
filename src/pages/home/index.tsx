import { HomeHero } from '@/components/pages/home/HomeHero';
import { containerStyles } from '@/components/pages/home';

const HomePage = () => {
  return (
    <main css={containerStyles}>
      <HomeHero />
    </main>
  );
};

export default HomePage;
