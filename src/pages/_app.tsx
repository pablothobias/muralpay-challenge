'use client';

import { globalStyles } from '@/styles/';
import { darkTheme, lightTheme } from '@/styles/theme';
import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useEffect, useState, type FC } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

const GlobalLayout = dynamic(() => import('@/components/templates/GlobalLayout'), { ssr: false });
const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), {
  ssr: false,
});

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
