import React from 'react';
import { errorTextCss, inputGroupCss, inputStyles } from './styles';

type InputProps = {
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'currency' | 'phone';
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id: string;
  value?: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  ...props
}) => {
  return (
    <div css={inputGroupCss}>
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
        {...props}
      />
      {error && <p css={errorTextCss}>{error}</p>}
    </div>
  );
};

export default Input;
