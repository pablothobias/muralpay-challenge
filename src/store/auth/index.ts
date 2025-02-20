import Cookies from 'js-cookie';
import { create } from 'zustand';
import { devtools, persist, PersistStorage } from 'zustand/middleware';
import { type AuthState, type User } from './types';

const cookieStorage: PersistStorage<AuthState> = {
  getItem: (name) => {
    const storedValue = Cookies.get(name);
    if (!storedValue || typeof window === 'undefined') return null;
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error parsing cookie ${name}:`, error);
      return null;
    }
  },
  setItem: (name, value) => {
    if (typeof window !== 'undefined')
      Cookies.set(name, JSON.stringify(value), {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });
  },
  removeItem: (name) => {
    if (typeof window !== 'undefined') Cookies.remove(name);
  },
};

const useAuthStore = create<AuthState>()(
  devtools(
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
  ),
);

export default useAuthStore;
