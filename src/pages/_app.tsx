'use client';

import { useEffect, useState, type FC } from 'react';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { Global } from '@emotion/react';
import { globalStyles } from '@/styles/';
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from '@/styles/theme';
import { GlobalLayout } from '@/components';
import { ToastContainer } from 'react-toastify';

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
      <GlobalLayout>
        <Component {...pageProps} />
        <ToastContainer />
      </GlobalLayout>
    </ThemeProvider>
  );
};

export default MyApp;
