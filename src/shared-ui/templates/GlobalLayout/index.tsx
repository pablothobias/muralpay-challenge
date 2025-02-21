import Footer from '@/shared-ui/molecules/Footer';
import Header from '@/shared-ui/molecules/Header';
import { ReactNode } from 'react';
import { layoutStyles, mainStyles } from './styles';

type LayoutProps = {
  children: ReactNode;
};

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
