import { ForwardedRef, forwardRef, ReactElement } from 'react';

import { useTheme } from '@emotion/react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { errorTextCss, inputGroupCss, StyledInputMask, StyledCurrencyInput } from './styles';

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
    const theme = useTheme();

    const InputComponent = new Map<string, ReactElement>([
      [
        'phone',
        <StyledInputMask
          key={`${name}-phone`}
          id={`${name}-id`}
          mask="+99 99999-9999"
          theme={theme}
          {...props}
          {...field}
          placeholder="+01123456789"
        />,
      ],
      [
        'currency',
        <StyledCurrencyInput
          key={`${name}-currency`}
          {...props}
          theme={theme}
          id={`${name}-id`}
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
      <div css={inputGroupCss(theme)}>
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
