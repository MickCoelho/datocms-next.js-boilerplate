import { NextPage, GetServerSideProps } from 'next';

import { getDynamicPageBySlug, getUsers } from 'lib/api';
import { User, CMSPage } from '../../../interfaces';

import Layout from '../../../components/layout';

type Props = {
  pageData: CMSPage;
  users: User[];
};

const Users: NextPage<Props> = ({ pageData, users }: Props) => (
  <Layout title={`${pageData ? pageData.name : ''} page`}>
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
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const pageData = await getDynamicPageBySlug('static/users-ssr', false);

  const users: User[] = await getUsers();
  return { props: { users, pageData } };
};

export default Users;
