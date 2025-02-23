import React, { forwardRef } from 'react';
import { errorTextCss, inputGroupCss, inputStyles } from './styles';
import { useTheme } from '@emotion/react';

type InputProps = {
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'currency' | 'phone';
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id: string;
  value?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, id, placeholder, value, onChange, error, ...props }, ref) => {
    const theme = useTheme();

    return (
      <div css={inputGroupCss(theme)}>
        {label && (
          <label htmlFor={id} {...props}>
            {label}
          </label>
        )}
        <input
          css={inputStyles}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          step="any"
          ref={ref}
          {...props}
        />
        {error && <p css={errorTextCss(theme)}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
