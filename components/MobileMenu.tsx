'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS } from '@/data/nav'
import type { PageId } from '@/types/portfolio'

interface MobileMenuProps {
  isOpen: boolean
  activePage: PageId
  navigate: (to: PageId) => void
  onClose: () => void
}

export default function MobileMenu({ isOpen, activePage, navigate, onClose }: MobileMenuProps) {
  function handleClick(id: PageId) {
    navigate(id)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-15 inset-x-0 bottom-0 bg-bg z-150 flex flex-col justify-center items-center gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        >
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activePage === id
            return (
              <button
                key={id}
                data-active={isActive}
                aria-current={isActive ? 'page' : undefined}
                className="font-sans text-[clamp(2.5rem,10vw,4rem)] font-bold tracking-[-0.03em] uppercase text-muted transition-colors duration-120 ease-out hover:text-accent data-[active=true]:text-accent"
                onClick={() => handleClick(id)}
              >
                {label}
              </button>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
