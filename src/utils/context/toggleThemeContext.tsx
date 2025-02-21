import { darkTheme, lightTheme, ThemeType } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { createContext, useContext, useEffect, useState } from 'react';

export const ToggleThemeContext = createContext<{
  toggleTheme: () => void;
  theme: ThemeType;
} | null>(null);

export const useToggleTheme = () => {
  const context = useContext(ToggleThemeContext);
  if (!context) {
    throw new Error('useToggleTheme must be used within ToggleThemeProvider');
  }
  return context;
};

export const ToggleThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
  };

  return (
    <ToggleThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleThemeContext.Provider>
  );
};
