import { Button } from '@/shared/index';
import Link from 'next/link';

interface HomeHeroProps {
  className?: string;
}

export const HomeHero = ({ className }: HomeHeroProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Mural Pay</h1>
        <p className="text-xl mb-8">
          Your modern payment solution for seamless transactions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/customer/new">
            <Button variant="primary" size="large">
              Create New Customer
            </Button>
          </Link>
          <Link href="/transfer">
            <Button variant="secondary" size="large">
              Make a Transfer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
