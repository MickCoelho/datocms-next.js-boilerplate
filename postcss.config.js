module.exports = {
  plugins: [
    'postcss-import',
    'postcss-custom-media',
    'postcss-global-import',
    'postcss-mixins',
    'postcss-custom-properties',
    'postcss-easings',
    'postcss-nested',
    'postcss-for',
    'postcss-calc',
    'postcss-math',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
          'nesting-rules': true,
        },
      },
    ],
  ],
};
