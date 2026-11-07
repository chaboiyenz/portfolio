# Yenzo Gervacio - Portfolio

Personal portfolio site for Yenzo Gervacio, Jr. Software Engineer. A single-page site with four sections (Home, Projects, Experience, Contact) switched in place with a full-screen wipe transition. All content is data-driven from the `data/` folder.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4**, CSS-first config — all design tokens live in the `@theme` block in `app/globals.css`
- **framer-motion 12** for the page wipe and the first-load hero reveal
- **next/font** loading Archivo (display and body) and Inter Tight (UI labels)
- ESLint 9 with `eslint-config-next`

## Project layout

```
app/            root layout, global styles, the single route
components/     SPA shell, navbar, page transition, section pages, row components
data/           projects, experience, education, skills, nav items, contact links
types/          shared TypeScript types for the data files
```

To change content, edit the files in `data/`. To change the look, edit the tokens in `app/globals.css` and the Tailwind classes in `components/`.

## Running locally

Requires Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
