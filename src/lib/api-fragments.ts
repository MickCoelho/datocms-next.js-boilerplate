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

export const testModule = `
  ... on ModuleTest {
    ${MODULE_BASE_FRAGMENT}
  }
`;
