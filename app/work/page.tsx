import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import PageTransition from '@/components/motion/PageTransition'
import ProjectList from '@/components/work/ProjectList'
import { projects } from '@/data/projects'
import { routeMeta, workPage } from '@/data/site'
import { routeMetadata } from '@/lib/metadata'
import { slugify } from '@/lib/routes'

export const metadata: Metadata = routeMetadata({ ...routeMeta.work, path: '/work' })

// Each project's slug is its card id, its URL fragment, and its shared-title
// view-transition name. Duplicates would silently break all three, so fail
// the build instead. Runs at build time; this page is static.
const duplicateSlugs = projects
  .map((p) => slugify(p.title))
  .filter((slug, i, all) => all.indexOf(slug) !== i)
if (duplicateSlugs.length > 0) {
  throw new Error(`data/projects.ts: project titles must produce unique slugs; duplicated: ${duplicateSlugs.join(', ')}`)
}

export default function WorkPage() {
  return (
    <PageTransition>
      <Container>
        <PageHeader eyebrow={workPage.eyebrow} title={workPage.title} />
        <ProjectList projects={projects} />
      </Container>
    </PageTransition>
  )
}
