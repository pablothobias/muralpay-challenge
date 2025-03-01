import { useTheme } from '@emotion/react';
import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';

import { TransferFormSchema } from '@/features/transfer/types';

import BankDetailsFields from './BankDetailsFields';
import { recipientsInfoContainerCss, formTitleCss } from '../styles';
import RecipientInfoFields from './RecipientInfoFields';
import WalletDetailsFields from './WalletDetailsFields';

type RecipientFormSectionProps = {
  register: UseFormRegister<TransferFormSchema>;
  errors: FieldErrors<TransferFormSchema>;
  index: number;
  control: Control<TransferFormSchema>;
};

export const RecipientFormSection = ({
  register,
  errors,
  index,
  control,
}: RecipientFormSectionProps) => {
  const recipientTransferType = useWatch({
    control,
    name: `recipientsInfo.${index}.recipientTransferType`,
  }) as 'FIAT' | 'BLOCKCHAIN' | undefined;

  const theme = useTheme();

  return (
    <div css={recipientsInfoContainerCss(theme)}>
      <h4 css={formTitleCss(theme)}>Recipient Information</h4>
      <RecipientInfoFields register={register} index={index} errors={errors} control={control} />

      {recipientTransferType === 'FIAT' && (
        <>
          <h4 css={formTitleCss(theme)}>Bank Details</h4>
          <BankDetailsFields register={register} index={index} errors={errors} control={control} />
        </>
      )}

      {recipientTransferType === 'BLOCKCHAIN' && (
        <div css={recipientsInfoContainerCss(theme)}>
          <h4 css={formTitleCss(theme)}>Wallet Details</h4>
          <WalletDetailsFields register={register} index={index} errors={errors} />
        </div>
      )}
    </div>
  );
};
