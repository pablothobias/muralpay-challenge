import { Button } from '@/components';
import Link from 'next/link';
import { heroSectionStyles } from './styles';

interface HomeHeroProps {
  className?: string;
}

const HomeHero = ({ className }: HomeHeroProps) => {
  return (
    <section css={heroSectionStyles} className={className}>
      <div className="content">
        <h1>Welcome to Mural Pay</h1>
        <p>Your modern payment solution for seamless transactions</p>
        <div className="buttonGroup">
          <Link href="/organization/new">
            <Button variant="primary" size="large">
              Create New Organization
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="secondary" size="large">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
