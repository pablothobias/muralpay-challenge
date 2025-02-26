import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

declare module 'next' {
  type NextPageWithLayout<Props = Record<string, unknown>, InitialProps = Props> = NextPage<
    Props,
    InitialProps
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

declare module 'next/app' {
  type AppPropsWithLayout = AppProps & {
    Component: NextPage & {
      getLayout?: (page: ReactElement) => ReactNode;
    };
  };
}
