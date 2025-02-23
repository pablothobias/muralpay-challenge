import Footer from '@/shared-ui/molecules/Footer';
import Header from '@/shared-ui/molecules/Header';
import { ReactNode } from 'react';
import { layoutStyles, mainStyles } from './styles';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/shared-ui/atoms/LoadingSpinner';
import { ResponsiveProvider } from '@/utils/context/ResponsiveContext';

type LayoutProps = {
  children: ReactNode;
};

const BackgroundAnimation = dynamic(() => import('@/shared-ui/molecules/BackgroundAnimation'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const GlobalLayout = ({ children }: LayoutProps) => {
  return (
    <ResponsiveProvider>
      <div css={layoutStyles}>
        <Header />
        <BackgroundAnimation />
        <main css={mainStyles}>{children}</main>
        <Footer />
      </div>
    </ResponsiveProvider>
  );
};

export default GlobalLayout;
