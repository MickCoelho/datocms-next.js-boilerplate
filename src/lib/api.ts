import datoCmsRequest from './datocms';
import { User } from '../interfaces';
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

export async function getAllPagesSlugs(): Promise<unknown> {
  const query = `
    {
      allPages {
        id
        slug
        title
      }
    }
  `;
  const result: Record<string, unknown> = await datoCmsRequest({
    query,
  });
  return result.allPages;
}

export async function getDynamicPageBySlug(slug: string): Promise<unknown> {
  const query = `
    query PagesBySlug($slug: String) {
      allPages(filter: {slug: {eq: $slug}}) {
        id
        slug
        seo: _seoMetaTags {
          ${META_TAGS_FRAGMENT}
        }
        modules {
          ${testModule}
        }
      }
    }
    ${RESPONSIVE_IMAGE_FRAGMENT}
  `;
  const result: Record<string, never> = await datoCmsRequest({
    query,
    variables: { slug },
  });

  const pageData: Array<never> = result.allPages;

  return pageData[0];
}
