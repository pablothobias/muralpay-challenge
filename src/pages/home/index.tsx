'use client';

import { HomeHero } from '@/components';
import { containerStyles } from '@/styles/pages/home/styles';
import withAuth from '@/utils/functions/withAuth';

const HomePageContainer = () => {
  return (
    <main css={containerStyles}>
      <HomeHero />
    </main>
  );
};

export default withAuth(HomePageContainer, { isPrivate: true, redirectTo: '/register' });
