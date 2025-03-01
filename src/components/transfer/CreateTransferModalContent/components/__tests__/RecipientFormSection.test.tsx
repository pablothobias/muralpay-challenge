import { zodResolver } from '@hookform/resolvers/zod';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';

import { useForm, UseFormReturn } from 'react-hook-form';

import { transferSchema } from '@/features/transfer/schemas';
import { TransferFormSchema } from '@/features/transfer/types';
import { renderWithProviders, TestProviders } from '@/utils/test/TestProviders';

import { RecipientFormSection } from '../RecipientFormSection';

describe('RecipientFormSection', () => {
  const renderComponent = () => {
    const formMethodsRef = {
      current: {} as UseFormReturn<TransferFormSchema>,
    };

    const FormComponent = () => {
      const methods = useForm<TransferFormSchema>({
        resolver: zodResolver(transferSchema),
        defaultValues: {
          payoutAccountId: '',
          recipientsInfo: [
            {
              recipientTransferType: 'FIAT',
              name: '',
              email: '',
              currencyCode: '',
              recipientType: '',
            },
          ],
        },
      });

      formMethodsRef.current = methods;

      return (
        <TestProviders>
          <RecipientFormSection
            index={0}
            register={methods.register}
            control={methods.control}
            errors={methods.formState.errors}
          />
        </TestProviders>
      );
    };

    const utils = renderWithProviders(<FormComponent />);

    return {
      ...utils,
      formMethods: formMethodsRef.current,
    };
  };

  it('renders recipient form fields correctly', () => {
    renderComponent();

    expect(screen.getByRole('textbox', { name: /^name$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^email$/i })).toBeInTheDocument();
    expect(screen.getByTestId('recipientsInfo.0.currencyCode')).toBeInTheDocument();
  });

  it('shows bank details when FIAT is selected', async () => {
    renderComponent();

    const transferTypeSelect = screen.getByLabelText(/transfer type/i);
    fireEvent.change(transferTypeSelect, { target: { value: 'FIAT' } });

    await waitFor(() => {
      expect(screen.getByLabelText(/bank name/i)).toBeInTheDocument();
    });
  });

  it('shows wallet details when BLOCKCHAIN is selected', async () => {
    renderComponent();

    const transferTypeSelect = screen.getByLabelText(/transfer type/i);
    fireEvent.change(transferTypeSelect, { target: { value: 'BLOCKCHAIN' } });

    await waitFor(() => {
      expect(screen.getByLabelText(/wallet address/i)).toBeInTheDocument();
    });
  });

  it('should show validation errors when fields are empty', async () => {
    const { formMethods } = renderComponent();

    await act(async () => {
      await formMethods.trigger();
    });

    await waitFor(() => {
      const nameInput = screen.getByRole('textbox', { name: /^name$/i });
      const emailInput = screen.getByRole('textbox', { name: /^email$/i });

      expect(nameInput.parentElement?.querySelector('p')?.textContent).toMatch(/name is required/i);
      expect(emailInput.parentElement?.querySelector('p')?.textContent).toMatch(
        /invalid email format/i,
      );
    });
  });
});
