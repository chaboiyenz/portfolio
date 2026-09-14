'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TechStackSection } from '@/components/TechStack'
import type { PageId } from '@/types/portfolio'

interface HomePageProps {
  navigate: (to: PageId) => void
}

const EASE = [0.16, 1, 0.3, 1] as const
const REVEAL_DURATION = 0.95
const HIDDEN_Y = '108%'

// 'pending' is the server-rendered state. The decision to play or skip is
// made after mount so the first client render matches the server exactly.
type RevealMode = 'pending' | 'play' | 'skip'

// The hero reveal is a first-load moment only. HomePage unmounts on
// navigation, so a module-scoped flag is what remembers it already played.
// It is only read inside useEffect, so it never affects server output.
let heroRevealPlayed = false

function LineUp({ children, delay, mode }: { children: React.ReactNode; delay: number; mode: RevealMode }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: HIDDEN_Y }}
        animate={{ y: mode === 'pending' ? HIDDEN_Y : 0 }}
        transition={mode === 'play' ? { duration: REVEAL_DURATION, ease: EASE, delay } : { duration: 0 }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// false during SSR and hydration, true once the client is in charge.
const noopSubscribe = () => () => {}
const useHydrated = () => useSyncExternalStore(noopSubscribe, () => true, () => false)

export default function HomePage({ navigate }: HomePageProps) {
  const reduceMotion = useReducedMotion()
  const hydrated = useHydrated()

  // Once the reveal has started, framer keeps animating toward y:0 even if the
  // flag flips this to 'skip' on a later render, because the target is unchanged.
  const revealMode: RevealMode = !hydrated ? 'pending' : heroRevealPlayed || reduceMotion ? 'skip' : 'play'

  useEffect(() => {
    heroRevealPlayed = true
  }, [])

  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-12 pt-28 pb-24 flex flex-col max-md:px-5 max-md:pt-20 max-md:pb-20">

      {/* Hero name */}
      <h1 className="text-[clamp(4.5rem,13vw,11.5rem)] font-bold leading-[0.87] tracking-[-0.04em] mb-9 uppercase">
        <LineUp delay={0} mode={revealMode}>YENZO</LineUp>
        <LineUp delay={0.14} mode={revealMode}>
          GERVACIO<span className="text-accent animate-blink motion-reduce:animate-none">_</span>
        </LineUp>
      </h1>

      {/* Role + actions + tagline */}
      <div className="flex items-end justify-between gap-12 mb-15 flex-wrap max-md:flex-col max-md:gap-7">
        <div>
          <div className="font-ui text-[12px] tracking-[0.06em] uppercase text-muted mb-6">
            Jr. Software Engineer — 2026
          </div>
          <div className="flex gap-3.5 items-center flex-wrap">
            <button
              className="bg-accent text-bg font-ui text-[11px] font-medium tracking-[0.06em] uppercase px-7 py-3.5 inline-block transition-opacity duration-120 ease-out hover:opacity-[0.88]"
              onClick={() => navigate('work')}
            >
              VIEW MY PROJECTS →
            </button>
            <button
              className="border border-edge text-fg font-ui text-[11px] font-medium tracking-[0.06em] uppercase px-7 py-3.5 inline-block transition-colors duration-120 ease-out hover:border-accent-soft hover:text-accent-soft"
              onClick={() => navigate('contact')}
            >
              CONTACT ME
            </button>
          </div>
        </div>
        <p className="max-w-[300px] text-right text-[14px] leading-[1.7] text-muted max-md:text-left max-md:max-w-full">
          Building intelligent systems with TypeScript, React &amp; Django — wired with AI pipelines and enterprise integrations.
        </p>
      </div>

      <TechStackSection />
    </div>
  )
}
