import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { organizationSchema } from '@/features/organization/schemas';
import { type FormData, type FormDataByType } from '@/features/organization/types';
import { ORGANIZATION_TYPE } from '@/utils/constants';

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
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(organizationSchema),
    mode: 'onChange',
  });

  const organizationType = watch('organizationType') as OrganizationTypeValue;
  const isIndividual = organizationType === ORGANIZATION_TYPE.INDIVIDUAL;

  const onOrganizationTypeChange = async (value: OrganizationTypeValue) => {
    reset(getDefaultValues(value));
    await trigger();
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
  };
};
