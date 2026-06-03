'use client'

import { motion } from 'framer-motion'
import type { WipePhase } from '@/types/portfolio'

interface WipePanelProps {
  wipePhase: WipePhase
  onCoveringComplete: () => void
  onRevealingComplete: () => void
}

export default function WipePanel({ wipePhase, onCoveringComplete, onRevealingComplete }: WipePanelProps) {
  const xTarget = wipePhase === 'idle' ? '-100%' : wipePhase === 'covering' ? '0%' : '100%'

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: xTarget }}
      transition={
        wipePhase === 'idle'
          ? { duration: 0 }
          : { duration: 0.42, ease: [0.76, 0, 0.24, 1] }
      }
      onAnimationComplete={() => {
        if (wipePhase === 'covering') onCoveringComplete()
        else if (wipePhase === 'revealing') onRevealingComplete()
      }}
      className="fixed inset-0 bg-accent z-9999 pointer-events-none"
    />
  )
}
