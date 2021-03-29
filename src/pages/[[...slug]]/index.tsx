import { GetStaticProps, GetStaticPaths } from 'next';
import { FunctionComponent } from 'react';

import {
  getAllPagesSlugs,
  getSiteMetaTags,
  getDynamicPageBySlug,
} from 'lib/api';
import { CMSSite, CMSPage } from '../../interfaces';
import PageLayout from '../../components/page-layout';

type Props = {
  siteData: CMSSite;
  pageData?: CMSPage;
  errors?: string;
};

const DynamicPage: FunctionComponent<null> = ({
  siteData,
  pageData,
  errors,
}: Props) => {
  if (errors || !pageData) {
    return (
      <PageLayout title="Error">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </PageLayout>
    );
  }

  const metaTags = pageData.seo.concat(siteData.siteMetaTags.favicon);

  return (
    <PageLayout metaTags={metaTags}>
      {pageData && (
        <>
          <h1>Page name: {pageData.name}</h1>
          <h2>
            Page slug: <code>/{pageData.slug}</code>
          </h2>
        </>
      )}
    </PageLayout>
  );
};

export default DynamicPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPagesSlugs();
  const formattedPages =
    allPages?.map((page) => ({
      params: { slug: [page.slug] },
    })) || [];
  return {
    paths: [...formattedPages],
    fallback: false,
  };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  try {
    const siteMetaTags = await getSiteMetaTags();

    const pageSlug = params?.slug ? params?.slug[0] : '';
    const pageData = await getDynamicPageBySlug(pageSlug, preview);

    // By returning { props: page }, the StaticPropsDetail component
    // will receive `page` as a prop at build time
    return {
      props: {
        siteData: {
          siteMetaTags,
        },
        pageData,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
