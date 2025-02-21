import { Button, Icon, Input, LoadingSpinner } from '@/shared-ui';
import { type AccountSchema } from '@/features/account/types';
import dynamic from 'next/dynamic';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { sectionContainer, sectionHeader } from './styles';
import { useState } from 'react';

const AccountList = dynamic(() => import('@/components/accounts/AccountList'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const Modal = dynamic(() => import('@/shared-ui/molecules/Modal'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

type AccountsProps = {
  register: UseFormRegister<AccountSchema>;
  errors: FieldErrors<AccountSchema>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any;
};

const AccountsPage = ({ register, errors, handleSubmit }: AccountsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section css={sectionContainer}>
      <div css={sectionHeader}>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          <Icon name="user" />
          Create New Account
        </Button>
      </div>
      <AccountList />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New Account"
        size="medium"
        footer={
          <>
            <Button variant="warning" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => handleSubmit()}>
              Save
            </Button>
          </>
        }
      >
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="John"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          id="description"
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

export default AccountsPage;
