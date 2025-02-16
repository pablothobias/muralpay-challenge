import { buttonStyles } from './styles';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  size = 'medium',
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      css={buttonStyles({ size, variant })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
