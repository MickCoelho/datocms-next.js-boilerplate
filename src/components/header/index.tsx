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
            <Link key={route.slug} href={`/${route.slug}`}>
              <a>{route.name}</a>
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
