import datoCmsRequest from './datocms';
import { CMSPage, User } from '../interfaces';
import {
  RESPONSIVE_IMAGE_FRAGMENT,
  META_TAGS_FRAGMENT,
  moduleExample1Fragment,
  moduleExample2Fragment,
  moduleExample3Fragment,
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

export async function getGlobalData(
  preview: boolean,
  locale = 'en',
): Promise<any> {
  const query = `
  query GlobalData($locale: SiteLocale) {
    global(locale: $locale) {
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
    variables: { locale },
    preview,
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

export function dynamicPageBySlugQuery(): string {
  return `
    query PagesBySlug($locale: SiteLocale, $slug: String) {
      page(locale: $locale, filter: {slug: {eq: $slug}}) {
        id
        slug
        name
        seo: _seoMetaTags {
          ${META_TAGS_FRAGMENT}
        }
        modules {
          ${moduleExample1Fragment}
          ${moduleExample2Fragment}
          ${moduleExample3Fragment}
        }
      }
    }
    ${RESPONSIVE_IMAGE_FRAGMENT}
  `;
}

export async function getDynamicPageBySlug(
  slug: string,
  preview: boolean,
  locale = 'en',
): Promise<unknown> {
  const query = dynamicPageBySlugQuery();

  const result: Record<string, never> = await datoCmsRequest({
    query,
    preview,
  });
  return result;
}
