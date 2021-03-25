import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

const AboutPage: NextPage = () => {
  const mick = 'ok';
  return (
    <Layout title="About Page">
      <h1>About</h1>
      <p>This is the about page</p>
      <a>Users List</a>
      <button>Users List</button>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default AboutPage;
