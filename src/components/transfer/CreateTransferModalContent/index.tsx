import { useTheme } from '@emotion/react';

import { AccountResponse } from '@/features/account/types';
import { TransferSchema } from '@/features/transfer/types';
import { Button, Icon, Input, Select } from '@/shared-ui';

import useAccountStore from '@/store/account';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';
import { useTransferForm } from '@/utils/hooks/useTransferForm';

import { RecipientFormSection } from './components/RecipientFormSection';
import { formGroupCss } from './components/styles';
import { commonTransferButtonCss, containerCss, ctaContainerCss, formTitleCss } from './styles';

type CreateTransferModalContentProps = {
  setModalOpen: (bool: boolean) => void;
};

const CreateTransferModalContent = ({ setModalOpen }: CreateTransferModalContentProps) => {
  const theme = useTheme();
  const { accounts } = useAccountStore();

  const { isDesktop, isTablet } = useBreakpoint();

  const {
    register,
    control,
    handleSubmit,
    errors,
    handleAddRecipient,
    handleRemoveRecipient,
    selectedIndex,
    fields,
    isLoading,
    onSubmit,
  } = useTransferForm(() => setModalOpen(false));

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const wrappedHandler = handleSubmit(async (data: TransferSchema) => await onSubmit(data));
    wrappedHandler(e);
  };

  return (
    <div css={containerCss(theme)}>
      <h4 css={formTitleCss(theme)}>Create New Transfer</h4>
      <form onSubmit={formSubmitHandler}>
        <span css={formGroupCss(theme)}>
          <Select
            id="payoutAccountId"
            label="Account"
            disabled={isLoading}
            placeholder="Select an account"
            options={(accounts || []).map((account: AccountResponse) => ({
              value: account.id,
              label: `${account.name} ${account.address}`,
            }))}
            {...register('payoutAccountId')}
            error={errors.payoutAccountId?.message}
          />
        </span>

        <span css={formGroupCss(theme)}>
          <Input
            id="memo"
            label="Memo"
            placeholder="Enter a memo for this transfer"
            {...register('memo')}
            error={errors.memo?.message}
          />
        </span>

        {fields.map((field, index) => (
          <RecipientFormSection
            key={field.id}
            control={control}
            register={register}
            errors={errors}
            index={index}
          />
        ))}

        <div css={ctaContainerCss(isDesktop, isTablet)}>
          <Button
            type="button"
            variant="primary"
            onClick={handleAddRecipient}
            disabled={isLoading}
            additionalStyles={commonTransferButtonCss}
          >
            <Icon name="plus" color={theme.colors.primary} size={20} />
            Add Recipient
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => handleRemoveRecipient(selectedIndex)}
            disabled={selectedIndex <= 0}
            additionalStyles={commonTransferButtonCss}
          >
            <Icon name="trash" color={theme.colors.error} size={20} />
            Remove Recipient
          </Button>
          <Button
            type="submit"
            variant="success"
            disabled={isLoading || selectedIndex < 0}
            additionalStyles={commonTransferButtonCss}
          >
            <Icon name="send" color={theme.colors.success} size={20} />
            Send Transfer
          </Button>
          <Button
            type="button"
            variant="warning"
            onClick={() => setModalOpen(false)}
            additionalStyles={commonTransferButtonCss}
          >
            <Icon name="close" color={theme.colors.warning} size={20} />
            Cancel Transfer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTransferModalContent;
