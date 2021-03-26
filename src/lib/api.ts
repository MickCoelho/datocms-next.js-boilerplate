import datoCmsRequest from './datocms';

import {
  RESPONSIVE_IMAGE_FRAGMENT,
  META_TAGS_FRAGMENT,
  testModule,
} from './api-fragments';

export async function getSiteMetaTags() {
  const query = `
    query AppQuery {
      site: _site {
        favicon: faviconMetaTags {
          ${META_TAGS_FRAGMENT}
        }
      }
    }
  `;
  const result = await datoCmsRequest({
    query,
  });
  return result.site;
}

export async function getAllPagesSlugs() {
  const query = `
    {
      allPages {
        id
        slug
        title
      }
    }
  `;
  const result = await datoCmsRequest({
    query,
  });
  return result.allPages;
}

export async function getDynamicPageBySlug(slug) {
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
  const result = await datoCmsRequest({
    query,
    variables: { slug },
  });

  const pageData = result.allPages[0];

  return pageData;
}
