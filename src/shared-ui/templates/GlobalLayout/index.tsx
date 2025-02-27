import { ReactNode, Suspense } from 'react';

import dynamic from 'next/dynamic';

import Footer from '@/shared-ui/molecules/Footer';
import Header from '@/shared-ui/molecules/Header';
import { ResponsiveProvider } from '@/utils/context/ResponsiveContext';

import { layoutStyles, mainStyles } from './styles';

type LayoutProps = {
  children: ReactNode;
};

const BackgroundAnimation = dynamic(() => import('@/shared-ui/molecules/BackgroundAnimation'), {
  ssr: false,
  loading: () => null,
});

const GlobalLayout = ({ children }: LayoutProps) => {
  return (
    <ResponsiveProvider>
      <div css={layoutStyles}>
        <Header />
        <main css={mainStyles}>{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <BackgroundAnimation />
        </Suspense>
      </div>
    </ResponsiveProvider>
  );
};

export default GlobalLayout;
