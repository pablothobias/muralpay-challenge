import { forwardRef } from 'react';
import { errorTextCss, inputGroupCss } from './styles';

type SelectProps = {
  options: { value: string; label: string }[];
  value?: string;
  label?: string;
  id: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, label, id, placeholder, error, disabled, onChange, ...props }, ref) => {
    const placeholderOption = { value: '', label: placeholder };

    return (
      <div css={inputGroupCss}>
        {label && <label htmlFor={id}>{label}</label>}
        <select id={id} value={value} onChange={onChange} disabled={disabled} ref={ref} {...props}>
          {[placeholderOption, ...options].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p css={errorTextCss}>{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
