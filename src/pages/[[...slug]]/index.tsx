import { GetStaticProps, GetStaticPaths } from 'next';
import { FunctionComponent } from 'react';

import {
  getAllPagesSlugs,
  getSiteMetaTags,
  dynamicPageBySlugQuery,
} from 'lib/api';
import { useQuerySubscription } from 'react-datocms';
import datoCmsRequest from 'lib/datocms';
import { CMSSite, CMSPage } from '../../interfaces';
import PageLayout from '../../components/page-layout';
import ModulesContainer from '../../components/modules-container';

type Props = {
  siteData: CMSSite;
  errors?: string;
  pageSubscription: {
    enabled: false;
    initialData?: {
      page: CMSPage;
    };
    data?: {
      page: CMSPage;
    };
  };
};

const datoStatusMessage = {
  connecting: 'Connecting to DatoCMS...',
  connected: 'Connected to DatoCMS, receiving live updates!',
  closed: 'Connection closed',
};

const DynamicPage: FunctionComponent<null> = ({
  siteData,
  errors,
  pageSubscription,
}: Props) => {
  if (!pageSubscription) {
    return (
      <PageLayout title="Error">
        <p>
          <span style={{ color: 'red' }}>Error:</span>
        </p>
      </PageLayout>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, status } = useQuerySubscription(pageSubscription);

  if (errors || error || !data) {
    return (
      <PageLayout title="Error">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </PageLayout>
    );
  }

  const metaTags = data.page.seo.concat(siteData.siteMetaTags.favicon);

  return (
    <PageLayout metaTags={metaTags}>
      {data && (
        <>
          <h1>Page name: {data.page.name}</h1>
          <h2>
            Page slug: <code>/{data.page.slug}</code>
          </h2>
          <div>
            Modules:
            {data?.page.modules.map((module) => (
              <ModulesContainer key={module.id} {...module} />
            ))}
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default DynamicPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const allPages = await getAllPagesSlugs();
  const localizedPages: any = [];
  locales?.forEach((locale) => {
    const formattedPages =
      allPages?.map((page) => ({
        params: { slug: [page.slug], locale },
      })) || [];
    localizedPages.push(...formattedPages);
  });

  return {
    paths: localizedPages,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  preview = false,
}) => {
  try {
    const siteMetaTags = await getSiteMetaTags();

    const pageSlug = params?.slug ? params?.slug[0] : '';
    const query = dynamicPageBySlugQuery();
    const graphqlRequest = {
      query,
      variables: {
        slug: pageSlug,
        locale,
      },
      preview,
    };

    // prettier-ignore
    return {
      props: {
        siteData: {
          siteMetaTags,
        },
        pageSubscription: preview
          ? {
            ...graphqlRequest,
            initialData: await datoCmsRequest(graphqlRequest),
            token: process.env.DATOCMS_API_TOKEN,
          }
          : {
            enabled: false,
            initialData: await datoCmsRequest(graphqlRequest),
          },
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
