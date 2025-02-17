import { Button, Card, Input } from '@/components';
import { useAuthStore } from '@/store/auth';
import { heroSectionStyles } from './styles';
import { Modal } from '@/components';
import { useState } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { AccountSchema } from '@/features/account/types';

interface HomeHeroProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any;
  register: UseFormRegister<AccountSchema>;
  errors: FieldErrors<AccountSchema>;
}

const HomeHero = ({
  className,
  handleSubmit,
  register,
  errors,
}: HomeHeroProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <section css={heroSectionStyles} className={className}>
      <Card>
        <h1>
          Welcome {user?.name ? <strong>{user.name}</strong> : ''} to Mural Pay
        </h1>
        <p>Your modern payment solution for seamless transactions</p>
        <div className="buttonGroup">
          <Button
            onClick={() => setIsOpen(true)}
            variant="primary"
            size="large"
          >
            Create new Account
          </Button>
        </div>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New Account"
        size="medium"
        footer={
          <>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="secondary" onClick={() => handleSubmit()}>
              Save
            </Button>
          </>
        }
      >
        <Input
          htmlFor="name"
          label="Name"
          type="text"
          placeholder="John"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          htmlFor="description"
          label="Description"
          type="text"
          placeholder="Description ..."
          {...register('description')}
          error={errors.description?.message}
        />
      </Modal>
    </section>
  );
};

export default HomeHero;
