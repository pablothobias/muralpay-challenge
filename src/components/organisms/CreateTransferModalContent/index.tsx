import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import MaskInput from '@/components/atoms/MaskInput';
import Select from '@/components/atoms/Select';
import { type AccountResponse } from '@/features/account/types';
import { transferSchema } from '@/features/transfer/schemas';
import TransferService from '@/features/transfer/services';
import type { TransferSchema } from '@/features/transfer/types';
import useAccountStore from '@/store/account';
import {
  ACC_TYPE,
  BLOCKCHAIN,
  CURRENCY,
  currencyFlags,
  DOC_TYPE,
  RECIPIENT_TRANSFER_TYPE,
  RECIPIENT_TYPE,
} from '@/utils/functions/formatCurrency';
import { useServiceOnAction } from '@/utils/hooks/useServiceOnAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ctaContainerCss, formGroupCss, formTitleCss, recipientsInfoContainerCss } from './styles';

type CreateTransferModalContentProps = {
  setModalOpen: (bool: boolean) => void;
  refreshTransfers?: () => Promise<void>;
};

const CreateTransferModalContent = ({
  setModalOpen,
  refreshTransfers,
}: CreateTransferModalContentProps) => {
  const accountsStore = useAccountStore((state) => state);

  const { execute, loading, error } = useServiceOnAction(TransferService.create);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => () => setSelectedIndex(-1), []);

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
    }
  }, [error]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransferSchema>({ resolver: zodResolver(transferSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recipientsInfo',
  });

  const onSubmit = (data: TransferSchema) => {
    try {
      execute(data);
      toast.success('Transfer created successfully!', {
        position: 'top-right',
      });
      refreshTransfers?.();
      setModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message, {
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <h4 css={formTitleCss}>Create New Transfer</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span css={formGroupCss}>
          <Select
            id="payoutAccountId"
            label="Account"
            placeholder="Select an account"
            options={accountsStore.accounts.map((account: AccountResponse) => ({
              value: account.id,
              label: `${account.name} ${account.address}`,
            }))}
            {...register('payoutAccountId')}
            error={errors.payoutAccountId?.message}
          />
        </span>

        <span css={formGroupCss}>
          <Input
            id="memo"
            type="text"
            label="Memo"
            placeholder="Enter memo"
            {...register('memo')}
            error={errors.memo?.message}
          />
        </span>

        {selectedIndex >= 0 && (
          <div css={recipientsInfoContainerCss}>
            {fields.map((field, index) => (
              <div key={field.id}>
                <h4 css={formTitleCss}>Recipients Information</h4>

                <span css={formGroupCss}>
                  <Input
                    id={`recipientsInfo.${index}.name`}
                    type="text"
                    label="Recipient Name"
                    placeholder="Enter recipient name"
                    {...register(`recipientsInfo.${index}.name`)}
                    error={errors.recipientsInfo?.[index]?.name?.message}
                  />
                </span>

                <span css={formGroupCss}>
                  <Select
                    id={`recipientsInfo.${index}.currencyCode`}
                    options={[
                      { value: CURRENCY.COP, label: `COP ${currencyFlags.COP}` },
                      { value: CURRENCY.USD, label: `USD ${currencyFlags.USD}` },
                      { value: CURRENCY.EUR, label: `EUR ${currencyFlags.EUR}` },
                    ]}
                    placeholder="Select currency"
                    label="Currency Code"
                    {...register(`recipientsInfo.${index}.currencyCode`)}
                    error={errors.recipientsInfo?.[index]?.currencyCode?.message}
                  />
                </span>

                <span css={formGroupCss}>
                  <MaskInput<TransferSchema>
                    control={control}
                    name={`recipientsInfo.${index}.tokenAmount`}
                    type="currency"
                    label="Token Amount"
                    placeholder="Enter Token Amount"
                    error={errors.recipientsInfo?.[index]?.tokenAmount?.message}
                  />
                </span>
                <span css={formGroupCss}>
                  <Input
                    id={`recipientsInfo.${index}.email`}
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    {...register(`recipientsInfo.${index}.email`)}
                    error={errors.recipientsInfo?.[index]?.email?.message}
                  />
                </span>
                <span css={formGroupCss}>
                  <Input
                    id={`recipientsInfo.${index}.dateOfBirth`}
                    type="date"
                    label="Date Of Birth"
                    {...register(`recipientsInfo.${index}.dateOfBirth`)}
                    error={errors.recipientsInfo?.[index]?.dateOfBirth?.message}
                  />
                </span>

                <span css={formGroupCss}>
                  <MaskInput<TransferSchema>
                    control={control}
                    name={`recipientsInfo.${index}.phoneNumber`}
                    type="phone"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    error={errors.recipientsInfo?.[index]?.phoneNumber?.message}
                  />
                </span>
                <span css={formGroupCss}>
                  <Select
                    id={`recipientsInfo.${index}.recipientTransferType`}
                    placeholder="Select recipient transfer detail"
                    label="Recipient Transfer Detail"
                    options={[
                      { value: RECIPIENT_TRANSFER_TYPE.FIAT, label: 'FIAT' },
                      { value: RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN, label: 'CRYPTO' },
                    ]}
                    {...register(`recipientsInfo.${index}.recipientTransferType`)}
                    error={errors.recipientsInfo?.[index]?.recipientTransferType?.message}
                  />
                </span>
                <span css={formGroupCss}>
                  <Select
                    id={`recipientsInfo.${index}.recipientType`}
                    placeholder="Select recipient type"
                    label="Recipient Type"
                    options={[
                      { value: RECIPIENT_TYPE.INDIVIDUAL, label: 'Individual' },
                      { value: RECIPIENT_TYPE.BUSINESS, label: 'Business' },
                    ]}
                    {...register(`recipientsInfo.${index}.recipientType`)}
                    error={errors.recipientsInfo?.[index]?.recipientType?.message}
                  />
                </span>
                {watch(`recipientsInfo.${index}.recipientTransferType`) ===
                  RECIPIENT_TRANSFER_TYPE.FIAT && (
                  <>
                    <h4 css={formTitleCss}>Contact Details</h4>
                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.bankName`}
                        type="text"
                        label="Bank Name"
                        placeholder="Enter bank name"
                        {...register(`recipientsInfo.${index}.bankDetails.bankName`)}
                        error={errors.recipientsInfo?.[index]?.bankDetails?.bankName?.message}
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.bankAccountOwnerName`}
                        type="text"
                        label="Bank Account Owner Name"
                        placeholder="Enter account owner name"
                        {...register(`recipientsInfo.${index}.bankDetails.bankAccountOwnerName`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.bankAccountOwnerName?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Select
                        id={`recipientsInfo.${index}.bankDetails.accountType`}
                        placeholder="Select account type"
                        label="Account Type"
                        options={[
                          { value: ACC_TYPE.SAVINGS, label: 'SAVINGS' },
                          { value: ACC_TYPE.CHECKING, label: 'CHECKING' },
                        ]}
                        {...register(`recipientsInfo.${index}.bankDetails.accountType`)}
                        error={errors.recipientsInfo?.[index]?.bankDetails?.accountType?.message}
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.bankAccountNumber`}
                        type="text"
                        label="Bank Account Number"
                        placeholder="Enter bank account number"
                        {...register(`recipientsInfo.${index}.bankDetails.bankAccountNumber`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.bankAccountNumber?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.bankRoutingNumber`}
                        type="text"
                        label="Bank Routing Number"
                        placeholder="Enter bank routing number"
                        {...register(`recipientsInfo.${index}.bankDetails.bankRoutingNumber`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.bankRoutingNumber?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.bankCode`}
                        type="text"
                        label="Bank Code"
                        placeholder="Enter bank code"
                        {...register(`recipientsInfo.${index}.bankDetails.bankCode`)}
                        error={errors.recipientsInfo?.[index]?.bankDetails?.bankCode?.message}
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.documentNumber`}
                        type="text"
                        label="Document Number"
                        placeholder="Enter document number"
                        {...register(`recipientsInfo.${index}.bankDetails.documentNumber`)}
                        error={errors.recipientsInfo?.[index]?.bankDetails?.documentNumber?.message}
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Select
                        id={`recipientsInfo.${index}.bankDetails.documentType`}
                        options={[
                          { value: DOC_TYPE.NATIONAL_ID, label: 'National ID' },
                          { value: DOC_TYPE.PASSPORT, label: 'Passport' },
                          { value: DOC_TYPE.OTHER, label: 'Others' },
                        ]}
                        placeholder="Select document type"
                        label="Document Type"
                        {...register(`recipientsInfo.${index}.bankDetails.documentType`)}
                        error={errors.recipientsInfo?.[index]?.bankDetails?.documentType?.message}
                      />
                    </span>

                    <h4>Physical Address</h4>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.physicalAddress.address1`}
                        type="text"
                        label="Address 1"
                        placeholder="Enter address 1"
                        {...register(
                          `recipientsInfo.${index}.bankDetails.physicalAddress.address1`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.physicalAddress?.address1
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.physicalAddress.address2`}
                        type="text"
                        label="Address 2"
                        placeholder="Enter address 2"
                        {...register(
                          `recipientsInfo.${index}.bankDetails.physicalAddress.address2`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.physicalAddress?.address2
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.physicalAddress.country`}
                        type="text"
                        label="Country"
                        placeholder="Enter country"
                        {...register(`recipientsInfo.${index}.bankDetails.physicalAddress.country`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.physicalAddress?.country
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.physicalAddress.state`}
                        type="text"
                        label="State"
                        placeholder="Enter state"
                        {...register(`recipientsInfo.${index}.bankDetails.physicalAddress.state`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.physicalAddress?.state
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.physicalAddress.city`}
                        type="text"
                        label="City"
                        placeholder="Enter city"
                        {...register(`recipientsInfo.${index}.bankDetails.physicalAddress.city`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.physicalAddress?.city
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankDetails.physicalAddress.zip`}
                        type="text"
                        label="Zip"
                        placeholder="Enter zip code"
                        {...register(`recipientsInfo.${index}.bankDetails.physicalAddress.zip`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankDetails?.physicalAddress?.zip?.message
                        }
                      />
                    </span>
                  </>
                )}
                {watch(`recipientsInfo.${index}.recipientTransferType`) ===
                  RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN && (
                  <>
                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.walletDetails.walletAddress`}
                        type="text"
                        label="Wallet Address"
                        placeholder="Enter wallet address"
                        {...register(`recipientsInfo.${index}.walletDetails.walletAddress`)}
                        error={
                          errors.recipientsInfo?.[index]?.walletDetails?.walletAddress?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Select
                        id={`recipientsInfo.${index}.walletDetails.blockchain`}
                        options={[
                          { value: BLOCKCHAIN.POLYGON, label: 'Polygon' },
                          { value: BLOCKCHAIN.ETHEREUM, label: 'Ethereum' },
                          { value: BLOCKCHAIN.BASE, label: 'Base' },
                          { value: BLOCKCHAIN.CELO, label: 'Celo' },
                        ]}
                        placeholder="Select blockchain"
                        label="Blockchain"
                        {...register(`recipientsInfo.${index}.walletDetails.blockchain`)}
                        error={errors.recipientsInfo?.[index]?.walletDetails?.blockchain?.message}
                      />
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        <div css={ctaContainerCss}>
          <Button
            disabled={loading}
            type="button"
            variant="secondary"
            icon={<Icon name="plus" size={15} />}
            onClick={() => {
              if (selectedIndex >= 0) setSelectedIndex(selectedIndex + 1);
              else setSelectedIndex(0);

              append({
                name: '',
                currencyCode: 'COP',
                tokenAmount: 0,
                email: '',
                dateOfBirth: '',
                phoneNumber: '',
                recipientTransferType: 'BLOCKCHAIN',
                recipientType: 'INDIVIDUAL',
                bankDetails: {
                  bankName: '',
                  bankAccountOwnerName: '',
                  currencyCode: 'COP',
                  accountType: 'SAVINGS',
                  bankAccountNumber: '',
                  bankRoutingNumber: '',
                  bankCode: '',
                  documentNumber: '',
                  documentType: 'NATIONAL_ID',
                  physicalAddress: {
                    address1: '',
                    address2: '',
                    country: '',
                    state: '',
                    city: '',
                    zip: '',
                  },
                },
                walletDetails: {
                  walletAddress: '',
                  blockchain: 'POLYGON',
                },
              });
            }}
          >
            Add Recipient
          </Button>
          <Button
            disabled={loading}
            icon={<Icon name="play" size={15} />}
            type="submit"
            variant="success"
          >
            Create Transfer
          </Button>
          {selectedIndex >= 0 && (
            <Button
              disabled={loading}
              type="button"
              variant="danger"
              icon={<Icon name="trash" size={15} />}
              onClick={() => {
                if (selectedIndex >= 0)
                  setSelectedIndex((index) => {
                    remove(selectedIndex);
                    return index - 1;
                  });
              }}
            >
              Remove Recipient
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateTransferModalContent;
