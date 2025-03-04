import dynamic from 'next/dynamic';
import { useState } from 'react';

import { type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { type AccountSchema } from '@/features/account/types';
import { Button, Icon, Input } from '@/shared-ui';

import { useAccountActions } from '@/store/account/hooks';

import { useToast } from '@/utils/context/ToastContext';

import { sectionContainer, sectionHeader } from './styles';

const AccountList = dynamic(() => import('@/components/accounts/AccountList'), {
  ssr: false,
  loading: () => null,
});
const Modal = dynamic(() => import('@/shared-ui/molecules/Modal'), {
  ssr: false,
  loading: () => null,
});

type AccountsProps = {
  register: UseFormRegister<AccountSchema>;
  errors: FieldErrors<AccountSchema>;
  handleSubmit: (
    onValid: (data: AccountSchema) => void,
  ) => (event?: React.BaseSyntheticEvent) => void;
  control: Control<AccountSchema>;
};

const AccountsPage = ({ register, errors, handleSubmit, control }: AccountsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { createAccount } = useAccountActions();
  const { showSuccess, showError } = useToast();

  const handleCreateAccount = async (data: AccountSchema) => {
    try {
      const controller = new AbortController();
      const response = await createAccount(data, controller.signal);
      setIsOpen(false);
      if (response) showSuccess('account', 'Account created successfully!');
    } catch (error) {
      showError('account', (error as Error).message || 'Failed to create account');
    } finally {
      control._reset();
    }
  };

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
            <Button variant="success" onClick={handleSubmit(handleCreateAccount)}>
              Save
            </Button>
          </>
        }
      >
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="John Doe..."
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
