import Head from 'next/head';
import { useRouter } from 'next/router';
import type { AppContext, AppProps } from 'next/app';
import Link from 'next/link';
import { CMSApp } from '../interfaces/index';
import Header from '../components/header';
import { getGlobalData } from '../lib/api';
import styles from './styles.module.css';

type Props = {
  Component: AppProps['Component'];
  pageProps: AppProps['pageProps'];
  appProps: CMSApp;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps, appProps }: Props & AppProps) => {
  const router = useRouter();

  return (
    <div className="app-container">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      {router.isPreview && (
        <div>
          <div className={styles.previewBanner}>
            <p>
              <b>PREVIEW MODE ENABLED</b>, click{' '}
              <Link href="/api/exit-preview">
                <a>here</a>
              </Link>{' '}
              to exit
            </p>
          </div>
          <hr />
        </div>
      )}
      <Header mainNavigation={appProps.mainNavigation} />
      <Component {...pageProps} appProps={appProps} />
    </div>
  );
};

App.getInitialProps = async (ctx: AppContext) => {
  const appProps = await getGlobalData(ctx.router.isPreview, ctx.router.locale);
  return {
    appProps,
  };
};

export default App;
