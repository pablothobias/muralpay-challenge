import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { type AuthState, type User } from './types';

const cookieStorage: PersistStorage<AuthState> = {
  getItem: (name) => {
    const storedValue = Cookies.get(name);
    if (!storedValue) return null;
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error parsing cookie ${name}:`, error);
      return null;
    }
  },
  setItem: (name, value) => {
    console.log({ name, value });
    // Cookies.set(name, JSON.stringify(value), {
    //   expires: 7,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'Strict',
    //   path: '/',
    // });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: cookieStorage,
    },
  ),
);

export default useAuthStore;
