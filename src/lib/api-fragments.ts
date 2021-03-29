export const RESPONSIVE_IMAGE_FRAGMENT = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

const MODULE_BASE_FRAGMENT = `
  type: _modelApiKey
  id
`;

export const META_TAGS_FRAGMENT = `
  attributes
  content
  tag
`;

export const moduleExample1Fragment = `
  ... on ModuleExample1Record {
    ${MODULE_BASE_FRAGMENT}
    headline
    image {
      responsiveImage(imgixParams: {auto: format, q: 60, fit: max, w: 1800})  {
        ...responsiveImageFragment
      }
    }
  }
`;

export const moduleExample2Fragment = `
  ... on ModuleExample2Record {
    ${MODULE_BASE_FRAGMENT}
    ctaLabel
    ctaUrl
  }
`;

export const moduleExample3Fragment = `
  ... on ModuleExample3Record {
    ${MODULE_BASE_FRAGMENT}
    content {
      value
    }
  }
`;
