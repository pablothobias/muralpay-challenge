import { buttonStyles } from './styles';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
}: ButtonProps) => {
  return (
    <button css={buttonStyles({ size, variant })} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
