# Yenzo Gervacio - Portfolio

Personal portfolio site for Yenzo Gervacio, Jr. Software Engineer. Four routes (Home, Projects, Experience, Contact) built on the Next.js App Router, with Apple-style typography and depth, light and dark mode, and View Transitions between pages. All content is data-driven from the `data/` folder.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4**, CSS-first config; all design tokens live in the `@theme` block in `app/globals.css`
- **Inter** via `next/font`, with the optical-size axis
- **React `<ViewTransition>`** for route transitions; CSS for the hero intro and press feedback (no animation library)
- **lucide-react** for the Technical Stack category icons
- **Resend** (REST API) behind a server action for the contact form
- ESLint 9 with `eslint-config-next`

## Project layout

```
app/            routes (/, /work, /experience, /contact), layout, global styles
components/     site chrome, UI primitives, motion wrappers, per-page sections
data/           projects, experience, education, skills, nav, contact, site copy
lib/            metadata, routing helpers, contact form schema/rate limit/send
types/          shared TypeScript types for the data files
docs/           REDESIGN_HANDOFF.md: design system, architecture, and decisions
```

## Contact form

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (server-only; never prefix with `NEXT_PUBLIC_`). Set the same variables in the hosting provider for production.
