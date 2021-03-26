import datoCmsRequest from './datocms';
import { CMSPage, User } from '../interfaces';
import {
  RESPONSIVE_IMAGE_FRAGMENT,
  META_TAGS_FRAGMENT,
  testModule,
} from './api-fragments';

export async function getUsers(): Promise<User[]> {
  const query = `
    query AppQuery {
      allUsers {
        id
        name
      }
    }
  `;
  const result: Record<string, User[]> = await datoCmsRequest({
    query,
  });
  return result.allUsers;
}

export async function getSiteMetaTags(): Promise<unknown> {
  const query = `
    query AppQuery {
      site: _site {
        favicon: faviconMetaTags {
          ${META_TAGS_FRAGMENT}
        }
      }
    }
  `;
  const result: Record<string, unknown> = await datoCmsRequest({
    query,
  });
  return result.site;
}

export async function getGlobalData(): Promise<any> {
  const query = `
  {
    global {
      mainNavigation {
        ... on PageRecord {
          type: _modelApiKey
          id
          name
          slug
        }
      }
    }
  }
  `;
  const result: any = await datoCmsRequest({
    query,
  });
  return result.global;
}

export async function getAllPagesSlugs(): Promise<CMSPage[]> {
  const query = `
    {
      allPages {
        id
        slug
        name
      }
    }
  `;
  const result: Record<string, CMSPage[]> = await datoCmsRequest({
    query,
  });
  return result.allPages;
}

export async function getDynamicPageBySlug(
  slug: string,
  preview: boolean,
): Promise<unknown> {
  const query = `
    query PagesBySlug($slug: String) {
      allPages(filter: {slug: {eq: $slug}}) {
        id
        slug
        name
        seo: _seoMetaTags {
          ${META_TAGS_FRAGMENT}
        }
      }
    }
  `;
  const result: Record<string, never> = await datoCmsRequest({
    query,
    variables: { slug },
    preview,
  });

  const pageData: Array<never> = result.allPages;

  return pageData[0];
}
