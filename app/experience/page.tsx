import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import PageTransition from '@/components/motion/PageTransition'
import ExperienceCard from '@/components/experience/ExperienceCard'
import { education } from '@/data/education'
import { experiences } from '@/data/experience'
import { experiencePage, routeMeta } from '@/data/site'
import { routeMetadata } from '@/lib/metadata'

export const metadata: Metadata = routeMetadata({ ...routeMeta.experience, path: '/experience' })

export default function ExperiencePage() {
  return (
    <PageTransition>
      <Container>
        <PageHeader eyebrow={experiencePage.eyebrow} title={experiencePage.title} />

        <div className="grid gap-5">
          {experiences.map((item) => (
            <ExperienceCard key={item.id} item={item} headingLevel="h2" />
          ))}
        </div>

        <section aria-labelledby="education-title" className="mt-[clamp(4rem,9vw,7rem)]">
          <h2 id="education-title" className="text-title-1">
            {experiencePage.educationTitle}
          </h2>
          <div className="mt-8 grid gap-5">
            {education.map((item) => (
              <ExperienceCard key={item.id} item={item} headingLevel="h3" />
            ))}
          </div>
        </section>
      </Container>
    </PageTransition>
  )
}
