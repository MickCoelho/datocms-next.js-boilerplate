import { GetStaticProps, GetStaticPaths } from 'next';
import { FunctionComponent } from 'react';

import { getAllPagesSlugs } from 'lib/api';
import { CMSPage } from '../../interfaces';
import Layout from '../../components/Layout';

type Props = {
  page?: CMSPage;
  errors?: string;
};

const StaticPropsDetail: FunctionComponent<null> = ({
  page,
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
    <Layout title={`${page ? page.name : ''} page`}>
      {page && <div>Page name: {page.name}</div>}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const pages = await getAllPagesSlugs();
  const paths = pages.map((user: CMSPage) => ({
    params: { slug: user.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug;
    const pages = await getAllPagesSlugs();

    const page = pages.find((data) => data.slug === slug);
    // By returning { props: page }, the StaticPropsDetail component
    // will receive `page` as a prop at build time
    return { props: { page } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
