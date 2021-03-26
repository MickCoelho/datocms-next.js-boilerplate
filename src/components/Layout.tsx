import React, { ReactNode, FunctionComponent } from 'react';
import Head from 'next/head';
import Footer from './footer';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
    <Footer />
  </div>
);

export default Layout;
