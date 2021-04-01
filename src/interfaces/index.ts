// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import {
  ResponsiveImageType,
  SeoMetaTagType,
  StructuredTextDocument,
  ToMetaTagsType,
} from 'react-datocms';

export type User = {
  id: string;
  name: string;
};

export type CMSSite = {
  siteMetaTags: Record<string, SeoMetaTagType[]>;
};

export type CMSModuleBase = {
  id: string;
  type: string;
};
export interface CMSModuleExample1 extends CMSModuleBase {
  headline: string;
  image: Record<string, ResponsiveImageType>;
}
export interface CMSModuleExample2 extends CMSModuleBase {
  ctaLabel: string;
  ctaUrl: string;
}
export interface CMSModuleExample3 extends CMSModuleBase {
  content: StructuredTextDocument | null | undefined;
}

export type CMSPage = {
  id: string;
  name: string;
  slug: string;
  type?: string;
  seo: SeoMetaTagType[];
  modules: CMSModuleBase[];
};

export type CMSApp = {
  mainNavigation: CMSPage[];
};

export type QueryResponseType = {
  page: CMSPage;
};

export type QueryVariables = {
  first: number;
};
