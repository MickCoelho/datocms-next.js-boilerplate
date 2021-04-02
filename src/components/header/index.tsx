import React, { VoidFunctionComponent } from 'react';
import Link from 'next/link';
import { CMSPage } from 'interfaces';
import styles from './styles.module.css';

type Props = {
  mainNavigation: CMSPage[];
};

const Header: VoidFunctionComponent<Props> = ({ mainNavigation }) => {
  return (
    <>
      <header>
        <nav className={styles.linksWrapper}>
          {mainNavigation.map((route) => (
            <Link key={route.slug} href={`/${route.slug}`}>
              <a className={styles.navigationLink}>{route.name}</a>
            </Link>
          ))}
        </nav>
        <hr />
      </header>
    </>
  );
};

export default Header;
