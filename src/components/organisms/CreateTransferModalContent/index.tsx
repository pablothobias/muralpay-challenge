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

const CreateTransferModalContent = () => {
  const accountsStore = useAccountStore((state) => state);

  const { execute, loading, error } = useServiceOnAction(TransferService.create, []);

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

  const recipientTransferType = watch(`recipientsInfo.${selectedIndex}.recipientTransferType`);
  const isBlockchainSelected = recipientTransferType === RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN;
  const isFiatSelected = recipientTransferType === RECIPIENT_TRANSFER_TYPE.FIAT;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recipientsInfo',
  });

  const onSubmit = (data: TransferSchema) => execute(data);

  return (
    <>
      <h4 css={formTitleCss}>Create New Transfer</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span css={formGroupCss}>
          <Select
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
                    id={`phoneNumber`}
                    type="phone"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    error={errors.recipientsInfo?.[index]?.phoneNumber?.message}
                  />
                </span>
                <span css={formGroupCss}>
                  <Select
                    options={[
                      { value: RECIPIENT_TRANSFER_TYPE.FIAT, label: 'FIAT' },
                      { value: RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN, label: 'CRYPTO' },
                    ]}
                    placeholder="Select recipient transfer detail"
                    label="Recipient Transfer Detail"
                    {...register(`recipientsInfo.${index}.recipientTransferType`)}
                    error={errors.recipientsInfo?.[index]?.recipientTransferType?.message}
                  />
                </span>
                <span css={formGroupCss}>
                  <Select
                    options={[
                      { value: RECIPIENT_TYPE.INDIVIDUAL, label: 'Individual' },
                      { value: RECIPIENT_TYPE.BUSINESS, label: 'Business' },
                    ]}
                    placeholder="Select recipient type"
                    label="Recipient Type"
                    {...register(`recipientsInfo.${index}.recipientType`)}
                    error={errors.recipientsInfo?.[index]?.recipientType?.message}
                  />
                </span>
                {isFiatSelected && (
                  <>
                    <h4 css={formTitleCss}>Contact Details</h4>
                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.bankName`}
                        type="text"
                        label="Bank Name"
                        placeholder="Enter bank name"
                        {...register(`recipientsInfo.${index}.bankContactDetails.bankName`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.bankName?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.bankAccountOwnerName`}
                        type="text"
                        label="Bank Account Owner Name"
                        placeholder="Enter account owner name"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.bankAccountOwnerName`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.bankAccountOwnerName
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Select
                        placeholder="Select account type"
                        label="Account Type"
                        options={[
                          { value: ACC_TYPE.SAVINGS, label: 'SAVINGS' },
                          { value: ACC_TYPE.CHECKING, label: 'CHECKING' },
                        ]}
                        {...register(`recipientsInfo.${index}.bankContactDetails.accountType`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.accountType?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.bankAccountNumber`}
                        type="text"
                        label="Bank Account Number"
                        placeholder="Enter bank account number"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.bankAccountNumber`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.bankAccountNumber
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.bankRoutingNumber`}
                        type="text"
                        label="Bank Routing Number"
                        placeholder="Enter bank routing number"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.bankRoutingNumber`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.bankRoutingNumber
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.bankCode`}
                        type="text"
                        label="Bank Code"
                        placeholder="Enter bank code"
                        {...register(`recipientsInfo.${index}.bankContactDetails.bankCode`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.bankCode?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.documentNumber`}
                        type="text"
                        label="Document Number"
                        placeholder="Enter document number"
                        {...register(`recipientsInfo.${index}.bankContactDetails.documentNumber`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.documentNumber
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Select
                        options={[
                          { value: DOC_TYPE.NATIONAL_ID, label: 'National ID' },
                          { value: DOC_TYPE.PASSPORT, label: 'Passport' },
                          { value: DOC_TYPE.OTHER, label: 'Others' },
                        ]}
                        placeholder="Select document type"
                        label="Document Type"
                        {...register(`recipientsInfo.${index}.bankContactDetails.documentType`)}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.documentType?.message
                        }
                      />
                    </span>

                    <h4>Physical Address</h4>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.physicalAddress.address1`}
                        type="text"
                        label="Address 1"
                        placeholder="Enter address 1"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.physicalAddress.address1`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.physicalAddress
                            ?.address1?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.physicalAddress.address2`}
                        type="text"
                        label="Address 2"
                        placeholder="Enter address 2"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.physicalAddress.address2`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.physicalAddress
                            ?.address2?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.physicalAddress.country`}
                        type="text"
                        label="Country"
                        placeholder="Enter country"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.physicalAddress.country`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.physicalAddress
                            ?.country?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.physicalAddress.state`}
                        type="text"
                        label="State"
                        placeholder="Enter state"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.physicalAddress.state`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.physicalAddress?.state
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.physicalAddress.city`}
                        type="text"
                        label="City"
                        placeholder="Enter city"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.physicalAddress.city`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.physicalAddress?.city
                            ?.message
                        }
                      />
                    </span>

                    <span css={formGroupCss}>
                      <Input
                        id={`recipientsInfo.${index}.bankContactDetails.physicalAddress.zip`}
                        type="text"
                        label="Zip"
                        placeholder="Enter zip code"
                        {...register(
                          `recipientsInfo.${index}.bankContactDetails.physicalAddress.zip`,
                        )}
                        error={
                          errors.recipientsInfo?.[index]?.bankContactDetails?.physicalAddress?.zip
                            ?.message
                        }
                      />
                    </span>
                  </>
                )}

                {isBlockchainSelected && (
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
                currencyCode: 'USD',
                tokenAmount: 0,
                email: '',
                dateOfBirth: '',
                phoneNumber: '',
                recipientTransferType: 'BLOCKCHAIN',
                recipientType: 'INDIVIDUAL',
                bankContactDetails: {
                  bankName: '',
                  bankAccountOwnerName: '',
                  currencyCode: '',
                  accountType: 'CHECKING',
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
