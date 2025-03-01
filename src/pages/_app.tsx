'use client';

import { Global } from '@emotion/react';

import dynamic from 'next/dynamic';

import Head from 'next/head';
import { type FC, Suspense } from 'react';

import { LoadingSpinner } from '@/shared-ui';
import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';
import { globalStyles } from '@/styles/';
import { inter } from '@/styles/fonts';
import { LoadingProvider } from '@/utils/context/LoadingContext';
import { ToastProvider } from '@/utils/context/ToastContext';
import { ToggleThemeProvider } from '@/utils/context/ToggleThemeProvider';

import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';

const GlobalLayout = dynamic(() => import('@/shared-ui/templates/GlobalLayout'), {
  ssr: false,
  loading: () => null,
});

const ToastContainer = dynamic(() => import('react-toastify').then(mod => mod.ToastContainer), {
  ssr: false,
  loading: () => null,
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ToggleThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>
      <div className={inter.variable}>
        <Global styles={globalStyles} />
        <ErrorBoundary>
          <LoadingProvider>
            <ToastProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <GlobalLayout>
                  <Component {...pageProps} />
                  <ToastContainer />
                </GlobalLayout>
              </Suspense>
            </ToastProvider>
          </LoadingProvider>
        </ErrorBoundary>
      </div>
    </ToggleThemeProvider>
  );
};

export default MyApp;
