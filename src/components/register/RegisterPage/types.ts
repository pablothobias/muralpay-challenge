import { type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import {
  type FormData,
  type BusinessFormData,
  type FormDataByType,
} from '@/features/organization/types';
import { type ORGANIZATION_TYPE } from '@/utils/constants';

export interface BaseFormFieldProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control?: Control<FormData>;
}

export type IndividualFormFieldProps = BaseFormFieldProps;

export interface BusinessFormFieldProps extends BaseFormFieldProps {
  errors: FieldErrors<BusinessFormData>;
}

export interface CommonFormFieldProps extends BaseFormFieldProps {
  organizationType: keyof typeof ORGANIZATION_TYPE;
}

export type FormFieldRegistration<T extends keyof FormDataByType> = {
  [K in keyof FormDataByType[T]]: ReturnType<UseFormRegister<FormData>>;
};
