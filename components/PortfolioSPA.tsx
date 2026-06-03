'use client'

import { useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import WipePanel from '@/components/WipePanel'
import HomePage from '@/components/pages/HomePage'
import WorkPage from '@/components/pages/WorkPage'
import ExperiencePage from '@/components/pages/ExperiencePage'
import ContactPage from '@/components/pages/ContactPage'
import type { PageId, WipePhase } from '@/types/portfolio'

export default function PortfolioSPA() {
  const [activePage, setActivePage]   = useState<PageId>('home')
  const [pendingPage, setPendingPage] = useState<PageId | null>(null)
  const [wipePhase, setWipePhase]     = useState<WipePhase>('idle')
  const [mobileOpen, setMobileOpen]   = useState(false)

  const navigate = useCallback((to: PageId) => {
    if (to === activePage || wipePhase !== 'idle') return
    setMobileOpen(false)
    setPendingPage(to)
    setWipePhase('covering')
  }, [activePage, wipePhase])

  function handleCoveringComplete() {
    if (pendingPage) setActivePage(pendingPage)
    setPendingPage(null)
    setWipePhase('revealing')
  }

  function handleRevealingComplete() {
    setWipePhase('idle')
  }

  return (
    <div className="fixed inset-0 flex flex-col">
      <Navbar
        activePage={activePage}
        mobileOpen={mobileOpen}
        navigate={navigate}
        onBurgerClick={() => setMobileOpen((o) => !o)}
      />

      <MobileMenu
        isOpen={mobileOpen}
        activePage={activePage}
        navigate={navigate}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 relative overflow-hidden">
        {activePage === 'home'       && <HomePage       key="home"       navigate={navigate} />}
        {activePage === 'work'       && <WorkPage       key="work" />}
        {activePage === 'experience' && <ExperiencePage key="experience" />}
        {activePage === 'contact'    && <ContactPage    key="contact" />}
      </div>

      <WipePanel
        wipePhase={wipePhase}
        onCoveringComplete={handleCoveringComplete}
        onRevealingComplete={handleRevealingComplete}
      />
    </div>
  )
}
