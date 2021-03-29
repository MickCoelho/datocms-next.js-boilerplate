import React, { ReactNode, FunctionComponent } from 'react';
import { renderMetaTags, SeoMetaTagType } from 'react-datocms';
import Head from 'next/head';
import Footer from './footer';

type Props = {
  title?: string;
  metaTags?: SeoMetaTagType[];
  children?: ReactNode;
};

const Layout: FunctionComponent<Props> = ({
  children,
  metaTags,
  title,
}: Props) => (
  <div>
    {metaTags && <Head>{renderMetaTags(metaTags)}</Head>}
    {title && <title>{title}</title>}
    {children}
    <Footer />
  </div>
);

export default Layout;
