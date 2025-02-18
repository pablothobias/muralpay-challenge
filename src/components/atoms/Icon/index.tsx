import { useTheme } from '@emotion/react';
import {
  FiCreditCard,
  FiDollarSign,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiRefreshCcw,
  FiSearch,
  FiUser,
  FiUsers,
} from 'react-icons/fi';

export type IconProps = {
  name: 'search' | 'user' | 'users' | 'logout' | 'login' | 'transfer' | 'home' | 'card' | 'refresh';
  size?: number;
  color?: string;
};

const Icon = ({ name, size = 24, color }: IconProps) => {
  const theme = useTheme();
  if (!color) color = theme.colors.primary;

  const icons = {
    search: <FiSearch size={size} color={color} />,
    user: <FiUser size={size} color={color} />,
    users: <FiUsers size={size} color={color} />,
    logout: <FiLogOut size={size} color={color} />,
    login: <FiLogIn size={size} color={color} />,
    transfer: <FiDollarSign size={size} color={color} />,
    home: <FiHome size={size} color={color} />,
    card: <FiCreditCard size={size} color={color} />,
    refresh: <FiRefreshCcw size={size} color={color} />,
  };

  return icons[name] || null;
};

export default Icon;
