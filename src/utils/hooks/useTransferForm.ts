import { TransferSchema } from '@/features/transfer/types';
import { transferSchema } from '@/features/transfer/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  useFieldArray,
  UseFormReturn,
  FieldArrayWithId,
  SubmitHandler,
} from 'react-hook-form';
import { useLoading } from '@/utils/context/LoadingContext';
import { useEffect, useState } from 'react';
import { useTransferActions } from '@/store/transfer/hooks';
import { useAccountActions } from '@/store/account/hooks';
import { useToast } from '@/utils/context/ToastContext';

type RecipientInfo = TransferSchema['recipientsInfo'][number];
type FieldArrayFields = FieldArrayWithId<TransferSchema, 'recipientsInfo', 'id'>[];
type FormType = UseFormReturn<TransferSchema>;

interface UseTransferFormReturn {
  fields: FieldArrayFields;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  handleSubmit: (
    onValid: SubmitHandler<TransferSchema>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleAddRecipient: () => void;
  handleRemoveRecipient: (index: number) => void;
  isLoading: boolean;
  remove: (index: number) => void;
  onSubmit: SubmitHandler<TransferSchema>;
  errors: FormType['formState']['errors'];
  watch: FormType['watch'];
  control: FormType['control'];
  register: FormType['register'];
}

const recipientInfoToAppend: RecipientInfo = {
  recipientTransferType: '' as 'BLOCKCHAIN' | 'FIAT',
  recipientType: '',
  name: '',
  email: '',
  dateOfBirth: '',
  phoneNumber: '',
  currencyCode: '',
  tokenAmount: 0,
  bankDetails: {
    bankName: '',
    bankAccountOwnerName: '',
    currencyCode: '',
    accountType: '',
    bankAccountNumber: '',
    bankRoutingNumber: '',
    bankCode: '',
    documentNumber: '',
    documentType: '',
    physicalAddress: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      zip: '',
    },
  },
  walletDetails: {
    walletAddress: '',
    blockchain: '',
  },
};

export const useTransferForm = (onSuccess: () => void): UseTransferFormReturn => {
  const { setLoadingState, isLoading } = useLoading();
  const { showError, showSuccess } = useToast();
  const { createTransfer } = useTransferActions();
  const { refreshAccounts } = useAccountActions();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const controller = new AbortController();
    if (isLoading || controller.signal.aborted) return;

    function fetchAccounts() {
      if (isLoading || controller.signal.aborted) return;
      try {
        setLoadingState('refreshAccounts', true);
        refreshAccounts(controller.signal);
      } catch (error) {
        showError('refreshAccounts', (error as Error).message);
      } finally {
        setLoadingState('refreshAccounts', false);
      }
    }

    fetchAccounts();

    return () => controller.abort();
  }, []);

  const { control, ...methods } = useForm<TransferSchema>({
    resolver: zodResolver(transferSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'recipientsInfo',
    control,
  });

  const onSubmit = async (data: TransferSchema) => {
    if (isLoading) return;

    try {
      setLoadingState('createTransfer', true);
      const response = await createTransfer(data);
      if (response) {
        showSuccess('success', 'Transfer created successfully!');
        onSuccess();
      }
    } catch (error) {
      showError('transferForm', (error as Error).message);
    } finally {
      setLoadingState('createTransfer', false);
    }
  };

  const handleAddRecipient = () => {
    append(recipientInfoToAppend);
    setSelectedIndex((index) => index + 1);
  };

  const handleRemoveRecipient = (index: number) => {
    if (selectedIndex < 0) return;

    setSelectedIndex((index) => index - 1);
    remove(index);
  };

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = methods;

  return {
    fields,
    selectedIndex,
    setSelectedIndex,
    handleAddRecipient,
    handleRemoveRecipient,
    remove,
    isLoading,
    errors,
    control,
    handleSubmit,
    watch,
    register,
    onSubmit,
  };
};
