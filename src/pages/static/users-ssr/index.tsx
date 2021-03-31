import { NextPage, GetServerSideProps } from 'next';

import { getDynamicPageBySlug, getSiteMetaTags, getUsers } from 'lib/api';
import { User, CMSPage, CMSSite } from '../../../interfaces';

import PageLayout from '../../../components/page-layout';

type Props = {
  siteData: CMSSite;
  pageData: CMSPage;
  users: User[];
};

const Users: NextPage<Props> = ({ siteData, pageData, users }: Props) => {
  const metaTags = pageData.seo.concat(siteData.siteMetaTags.favicon);
  return (
    <PageLayout metaTags={metaTags}>
      {pageData && (
        <>
          <h1>Page name: {pageData.name}</h1>
          <h2>
            Page slug: <code>/{pageData.slug}</code>
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

  const pageData = await getDynamicPageBySlug(
    'static/users-ssr',
    preview,
    locale,
  );

  const users: User[] = await getUsers();
  return {
    props: {
      siteData: {
        siteMetaTags,
      },
      users,
      pageData,
    },
  };
};

export default Users;
