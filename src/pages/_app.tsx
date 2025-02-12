'use client';

import type { AppProps } from 'next/app';
import { useEffect, useState, type FC } from 'react';
import { Global } from '@emotion/react';
import { globalStyles } from '@/styles/';
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from '@/styles/theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    let prefersDark: boolean;
    if (typeof window !== 'undefined') {
      prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? darkTheme : lightTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
