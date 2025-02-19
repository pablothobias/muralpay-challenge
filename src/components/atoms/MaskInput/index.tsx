import { ReactElement } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import InputMask from 'react-input-mask-next';
import { errorTextCss, inputGroupCss, inputStyles } from './styles';

type MaskInputProps<T extends FieldValues> = {
  type: 'currency' | 'phone';
  placeholder?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  value?: string;
  error?: string;
};

function MaskInputComponent<T extends FieldValues>({
  type = 'phone',
  label,
  name,
  control,
  error,
  ...props
}: MaskInputProps<T>) {
  const { field } = useController({ name, control });
  const { ref: fieldRef, ...fieldProps } = field;

  const InputComponent = new Map<string, ReactElement>([
    [
      'phone',
      <InputMask
        key={name}
        mask="+99 (99) 99999-9999"
        {...fieldProps}
        {...props}
        inputRef={(el: HTMLInputElement) => fieldRef(el)}
        css={inputStyles}
        placeholder=" +99 (99) 99999-9999"
      />,
    ],
    [
      'currency',
      <CurrencyInput
        key={name}
        {...fieldProps}
        {...props}
        ref={(el: HTMLInputElement) => fieldRef(el)}
        decimalsLimit={2}
        prefix="$ "
        placeholder="$ 0.00"
      />,
    ],
  ]);

  return (
    <div css={inputGroupCss}>
      {label && (
        <label key={name} htmlFor={name} {...props}>
          {label}
        </label>
      )}
      {InputComponent.get(type)}
      {error && <p css={errorTextCss}>{error}</p>}
    </div>
  );
}

export default MaskInputComponent;
