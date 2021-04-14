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

Then set each variable on `.env`:
- `DATOCMS_API_TOKEN` should be the API token you just copied.
- `DATOCMS_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for the Preview Mode](https://www.datocms.com/docs/next-js/setting-up-next-js-preview-mode).

Your `.env.local` file should look like this:
```bash
DATOCMS_API_TOKEN=...
DATOCMS_PREVIEW_SECRET=...
API_URL=https://graphql.datocms.com/
```

### 3. Install and run the project locally

```bash
npm install -g vercel
npm install
npm run dev
```

### 4. Build the project
**SSG/SSR hybrid**
```bash
npm run build
npm run start
```
**SSG only**
```bash
npm run export
```
Note that both i18n and fallback pages (in /src/pages/[[...slug]]) aren't yet compatible with `next export`. 

## Pages logic
### Dynamic pages
**Definition:**
A dynamic pages is mostly handled by DatoCMS and is composed of: 
 - Name 
 - Slug
 - Modules
The *Name*'s first purpose is to be used to generate the page's title.
The *Slug* is used to generate a unique URL for the created page.
Finally, the *Modules* will compose the page itself. You can see modules as an empty component that will be using the content provided in DatoCMS. When first cloning this project, you'll only be able to add a few modules to your page, but you can easily create new ones (see *Modules* section below).
All dynamic pages will be listed under DatoCMS' *Pages* section.

Most of the dynamic pages' logic will be located in the `/src/pages/[[...slug]].tsx` file.
The `getStaticPaths` method allows for Next.js to generate all the routes when running `npm run build`, while the
`getStaticProps` method queries all the data required for the page to be built. The rest of this function component will simply create the page squeleton and inject the created modules into it. 
### Static pages
**Definition:**
There are occurences when you won't want a modules based page (e.g. a custom page layout that isn't used anywhere else on the website). You can simply create an empty page using DatoCMS and give it a *slug* that starts with `/static/` followed by whatever folder you want to target in your Next.js project. To prevent conflicts with the dynamic pages, all the static pages should be location inside the `/src/pages/static/` directory. 

## Modules
**Definition:**
...
### Create a new CMS model 

### Link new module to pages' model

### Create GraphQL query

### Create React component

## Live previews
## i18n
### DatoCMS
### Next config

## SEO and OG tags

Both SEO and OG tags are directly managed via DatoCMS. It allows for you to have global SEO & OG tags for the website, but also to specifically define some per page.


## Known issues
### next export
Due to the i18n implementation, `next export` isn't supported. If Netlify/Vercel aren't a viable solution, the routing logic can still be updated manually in order to manage locales.
### PostCSS
- [postcss-nested](https://github.com/postcss/postcss-nested/issues/110) As a temprory fix, avoid nesting too much selectors
