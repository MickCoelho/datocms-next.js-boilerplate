// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'en',
  },
  webpack: (config, { dev }) => {
    config.resolve.alias.react = path.join(__dirname, 'node_modules/react');

    // https://github.com/vercel/next.js/issues/10584#issuecomment-766183646
    config.module.rules[1].oneOf.forEach((moduleLoader, i) => {
      // eslint-disable-next-line no-unused-expressions
      Array.isArray(moduleLoader.use) &&
        moduleLoader.use.forEach((l) => {
          if (
            l.loader.includes('css-loader') &&
            !l.loader.includes('postcss-loader')
          ) {
            l.options = {
              ...l.options,
              modules: {
                ...l.options.modules,
                exportLocalsConvention: 'camelCaseOnly',
              },
            };
          }
        });
    });

    return config;
  },
};
