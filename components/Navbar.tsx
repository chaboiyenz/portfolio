'use client'

import type { PageId } from '@/types/portfolio'

interface NavbarProps {
  activePage: PageId
  mobileOpen: boolean
  navigate: (to: PageId) => void
  onBurgerClick: () => void
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home',       label: 'HOME' },
  { id: 'work',       label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact',    label: 'CONTACT' },
]

export default function Navbar({ activePage, mobileOpen, navigate, onBurgerClick }: NavbarProps) {
  return (
    <nav className="relative shrink-0 h-15 border-b border-edge flex items-center justify-between px-12 z-200 max-[1100px]:px-7 max-md:px-5">

      {/* Logo */}
      <button
        className="font-mono text-[13px] font-semibold tracking-[0.1em] text-fg [&_em]:text-accent [&_em]:not-italic"
        onClick={() => navigate('home')}
      >
        <em>Yenzo Gervacio</em>
      </button>

      {/* Desktop nav links */}
      <div className="flex gap-9 items-center max-[1100px]:gap-6 max-md:hidden">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            data-active={activePage === id}
            className="relative pb-0.5 font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-muted transition-colors duration-200
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-accent
              after:transition-[width] after:duration-[350ms] after:ease-[cubic-bezier(0.16,1,0.3,1)]
              hover:text-fg hover:after:w-full
              data-[active=true]:text-accent data-[active=true]:after:w-full"
            onClick={() => navigate(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CTA — hidden below 1100px */}
      <button
        className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-bg bg-accent px-5 py-[9px] transition-[opacity,transform] duration-200 hover:opacity-85 hover:-translate-y-px max-[1100px]:hidden"
        onClick={() => navigate('contact')}
      >
        GET IN TOUCH
      </button>

      {/* Burger — mobile only */}
      <button
        className="hidden flex-col justify-center gap-[5px] w-8 h-8 p-1 max-md:flex"
        aria-label="Menu"
        onClick={onBurgerClick}
      >
        <span className={`block w-full h-px bg-fg transition-[transform,opacity] duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
        <span className={`block w-full h-px bg-fg transition-[transform,opacity] duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-full h-px bg-fg transition-[transform,opacity] duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
      </button>
    </nav>
  )
}
