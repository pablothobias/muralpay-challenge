import NewCustomerPage from '@/components/pages/customer/new';
import { useCustomer } from '@/utils/hooks/useCustomer';
import {
  CustomerData,
  CustomerFormValues,
  customerSchema,
} from '@/features/customer/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@emotion/react';

const NewCustomerContainer = () => {
  const { createAccount, loading, error, account } = useCustomer();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (data: CustomerData) => {
    await createAccount(data);
  };
  return (
    <div>
      <NewCustomerPage
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        loading={loading}
        error={error}
        account={account}
        theme={theme}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: { value: true },
  };
};

export default NewCustomerContainer;
