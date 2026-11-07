import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import TechStack from '@/components/home/TechStack'
import PageTransition from '@/components/motion/PageTransition'
import { homeMetadata } from '@/lib/metadata'

export const metadata: Metadata = homeMetadata()

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <TechStack />
    </PageTransition>
  )
}
