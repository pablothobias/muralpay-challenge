import { colors } from '@/styles/variables';
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
  FiSlash,
  FiTrash,
  FiUser,
  FiUsers,
  FiXCircle,
} from 'react-icons/fi';
import {
  IoCashOutline,
  IoInformationCircleOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMenu,
  IoSettingsOutline,
  IoSwapHorizontalOutline,
  IoClose,
  IoSend,
} from 'react-icons/io5';

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
    | 'trash'
    | 'cash'
    | 'empty'
    | 'swap'
    | 'facebook'
    | 'instagram'
    | 'pending'
    | 'twitter'
    | 'send'
    | 'menu'
    | 'close'
    | 'settings';
  size?: number;
  color?: string;
};

const Icon = ({ name, size = 24, color = colors.primary.dark }: IconProps) => {
  const props = { color, size };

  const icons = {
    search: <FiSearch {...props} />,
    user: <FiUser {...props} />,
    users: <FiUsers {...props} />,
    logout: <FiLogOut {...props} />,
    login: <FiLogIn {...props} />,
    transfer: <FiDollarSign {...props} />,
    home: <FiHome {...props} />,
    card: <FiCreditCard {...props} />,
    refresh: <FiRefreshCcw {...props} />,
    check: <FiCheckCircle {...props} />,
    error: <FiXCircle {...props} />,
    plus: <FiPlus {...props} />,
    play: <FiPlay {...props} />,
    trash: <FiTrash {...props} />,
    cash: <IoCashOutline {...props} />,
    swap: <IoSwapHorizontalOutline {...props} />,
    empty: <IoInformationCircleOutline {...props} />,
    facebook: <IoLogoFacebook {...props} />,
    instagram: <IoLogoInstagram {...props} />,
    twitter: <IoLogoTwitter {...props} />,
    pending: <FiSlash {...props} />,
    settings: <IoSettingsOutline {...props} />,
    menu: <IoMenu {...props} />,
    send: <IoSend {...props} />,
    close: <IoClose {...props} />,
  };

  return icons[name] || null;
};

export default Icon;
