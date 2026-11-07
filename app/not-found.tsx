import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { PrimaryAction } from '@/components/ui/actions'
import PageTransition from '@/components/motion/PageTransition'
import { notFoundPage } from '@/data/site'

// Next already sends `robots: noindex` with 404 responses.
export const metadata: Metadata = {
  title: notFoundPage.title.replace(/\.$/, ''),
}

export default function NotFound() {
  return (
    <PageTransition>
      <Container>
        <PageHeader eyebrow={notFoundPage.eyebrow} title={notFoundPage.title} />
        <p className="max-w-prose text-intro text-secondary">{notFoundPage.body}</p>
        <PrimaryAction href="/" className="mt-10">
          {notFoundPage.cta}
        </PrimaryAction>
      </Container>
    </PageTransition>
  )
}
