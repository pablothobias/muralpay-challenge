import { errorTextCss, inputGroupCss, inputStyles } from './styles';

export type InputProps = {
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'datetime-local';
  placeholder?: string;
  value?: string;
  label?: string;
  id?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = 'text',
  label,
  placeholder,
  id,
  value,
  error,
  onChange,
  ...props
}: InputProps) => {
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
        {...props}
      />
      {error && <p css={errorTextCss}>{error}</p>}
    </div>
  );
};

export default Input;
