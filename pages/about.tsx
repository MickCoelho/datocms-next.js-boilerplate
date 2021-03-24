import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

interface Props {}

const AboutPage: NextPage<Props> = () => {
  const mick = 'ok';
  return (
    <Layout title="About Page">
      <h1>About</h1>
      <button>test</button>
      <p>This is the about page</p>
      <a>Users List</a>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default AboutPage;
