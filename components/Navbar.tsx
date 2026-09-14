'use client'

import { NAV_ITEMS } from '@/data/nav'
import type { PageId } from '@/types/portfolio'

interface NavbarProps {
  activePage: PageId
  mobileOpen: boolean
  navigate: (to: PageId) => void
  onBurgerClick: () => void
}

export default function Navbar({ activePage, mobileOpen, navigate, onBurgerClick }: NavbarProps) {
  return (
    <nav className="relative shrink-0 h-15 border-b border-edge flex items-center justify-between px-12 z-200 max-[1100px]:px-7 max-md:px-5">

      {/* Logo */}
      <button
        className="font-ui text-[13px] font-medium tracking-[0.06em] text-fg [&_em]:text-accent [&_em]:not-italic"
        onClick={() => navigate('home')}
      >
        <em>Yenzo Gervacio</em>
      </button>

      {/* Desktop nav links */}
      <div className="flex gap-9 items-center max-[1100px]:gap-6 max-md:hidden">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activePage === id
          return (
            <button
              key={id}
              data-active={isActive}
              aria-current={isActive ? 'page' : undefined}
              className="relative pb-0.5 font-ui text-[11px] font-medium tracking-[0.06em] uppercase text-muted transition-colors duration-120 ease-out
                hover:text-accent-soft
                data-[active=true]:text-accent-soft
                data-[active=true]:after:content-[''] data-[active=true]:after:absolute data-[active=true]:after:left-0 data-[active=true]:after:bottom-0 data-[active=true]:after:h-px data-[active=true]:after:w-full data-[active=true]:after:bg-accent-soft"
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* CTA — hidden below 1100px */}
      <button
        className="font-ui text-[11px] font-medium tracking-[0.06em] uppercase text-bg bg-accent px-5 py-[9px] transition-opacity duration-120 ease-out hover:opacity-85 max-[1100px]:hidden"
        onClick={() => navigate('contact')}
      >
        GET IN TOUCH
      </button>

      {/* Burger — mobile only */}
      <button
        className="hidden flex-col justify-center gap-[5px] w-8 h-8 p-1 max-md:flex"
        aria-label="Menu"
        aria-expanded={mobileOpen}
        onClick={onBurgerClick}
      >
        <span className={`block w-full h-px bg-fg transition-[transform,opacity] duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
        <span className={`block w-full h-px bg-fg transition-[transform,opacity] duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-full h-px bg-fg transition-[transform,opacity] duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
      </button>
    </nav>
  )
}
