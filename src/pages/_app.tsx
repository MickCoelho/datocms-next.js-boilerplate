import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CMSApp } from '../interfaces/index';
import Header from '../components/header';
import { getGlobalData } from '../lib/api';

type Props = {
  Component: AppProps['Component'];
  pageProps: AppProps['pageProps'];
  appProps: CMSApp;
};

const App = ({ Component, pageProps, appProps }: Props) => {
  return (
    <div className="app-container">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Header mainNavigation={appProps.mainNavigation} />
      <Component {...pageProps} appProps={appProps} />
    </div>
  );
};

App.getInitialProps = async () => {
  const appProps = await getGlobalData();
  return {
    appProps,
  };
};

export default App;
