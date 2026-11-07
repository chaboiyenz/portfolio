import type { PageId } from '@/types/portfolio'

const PAGE_HREFS: Record<PageId, string> = {
  home: '/',
  work: '/work',
  experience: '/experience',
  contact: '/contact',
}

export function hrefFor(id: PageId): string {
  return PAGE_HREFS[id]
}

export function isActivePath(id: PageId, pathname: string): boolean {
  const href = PAGE_HREFS[id]
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

/** URL-safe identifier derived from a project title, e.g. "MANEHO AI" → "maneho-ai". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    // Strip combining accents (U+0300 to U+036F) left by NFKD, e.g. "é" → "e".
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Display host for an external link, e.g. "https://maneho-ai.web.app/" → "maneho-ai.web.app". */
export function displayHost(href: string): string {
  try {
    return new URL(href).host.replace(/^www\./, '')
  } catch {
    return href
  }
}
