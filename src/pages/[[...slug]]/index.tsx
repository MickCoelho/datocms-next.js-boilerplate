import { GetStaticProps, GetStaticPaths } from 'next';
import { FunctionComponent } from 'react';

import { getAllPagesSlugs, getDynamicPageBySlug } from 'lib/api';
import { CMSPage } from '../../interfaces';
import Layout from '../../components/layout';

type Props = {
  pageData?: CMSPage;
  errors?: string;
};

const StaticPropsDetail: FunctionComponent<null> = ({
  pageData,
  errors,
}: Props) => {
  if (errors) {
    return (
      <Layout title="Error">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${pageData ? pageData.name : ''} page`}>
      {pageData && (
        <>
          <h1>Page name: {pageData.name}</h1>
          <h2>
            Page slug: <code>/{pageData.slug}</code>
          </h2>
        </>
      )}
    </Layout>
  );
};

export default StaticPropsDetail;

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
    const pageSlug = params?.slug ? params?.slug[0] : '';
    const pageData = await getDynamicPageBySlug(pageSlug, preview);

    // By returning { props: page }, the StaticPropsDetail component
    // will receive `page` as a prop at build time
    return {
      props: {
        pageData,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
