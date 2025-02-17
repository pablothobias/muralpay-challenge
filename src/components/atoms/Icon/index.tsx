import { FiLogIn, FiLogOut, FiSearch, FiUser } from 'react-icons/fi';

export type IconProps = {
  name: 'search' | 'user' | 'logout' | 'login';
  size?: number;
  color?: string;
};

const Icon = ({ name, size = 24, color = 'var(--foreground)' }: IconProps) => {
  const icons = {
    search: <FiSearch size={size} color={color} />,
    user: <FiUser size={size} color={color} />,
    logout: <FiLogOut size={size} color={color} />,
    login: <FiLogIn size={size} color={color} />,
  };

  return icons[name] || null;
};

export default Icon;
