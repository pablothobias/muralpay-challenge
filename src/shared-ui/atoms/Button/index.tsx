import { SerializedStyles, useTheme } from '@emotion/react';
import { ReactNode } from 'react';

import { buttonStyles } from './styles';

export type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  additionalStyles?: SerializedStyles;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  size = 'medium',
  disabled,
  onClick,
  icon,
  iconPosition = 'left',
  additionalStyles,
  className,
}: ButtonProps) => {
  const theme = useTheme();
  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  return (
    <button
      css={[buttonStyles({ size, variant, theme, additionalStyles })]}
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
