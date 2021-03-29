// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { SeoMetaTagType } from 'react-datocms';

export type User = {
  id: string;
  name: string;
};

export type CMSSite = {
  siteMetaTags: Record<string, SeoMetaTagType[]>;
};

export type CMSModule = {
  id: string;
  type: string;
};

export type CMSPage = {
  id: string;
  name: string;
  slug: string;
  type?: string;
  seo: SeoMetaTagType[];
  modules: CMSModule[];
};

export type CMSApp = {
  mainNavigation: CMSPage[];
};
