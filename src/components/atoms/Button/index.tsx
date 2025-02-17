import { ReactNode } from 'react';
import { buttonStyles } from './styles';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  size = 'medium',
  disabled,
  onClick,
  icon,
  iconPosition = 'left',
  className,
}: ButtonProps) => {
  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  return (
    <button
      css={buttonStyles({ size, variant, hasIcon: !!icon })}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  );
};

export default Button;
