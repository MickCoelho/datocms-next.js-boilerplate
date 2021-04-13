# DatoCMS / Next.js boilerplate

## Architecture

- TypeScript
- Next.js
- React
- Redux/rematch
- GraphQL
- PostCSS/CSS Modules
## Features
- Type check & eslint
- Dynamic page creation (via DatoCMS)
- Atomic design approach (via DatoCMS)
- Internationalization
- Preview mode (draft/published models)
## How to use
### 1. Clone DatoCMS Project
[![Clone DatoCMS project](https://dashboard.datocms.com/clone/button.svg)](https://dashboard.datocms.com/clone?projectId=45226&name=B-Reel+Next.js%2FDatoCMS+boilerplate)
### 2. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Your `.env.local` file should look like this:

```bash
DATOCMS_API_TOKEN=...
DATOCMS_PREVIEW_SECRET=...
API_URL=https://graphql.datocms.com/
```

### 3. Run Next.js in development mode

```bash
npm install -g vercel
npm install
npm run dev
```

### 4. Build the website
**SSG/SSR hybrid**
```bash
npm run build
npm run start
```
**SSG only**
...

## Pages logic
### Dynamic pages
**Definition:**
...

To allow for dynamic pages created by the CMS, most of the dynamic pages' logic will be located in the
`/src/pages/[[...slug]].js` file.

The `getStaticPaths` method allows for Next.js to generate all the routes when running `npm run export`, while the
`getStaticProps` method queries all the data required for the page to be built. Note that when statically generated
(using `npm run export`), `getStaticProps` method isn't called anymore, instead, all the data is attached to the page as
a json file (but you don't need to worry about this).
### Static pages
**Definition:**
...

To prevent conflicts with the dynamic pages, all the static pages should be location inside the `/src/pages/static/` directory. 

## Modules logic
**Definition:**
...
### Create a new model 

### Link new module to pages' model

### Create GraphQL query

### Create React component

## Live previews
## i18n
### DatoCMS
### Next config

## SEO and OG tags

Both SEO and OG tags are directly managed via DatoCMS. It allow for you to have global SEO & OG tags for the website, but also to specifically define some per page.


## Known issues
### next export
Due to the i18n implementation, `next export` isn't supported. If Netlify/Vercel aren't a viable solution, the routing logic can still be updated manually in order to manage locales.
### PostCSS
- [postcss-nested](https://github.com/postcss/postcss-nested/issues/110) As a temprory fix, avoid nesting too much selectors
