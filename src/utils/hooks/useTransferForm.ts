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
  const { setLoadingState, clearLoadingState, isLoading } = useLoading();
  const { createTransfer } = useTransferActions();
  const { refreshAccounts } = useAccountActions();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    const controller = new AbortController();

    const fetchAccounts = async () => {
      if (controller.signal.aborted) return;

      try {
        await refreshAccounts();
      } catch (error) {
        if (!controller.signal.aborted && error instanceof Error) {
          showError('fetchAccounts', error.message);
        }
      }
    };

    fetchAccounts();

    return () => {
      controller.abort();
      clearLoadingState('fetchAccounts');
    };
  }, []);

  const { control, ...methods } = useForm<TransferSchema>({
    resolver: zodResolver(transferSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'recipientsInfo',
    control,
  });

  const onSubmit = async (data: TransferSchema) => {
    console.log('4. Hook onSubmit called with data:', data);
    if (isLoading) return;

    try {
      setLoadingState('createTransfer', true);
      const response = await createTransfer(data);
      if (response) {
        showSuccess('success', 'Transfer created successfully!');
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      showError('error', 'Failed to create transfer');
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

  useEffect(() => {
    console.log('Form state:', methods.getValues());
  }, [methods]);

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
