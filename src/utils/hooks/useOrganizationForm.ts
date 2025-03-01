import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { organizationSchema } from '@/features/organization/schemas';
import { type FormData, type FormDataByType } from '@/features/organization/types';
import { ORGANIZATION_TYPE } from '@/utils/constants';
import { useToast } from '@/utils/context/ToastContext';

type OrganizationTypeValue = keyof typeof ORGANIZATION_TYPE;

const getDefaultValues = (type: OrganizationTypeValue): FormDataByType[typeof type] => {
  const baseKycData = {
    email: '',
    phoneNumber: '',
    taxId: '',
    formationDate: '',
    nationality: '',
    physicalAddress: {
      address1: '',
      address2: null,
      country: '',
      state: '',
      city: '',
      zip: '',
    },
  } as const;

  return {
    organizationType: type,
    name: '',
    lastName: '',
    kycDelegatedData: {
      ...baseKycData,
      ...(type === ORGANIZATION_TYPE.BUSINESS ? { businessName: '' } : {}),
    },
  } as FormDataByType[typeof type];
};

export const useOrganizationForm = () => {
  const { showWarning } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, touchedFields },
    reset,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(organizationSchema),
    mode: 'onTouched',
    defaultValues: { organizationType: '' as OrganizationTypeValue },
  });

  const organizationType = watch('organizationType') as OrganizationTypeValue;
  const isIndividual = organizationType === ORGANIZATION_TYPE.INDIVIDUAL;

  const onOrganizationTypeChange = async (value: OrganizationTypeValue) => {
    reset(getDefaultValues(value), {
      keepDefaultValues: true,
      keepIsSubmitted: false,
      keepTouched: false,
      keepErrors: false,
    });

    if (value === ORGANIZATION_TYPE.INDIVIDUAL) {
      showWarning(
        'individualTypeNotSupported',
        'Individual organization type is not fully implemented due to API documentation issues. Some features may not work correctly.',
      );
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    control,
    errors,
    reset,
    setValue,
    trigger,
    organizationType,
    isIndividual,
    onOrganizationTypeChange,
    touchedFields,
  };
};
