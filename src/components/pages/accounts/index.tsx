import { Button, Icon, Input, LoadingSpinner } from '@/components';
import { type AccountResponseArray, type AccountSchema } from '@/features/account/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { sectionContainer, sectionHeader } from './styles';

const AccountList = dynamic(() => import('@/components/pages/accounts/AccountList'), {
  loading: () => <LoadingSpinner />,
});
const Modal = dynamic(() => import('@/components/molecules/Modal'), {
  loading: () => <LoadingSpinner />,
});

type AccountsProps = {
  accounts?: AccountResponseArray;
  register: UseFormRegister<AccountSchema>;
  errors: FieldErrors<AccountSchema>;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any;
};

const AccountsPage = ({ accounts, loading, register, errors, handleSubmit }: AccountsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section css={sectionContainer}>
      <div css={sectionHeader}>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          <Icon name="user" />
          Create New Account
        </Button>
      </div>
      <AccountList loading={loading} accounts={accounts!} />
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
          label="Name"
          type="text"
          placeholder="John"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
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
