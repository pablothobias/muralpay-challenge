'use client';

import { globalStyles } from '@/styles/';
import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';
import { LoadingProvider } from '@/utils/context/LoadingContext';
import { ToastProvider } from '@/utils/context/ToastContext';
import { ToggleThemeProvider } from '@/utils/context/ToggleThemeContext';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { type FC } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const GlobalLayout = dynamic(() => import('@/shared-ui/templates/GlobalLayout'), { ssr: false });
const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), {
  ssr: false,
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ToggleThemeProvider>
      <Global styles={globalStyles} />
      <ErrorBoundary>
        <LoadingProvider>
          <ToastProvider>
            <GlobalLayout>
              <Component {...pageProps} />
              <ToastContainer />
            </GlobalLayout>
          </ToastProvider>
        </LoadingProvider>
      </ErrorBoundary>
    </ToggleThemeProvider>
  );
};

export default MyApp;
