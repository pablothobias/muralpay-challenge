export type ThemeType = 'light' | 'dark';

export type ThemeState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  onLogout: () => void;
};
