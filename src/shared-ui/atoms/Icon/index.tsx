import { useTheme } from '@emotion/react';
import {
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiPlay,
  FiPlus,
  FiRefreshCcw,
  FiSearch,
  FiTrash,
  FiUser,
  FiUsers,
  FiXCircle,
} from 'react-icons/fi';

export type IconProps = {
  name:
    | 'search'
    | 'user'
    | 'users'
    | 'logout'
    | 'login'
    | 'transfer'
    | 'home'
    | 'card'
    | 'refresh'
    | 'check'
    | 'error'
    | 'plus'
    | 'play'
    | 'trash';
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
    check: <FiCheckCircle size={size} color={color} />,
    error: <FiXCircle size={size} color={color} />,
    plus: <FiPlus size={size} color={color} />,
    play: <FiPlay size={size} color={color} />,
    trash: <FiTrash size={size} color={color} />,
  };

  return icons[name] || null;
};

export default Icon;
