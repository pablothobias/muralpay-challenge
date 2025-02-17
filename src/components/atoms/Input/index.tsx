import { errorTextCss, inputGroupCss, inputStyles } from './styles';

export interface InputProps {
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime-local';
  placeholder?: string;
  value?: string;
  htmlFor?: string;
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = 'text',
  htmlFor,
  label,
  placeholder,
  value,
  error,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div css={inputGroupCss}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <input
        css={inputStyles}
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
