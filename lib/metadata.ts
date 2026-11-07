import type { Metadata } from 'next'
import { SHARE_IMAGE_ALT, SITE_NAME } from '@/data/site'

// Browser tab titles use a pipe separator.
export const SITE_TITLE = 'Yenzo Gervacio | Jr. Software Engineer'
export const SITE_DESCRIPTION =
  'Portfolio of Yenzo Gervacio, Jr. Software Engineer specializing in AI-powered systems, TypeScript, React, Node, and GCP.'

// Production origin. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a custom
// domain). `||` rather than `??` so an empty variable falls back too.
const PRODUCTION_URL = 'https://portfolio-g139.vercel.app'
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL)

// The share images are the app/ file conventions (app/opengraph-image.png,
// app/twitter-image.png). A route that sets its own openGraph/twitter object
// replaces the parent's, images included, so every route references the same
// files explicitly. Keep SHARE_IMAGE_ALT in sync with app/*-image.alt.txt.
const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const
const OG_IMAGE = { url: '/opengraph-image.png', alt: SHARE_IMAGE_ALT, ...SHARE_IMAGE_SIZE }
const TWITTER_IMAGE = { url: '/twitter-image.png', alt: SHARE_IMAGE_ALT, ...SHARE_IMAGE_SIZE }

type RoutePath = `/${string}`

/** Canonical, Open Graph, and Twitter fields for one URL. */
function shareMetadata(shareTitle: string, description: string, path: RoutePath): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_PH',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [TWITTER_IMAGE],
    },
  }
}

/**
 * Root layout defaults: metadataBase, the title template, and the site
 * description. Deliberately no canonical, og:url, or share titles here:
 * children inherit them, and a route that forgot to set its own would
 * otherwise share and index as the homepage. Every route calls
 * homeMetadata() or routeMetadata() instead.
 */
export const rootMetadata: Metadata = {
  metadataBase: SITE_URL,
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
}

/** Metadata for "/": the untemplated site title. */
export function homeMetadata(): Metadata {
  return shareMetadata(SITE_TITLE, SITE_DESCRIPTION, '/')
}

interface RouteMetadataInput {
  title: string
  description: string
  path: RoutePath
}

/**
 * Metadata for any other route, including future ones such as
 * /work/[slug] (pass path: `/work/${slug}`). The <title> goes through the
 * layout's template; the share title is built here to match it.
 */
export function routeMetadata({ title, description, path }: RouteMetadataInput): Metadata {
  return {
    title,
    description,
    ...shareMetadata(`${title} | ${SITE_NAME}`, description, path),
  }
}
