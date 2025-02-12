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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type = 'text', placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
