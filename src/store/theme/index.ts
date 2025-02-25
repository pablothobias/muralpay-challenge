import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { ThemeState, ThemeType } from './types';

const getSystemThemePreference = (): ThemeType => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const useThemeStore = create<ThemeState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          theme: getSystemThemePreference(),
          setTheme: (theme: ThemeType) => set({ theme }),
          onLogout: () => {
            set({ theme: getSystemThemePreference() });
            localStorage.clear();
          },
        }),
        {
          name: 'theme',
          storage: createJSONStorage(() => localStorage),
          onRehydrateStorage: () => (state) => {
            if (!state?.theme) {
              state?.setTheme(getSystemThemePreference());
            }
          },
        },
      ),
    ),
  ),
);

export default useThemeStore;
