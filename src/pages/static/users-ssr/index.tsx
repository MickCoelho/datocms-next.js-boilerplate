import { NextPage, GetServerSideProps } from 'next';
import { useQuerySubscription } from 'react-datocms';

import datoCmsRequest from 'lib/datocms';

import { dynamicPageBySlugQuery, getSiteMetaTags, getUsers } from 'lib/api';
import { User, CMSPage, CMSSite } from '../../../interfaces';

import PageLayout from '../../../components/page-layout';

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
  users: User[];
};

const Users: NextPage<Props> = ({
  siteData,
  pageSubscription,
  errors,
  users,
}: Props) => {
  const { data, error } = useQuerySubscription(pageSubscription);

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
          <p>
            Example fetching data from inside <code>getServerSideProps()</code>.
          </p>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.id}: {user.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  preview = false,
}) => {
  const siteMetaTags = await getSiteMetaTags();

  const pageSlug = 'static/users-ssr';
  const query = dynamicPageBySlugQuery();
  const graphqlRequest = {
    query,
    preview,
    variables: {
      slug: pageSlug,
      locale,
    },
  };
  const users: User[] = await getUsers();
  // prettier-ignore
  return {
    props: {
      siteData: {
        siteMetaTags,
      },
      users,
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
};

export default Users;
