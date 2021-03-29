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
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {mainNavigation.map((route) => (
            <Link key={route.slug} href={`/${route.slug}`}>
              <a>{route.name}</a>
            </Link>
          ))}
        </nav>
        <hr />
      </header>
    </>
  );
};

export default Header;
