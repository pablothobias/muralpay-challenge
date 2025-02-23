import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { TransferFormSchema } from '@/features/transfer/types';
import BankDetailsFields from './BankDetailsFields';
import { recipientsInfoContainerCss, formTitleCss } from '../styles';
import WalletDetailsFields from './WalletDetailsFields';
import RecipientInfoFields from './RecipientInfoFields';

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

  return (
    <div css={recipientsInfoContainerCss}>
      <h4 css={formTitleCss}>Recipient Information</h4>
      <RecipientInfoFields register={register} index={index} errors={errors} control={control} />

      {recipientTransferType === 'FIAT' && (
        <>
          <h4 css={formTitleCss}>Bank Details</h4>
          <BankDetailsFields register={register} index={index} errors={errors} control={control} />
        </>
      )}

      {recipientTransferType === 'BLOCKCHAIN' && (
        <>
          <h4 css={formTitleCss}>Wallet Details</h4>
          <WalletDetailsFields register={register} index={index} errors={errors} />
        </>
      )}
    </div>
  );
};
