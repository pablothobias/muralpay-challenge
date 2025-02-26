import { useTheme } from '@emotion/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { TransferFormSchema, BlockchainRecipient } from '@/features/transfer/types';
import { Input, Select } from '@/shared-ui';
import { BLOCKCHAIN } from '@/utils/constants';

import { formGroupCss } from './styles';

type FormFieldProps = {
  register: UseFormRegister<TransferFormSchema>;
  index: number;
  errors: FieldErrors<TransferFormSchema>;
};

type BlockchainRecipientErrors = {
  recipientTransferType?: { message?: string };
  walletDetails?: {
    [K in keyof BlockchainRecipient['walletDetails']]?: {
      message?: string;
    };
  };
};

const blockchainOptions = [
  { value: BLOCKCHAIN.POLYGON, label: 'Polygon' },
  { value: BLOCKCHAIN.ETHEREUM, label: 'Ethereum' },
  { value: BLOCKCHAIN.BASE, label: 'Base' },
  { value: BLOCKCHAIN.CELO, label: 'Celo' },
];

const WalletDetailsFields = ({ register, index, errors }: FormFieldProps) => {
  const theme = useTheme();

  const getFieldError = (field: keyof BlockchainRecipient['walletDetails']) => {
    const recipientErrors = errors.recipientsInfo?.[index] as BlockchainRecipientErrors | undefined;
    if (!recipientErrors?.walletDetails) return undefined;
    return recipientErrors.walletDetails[field]?.message;
  };

  return (
    <div>
      <span css={formGroupCss(theme)}>
        <Input
          id={`recipientsInfo.${index}.walletDetails.walletAddress`}
          placeholder="Wallet address"
          label="Wallet Address"
          {...register(`recipientsInfo.${index}.walletDetails.walletAddress`)}
          error={getFieldError('walletAddress')}
        />
      </span>

      <span css={formGroupCss(theme)}>
        <Select
          id={`recipientsInfo.${index}.walletDetails.blockchain`}
          placeholder="Select blockchain"
          label="Blockchain"
          options={blockchainOptions}
          {...register(`recipientsInfo.${index}.walletDetails.blockchain`)}
          error={getFieldError('blockchain')}
        />
      </span>
    </div>
  );
};

export default WalletDetailsFields;
