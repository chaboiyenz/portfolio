'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

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

export default function ContactPage() {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-12 pt-28 pb-24 flex flex-col max-md:px-5 max-md:pt-22 max-md:pb-20">

      <FadeRise delay={0} className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent opacity-70 mb-5">
        04 — GET IN TOUCH
      </FadeRise>

      <FadeRise delay={0.06}>
        <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.88] tracking-[-0.04em] uppercase mb-14">
          LET&apos;S<br />BUILD<br />TOGETHER.
        </h2>
      </FadeRise>

      <FadeRise delay={0.18}>
        <a
          href="mailto:marvey.gervacio@gmail.com"
          className="group flex items-center justify-between py-[22px] border-t border-edge border-b border-edge max-w-[640px] transition-colors duration-200 text-fg hover:text-accent"
        >
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-1">Email</div>
            <div className="text-[clamp(1rem,2.5vw,1.4rem)] font-semibold transition-colors duration-200 group-hover:text-accent">
              marvey.gervacio@gmail.com
            </div>
          </div>
          <div className="text-[1.25rem] opacity-[0.18] transition-[opacity,color,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-[7px]">
            →
          </div>
        </a>
      </FadeRise>

      <FadeRise delay={0.26}>
        <a
          href="tel:09351612607"
          className="group flex items-center justify-between py-[22px] border-b border-edge max-w-[640px] transition-colors duration-200 text-fg hover:text-accent"
        >
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-1">Phone</div>
            <div className="text-[clamp(1rem,2.5vw,1.4rem)] font-semibold transition-colors duration-200 group-hover:text-accent">
              0935-161-2607
            </div>
          </div>
          <div className="text-[1.25rem] opacity-[0.18] transition-[opacity,color,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-[7px]">
            →
          </div>
        </a>
      </FadeRise>

      <FadeRise delay={0.36} className="mt-16 font-mono text-[10px] tracking-[0.2em] uppercase text-[rgba(242,242,242,0.1)]">
        © 2026 Yenzo Gervacio &nbsp;·&nbsp; Jr. Software Engineer
      </FadeRise>
    </div>
  )
}
