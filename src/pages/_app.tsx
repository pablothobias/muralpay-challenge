'use client';

import { globalStyles } from '@/styles/';
import { ErrorBoundary } from '@/shared-ui/molecules/ErrorBoundary';
import { LoadingProvider } from '@/utils/context/LoadingContext';
import { ToastProvider } from '@/utils/context/ToastContext';
import { ToggleThemeProvider } from '@/utils/context/toggleThemeContext';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { type FC } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import 'react-toastify/dist/ReactToastify.css';

const GlobalLayout = dynamic(() => import('@/shared-ui/templates/GlobalLayout'), { ssr: false });
const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), {
  ssr: false,
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ToggleThemeProvider>
      <Global styles={globalStyles} />
      <ErrorBoundary
        fallback={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: 'var(--background)',
              color: 'var(--text)',
            }}
          >
            <IoWarningOutline size={64} style={{ color: 'var(--error)' }} />
            <h2 style={{ margin: '20px 0' }}>Oops! Something went wrong</h2>
            <p style={{ marginBottom: '20px' }}>
              We apologize for the inconvenience. Please try refreshing the page or contact support
              if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        }
      >
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
