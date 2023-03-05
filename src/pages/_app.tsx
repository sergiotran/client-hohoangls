import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/features/store';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import '@/assets/styles/global.scss';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} key={router.route} />)}
    </Provider>
  );
};

export default App;
