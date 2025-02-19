import { errorTextCss, selectGroupCss } from './styles';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  label?: string;
  id?: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({
  options,
  value,
  label,
  id,
  placeholder,
  error,
  disabled,
  onChange,
  ...props
}: SelectProps) => {
  const placeholderOption = { value: '', label: placeholder };
  return (
    <div css={selectGroupCss}>
      {label && (
        <label htmlFor={id} {...props}>
          {label}
        </label>
      )}
      <select id={id} value={value} onChange={onChange} disabled={disabled} {...props}>
        {[placeholderOption, ...options].map((option) => (
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
