import { useTheme } from '@emotion/react';
import { forwardRef } from 'react';

import { errorTextCss, selectGroupCss, selectStyles } from './styles';

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
    const theme = useTheme();

    const placeholderOption = { value: '', label: placeholder };

    return (
      <div css={selectGroupCss(theme)}>
        {label && <label htmlFor={id}>{label}</label>}
        <select
          css={selectStyles(theme)}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          role="combobox"
          data-testid={id}
          {...props}
        >
          {[placeholderOption, ...options].map(option => (
            <option className="option" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p css={errorTextCss(theme)}>{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
