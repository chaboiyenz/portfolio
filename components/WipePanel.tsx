'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { WipePhase } from '@/types/portfolio'

interface WipePanelProps {
  wipePhase: WipePhase
  onCoveringComplete: () => void
  onRevealingComplete: () => void
}

const WIPE_DURATION = 0.42
const REDUCED_DURATION = 0.12
const WIPE_EASE = [0.76, 0, 0.24, 1] as const

export default function WipePanel({ wipePhase, onCoveringComplete, onRevealingComplete }: WipePanelProps) {
  const reduceMotion = useReducedMotion()

  const xTarget = wipePhase === 'idle' ? '-100%' : wipePhase === 'covering' ? '0%' : '100%'
  const opacityTarget = wipePhase === 'covering' ? 1 : 0

  // The initial state is the same on server and client (offscreen left) so
  // hydration matches; useReducedMotion only resolves on the client.
  // Reduced motion: the panel then sits in place and fades instead of sliding.
  const initial = { x: '-100%', opacity: 1 }
  const animate = reduceMotion ? { x: '0%', opacity: opacityTarget } : { x: xTarget, opacity: 1 }

  const transition =
    wipePhase === 'idle'
      ? { duration: 0 }
      : reduceMotion
        ? { duration: REDUCED_DURATION, ease: 'easeOut' as const }
        : { duration: WIPE_DURATION, ease: WIPE_EASE }

  // The accent is a 2px moving edge, not a field. The panel enters from the
  // left, so its right side leads while covering; when it exits to the right,
  // its left side is the edge that sweeps across the revealed page.
  const edgeClass = wipePhase === 'revealing' ? 'border-l-2' : 'border-r-2'

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      onAnimationComplete={() => {
        if (wipePhase === 'covering') onCoveringComplete()
        else if (wipePhase === 'revealing') onRevealingComplete()
      }}
      className={`fixed inset-0 bg-surface ${edgeClass} border-accent z-9999 pointer-events-none`}
    />
  )
}
