'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from '@/data/nav'
import { SITE_NAME, a11y, navCta } from '@/data/site'
import { hrefFor, isActivePath } from '@/lib/routes'

const MENU_ID = 'site-menu'

// Nav labels are stored uppercase in data/nav.ts. The design sets them in
// sentence case via CSS so the stored strings stay untouched.
const SENTENCE_CASE = 'inline-block lowercase first-letter:uppercase'

// The bar's controls are visually compact; this pseudo-element grows each hit
// area to the full 48px bar height without changing how it looks.
const TALL_HIT_AREA = "relative after:absolute after:inset-x-0 after:-inset-y-2 after:content-['']"

const GUTTERS =
  'pr-[max(var(--spacing-gutter),env(safe-area-inset-right))] pl-[max(var(--spacing-gutter),env(safe-area-inset-left))]'

export default function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the menu whenever the route changes (link tap, back button, etc.).
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      // Focus may be inside the menu that is about to hide; return it to the toggle.
      menuButtonRef.current?.focus()
    }
    // A tap anywhere outside the bar and the panel dismisses it.
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (headerRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  return (
    <>
      {/* Named so it stays anchored (not cross-faded) during page transitions;
          see the site-header rules in globals.css. */}
      <header
        ref={headerRef}
        className="material-bar sticky top-0 z-50 pt-[env(safe-area-inset-top)] [view-transition-name:site-header]"
      >
        <nav
          aria-label={a11y.primaryNav}
          className={`mx-auto flex h-nav w-full max-w-content items-center justify-between ${GUTTERS}`}
        >
          <Link href="/" className="-mx-2 rounded-lg px-2 py-2.5 text-callout font-semibold">
            {SITE_NAME}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ id, label }) => {
              const active = isActivePath(id, pathname)
              return (
                <li key={id}>
                  <Link
                    href={hrefFor(id)}
                    aria-current={active ? 'page' : undefined}
                    className={`${TALL_HIT_AREA} block rounded-full px-3 py-1.5 text-footnote text-secondary hover:text-label aria-[current=page]:font-medium aria-[current=page]:text-label`}
                  >
                    <span className={SENTENCE_CASE}>{label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={hrefFor('contact')}
              className={`${TALL_HIT_AREA} press hidden min-h-8 items-center rounded-full bg-accent px-3.5 text-footnote font-medium text-on-accent hover:bg-accent-hover md:inline-flex`}
            >
              {navCta}
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="press -mr-2 grid size-11 place-items-center rounded-full text-label md:hidden"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label={menuOpen ? a11y.closeMenu : a11y.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {/* Two bars that rotate into an X; styled by .menu-bar in globals.css. */}
              <span className="relative block size-6" data-open={menuOpen ? '' : undefined} aria-hidden>
                <span className="menu-bar absolute top-[8.25px] right-[4.5px] left-[4.5px] h-[1.5px] rounded-full bg-current" />
                <span className="menu-bar absolute top-[14.25px] right-[4.5px] left-[4.5px] h-[1.5px] rounded-full bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* A sibling of the header, not a child: nested backdrop-filters only blur
          what's inside their parent, so the panel needs its own material layer
          over the page. Fixed just under the bar so opening it never pushes the
          page down. */}
      <div
        ref={menuRef}
        id={MENU_ID}
        data-open={menuOpen ? '' : undefined}
        className="menu-panel material-bar fixed inset-x-0 top-[calc(var(--spacing-nav)+env(safe-area-inset-top))] z-40 shadow-float md:hidden"
      >
        <ul className={`mx-auto max-w-content pt-2 pb-8 ${GUTTERS}`}>
          {NAV_ITEMS.map(({ id, label }) => {
            const active = isActivePath(id, pathname)
            return (
              <li key={id}>
                <Link
                  href={hrefFor(id)}
                  aria-current={active ? 'page' : undefined}
                  className="-mx-2 block rounded-xl px-2 py-2.5 text-title-2 text-secondary aria-[current=page]:text-label"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={SENTENCE_CASE}>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
