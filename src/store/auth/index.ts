import Cookies from 'js-cookie';
import { create } from 'zustand';
import { devtools, persist, PersistStorage, subscribeWithSelector } from 'zustand/middleware';

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
    if (typeof window !== 'undefined') {
      Cookies.set(name, JSON.stringify(value), {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });
    }
  },
  removeItem: (name) => {
    if (typeof window !== 'undefined') {
      Cookies.remove(name);
    }
  },
};

const useAuthStore = create<AuthState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          user: null,
          isAuthenticated: false,
          login: (user: User) => {
            set({ user, isAuthenticated: true });
          },
          logout: () => {
            set({ user: null, isAuthenticated: false });
            cookieStorage.removeItem('auth-storage');
            cookieStorage.removeItem('user');
            cookieStorage.removeItem('on-behalf-of');
          },
        }),
        {
          name: 'auth-storage',
          storage: cookieStorage,
        },
      ),
    ),
  ),
);

export default useAuthStore;
