import { ReactNode } from 'react';
import Header from '@/components/molecules/Header';
import Footer from '@/components/molecules/Footer';
import { layoutStyles, mainStyles } from './styles';

interface LayoutProps {
  children: ReactNode;
}

const GlobalLayout = ({ children }: LayoutProps) => {
  return (
    <div css={layoutStyles}>
      <Header />
      <main css={mainStyles}>{children}</main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
