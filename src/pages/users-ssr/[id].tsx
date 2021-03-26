import { GetStaticProps, GetStaticPaths } from 'next';
import { FunctionComponent } from 'react';

import { getUsers } from 'lib/api';
import { User } from '../../interfaces';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';

type Props = {
  user?: User;
  errors?: string;
};

const StaticPropsDetail: FunctionComponent<null> = ({
  user,
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
    <Layout title={`${user ? user.name : 'User Detail'} page`}>
      {user && <ListDetail user={user} />}
    </Layout>
  );
};

export default StaticPropsDetail;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getServerSideProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const users = await getUsers();

    const user = users.find((data) => data.id === id);
    // By returning { props: user }, the StaticPropsDetail component
    // will receive `user` as a prop at build time
    return { props: { user } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
