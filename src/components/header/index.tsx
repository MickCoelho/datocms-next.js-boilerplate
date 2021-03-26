import React, { VoidFunctionComponent } from 'react';
import Link from 'next/link';
import { CMSPage } from 'interfaces';

type Props = {
  mainNavigation: CMSPage[];
};

const Header: VoidFunctionComponent<Props> = ({ mainNavigation }) => {
  return (
    <>
      <header>
        <nav>
          {mainNavigation.map((route, i) => (
            <Link key={route.slug} href={route.slug}>
              <a>{route.name}</a>
            </Link>
          ))}
          {/* <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href="/users-ssg">
            <a>Users List SSG</a>
          </Link>{' '}
          |{' '}
          <Link href="/users-ssr">
            <a>Users List SSR</a>
          </Link>{' '}
          | <a href="/api/users">Users API</a> */}
        </nav>
      </header>
    </>
  );
};

export default Header;
