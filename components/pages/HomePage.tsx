'use client'

import { motion } from 'framer-motion'
import { TechStackAnimated } from '@/components/TechStack'
import type { PageId } from '@/types/portfolio'

interface HomePageProps {
  navigate: (to: PageId) => void
}

const EASE = [0.16, 1, 0.3, 1] as const

function LineUp({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function FadeRise({ children, delay, className }: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-12 pt-28 pb-24 flex flex-col max-md:px-5 max-md:pt-20 max-md:pb-20">

      {/* Hero name */}
      <h1 className="text-[clamp(4.5rem,13vw,11.5rem)] font-bold leading-[0.87] tracking-[-0.04em] mb-9 uppercase">
        <LineUp delay={0}>YENZO</LineUp>
        <LineUp delay={0.14}>
          GERVACIO<span className="text-accent animate-blink">_</span>
        </LineUp>
      </h1>

      {/* Role + actions + tagline */}
      <div className="flex items-end justify-between gap-12 mb-15 flex-wrap max-md:flex-col max-md:gap-7">
        <div>
          <FadeRise delay={0.28} className="font-mono text-[12px] tracking-[0.18em] uppercase text-muted mb-6">
            Jr. Software Engineer — 2026
          </FadeRise>
          <FadeRise delay={0.36} className="flex gap-3.5 items-center flex-wrap">
            <button
              className="bg-accent text-bg font-mono text-[11px] font-bold tracking-[0.14em] uppercase px-7 py-3.5 inline-block transition-[transform,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-[0.88]"
              onClick={() => navigate('work')}
            >
              VIEW MY PROJECTS →
            </button>
            <button
              className="border border-edge text-fg font-mono text-[11px] font-medium tracking-[0.14em] uppercase px-7 py-3.5 inline-block transition-[border-color,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-fg hover:-translate-y-0.5"
              onClick={() => navigate('contact')}
            >
              CONTACT ME
            </button>
          </FadeRise>
        </div>
        <FadeRise delay={0.44} className="max-w-[300px] text-right text-[14px] leading-[1.7] text-muted max-md:text-left max-md:max-w-full">
          Building intelligent systems with TypeScript, React &amp; Django — wired with AI pipelines and enterprise integrations.
        </FadeRise>
      </div>

      {/* Stats */}
      <FadeRise delay={0.52} className="grid grid-cols-3 border border-edge max-w-[400px]">
        <div className="px-[22px] py-4 border-r border-edge">
          <div className="font-mono text-[1.6rem] font-bold leading-none">5+</div>
          <div className="text-[10px] tracking-[0.12em] uppercase text-muted mt-1">Projects</div>
        </div>
        <div className="px-[22px] py-4 border-r border-edge">
          <div className="font-mono text-[1.6rem] font-bold leading-none text-accent">128</div>
          <div className="text-[10px] tracking-[0.12em] uppercase text-muted mt-1">Users</div>
        </div>
        <div className="px-[22px] py-4">
          <div className="font-mono text-[1.6rem] font-bold leading-none">30%</div>
          <div className="text-[10px] tracking-[0.12em] uppercase text-muted mt-1">Efficiency</div>
        </div>
      </FadeRise>

      <TechStackAnimated />
    </div>
  )
}
