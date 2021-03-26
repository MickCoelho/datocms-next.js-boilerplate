import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';

import { getUsers } from 'lib/api';
import { User } from '../../interfaces';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = {
  users: User[];
};

const Users: NextPage<Props> = ({ users }: Props) => (
  <Layout title="Users List page">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getServerSideProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List users={users} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const users: User[] = await getUsers();
  return { props: { users } };
};

export default Users;
