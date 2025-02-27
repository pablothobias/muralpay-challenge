import { User } from './types';

import useAuthStore from '.';

export const useAuthActions = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const handleLogin = async (user: User) => {
    try {
      login(user);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      throw error;
    }
  };

  return {
    login: handleLogin,
    logout: handleLogout,
  };
};
