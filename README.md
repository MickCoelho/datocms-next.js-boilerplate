# DatoCMS / Next.js boilerplate

## Architecture

- TypeScript
- Next.js
- React
- Redux/rematch
- GraphQL
- PostCSS/CSS Modules## How to use
## Features
- [x] Type check & eslint on commit
- [ ] Atomic design approach (via DatoCMS)
- [ ] ...
## How to use
### Duplicate DatoCMS template
...
### Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Your `.env.local` file should look like this:

```bash
DATOCMS_API_TOKEN=...
API_URL=https://graphql.datocms.com/
```

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

### Build the website

### Known issues

- [postcss-nested](https://github.com/postcss/postcss-nested/issues/110) As a temprory fix, avoid nesting too much

### Main entry point

To allow for dynamic pages created by the CMS, most of the pages' logic will be located in the
`./src/pages/[[...slug]].js` file.

The `getStaticPaths` method allows for Next.js to generate all the routes when running `npm run export`, while the
`getStaticProps` method queries all the data required for the page to be built. Note that when statically generated
(using `npm run export`), `getStaticProps` method isn't called anymore, instead, all the data is attached to the page as
a json file (but you don't need to worry about this).

### SEO and OG tags

Both SEO and OG tags are directly managed via DatoCMS. It allow for you to have global SEO & OG tags for the website, but also to specifically define some per page.
