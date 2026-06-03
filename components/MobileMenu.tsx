'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { PageId } from '@/types/portfolio'

interface MobileMenuProps {
  isOpen: boolean
  activePage: PageId
  navigate: (to: PageId) => void
  onClose: () => void
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home',       label: 'HOME' },
  { id: 'work',       label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact',    label: 'CONTACT' },
]

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
          transition={{ duration: 0.2 }}
        >
          {NAV_ITEMS.map(({ id, label }, i) => (
            <motion.button
              key={id}
              data-active={activePage === id}
              className="font-sans text-[clamp(2.5rem,10vw,4rem)] font-bold tracking-[-0.03em] uppercase text-muted transition-colors duration-200 hover:text-accent data-[active=true]:text-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              onClick={() => handleClick(id)}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
