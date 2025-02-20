import { ForwardedRef, forwardRef, ReactElement } from 'react';
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

const MaskInput = forwardRef(
  <T extends FieldValues>(
    { type = 'phone', label, name, control, error, ...props }: MaskInputProps<T>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const { field } = useController({ name, control });

    const InputComponent = new Map<string, ReactElement>([
      [
        'phone',
        <InputMask
          key={`${name}-phone`}
          id="phone"
          mask="+99 99999-9999"
          css={inputStyles}
          {...props}
          {...field}
          inputRef={ref}
          placeholder="+01123456789"
        />,
      ],
      [
        'currency',
        <CurrencyInput
          key={`${name}-currency`}
          {...props}
          css={inputStyles}
          id="currency"
          prefix="$ "
          placeholder="$ 0.00"
          defaultValue={0}
          decimalsLimit={2}
          ref={ref}
          onValueChange={(_value, _name, values) => field.onChange(values?.float || 0)}
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
  },
);

MaskInput.displayName = 'MaskInput';

export default MaskInput as <T extends FieldValues>(
  props: MaskInputProps<T> & { ref?: ForwardedRef<HTMLInputElement> },
) => JSX.Element;
