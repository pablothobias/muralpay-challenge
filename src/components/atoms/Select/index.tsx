import { selectGroupCss, errorTextCss } from './styles';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  htmlFor?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  options,
  value,
  htmlFor,
  label,
  placeholder,
  error,
  disabled,
  onChange,
  ...props
}: SelectProps) => {
  return (
    <div css={selectGroupCss}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <select value={value} onChange={onChange} disabled={disabled} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p css={errorTextCss}>{error}</p>}
    </div>
  );
};

export default Select;
