import type { CSSProperties } from 'react'
import Container from '@/components/ui/Container'
import { PrimaryAction, TextAction } from '@/components/ui/actions'
import { hero } from '@/data/site'
import { hrefFor } from '@/lib/routes'

/** Position in the first-load intro sequence; multiplied by --intro-stagger in globals.css.
 *  `visibleFrom` sets the starting opacity for large text that must be readable
 *  (and count as painted for LCP) from the first frame. */
const step = (n: number, visibleFrom?: number): CSSProperties =>
  ({ '--intro-step': n, ...(visibleFrom !== undefined && { '--intro-from': visibleFrom }) }) as CSSProperties

const LARGE_TEXT_FROM = 0.35

export default function Hero() {
  return (
    <section className="pt-[clamp(5rem,14vw,11rem)] pb-[clamp(4.5rem,11vw,9rem)] text-center">
      <Container>
        <p className="intro text-callout font-semibold text-secondary" style={step(0)}>
          {hero.eyebrow}
        </p>
        <h1 className="intro mt-4 text-hero" style={step(1, LARGE_TEXT_FROM)}>
          {hero.title}
        </h1>
        <p className="intro mx-auto mt-6 max-w-[36ch] text-intro text-secondary" style={step(2, LARGE_TEXT_FROM)}>
          {hero.summary}
        </p>
        <div
          className="intro mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          style={step(3)}
        >
          <PrimaryAction href={hrefFor('work')}>{hero.primaryCta}</PrimaryAction>
          <TextAction href={hrefFor('contact')}>{hero.secondaryCta}</TextAction>
        </div>
      </Container>
    </section>
  )
}
