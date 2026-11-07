// DEV ONLY: renders the real components against demo and worst-case data
// (break-ui). Returns 404 outside `next dev`; never part of the shipped site.
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import ContactTile from '@/components/contact/ContactTile'
import ExperienceCard from '@/components/experience/ExperienceCard'
import TechStack from '@/components/home/TechStack'
import ProjectList from '@/components/work/ProjectList'
import { contactLinks } from '@/data/contact'
import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { worstContacts, worstExperience, worstProjects, worstSkills } from '@/data/fixtures/worst-case'

export const metadata: Metadata = { title: 'Break UI (dev)', robots: { index: false, follow: false } }

const STATES = ['demo', 'worst', 'one', 'empty'] as const
type DataState = (typeof STATES)[number]

const LABELS: Record<DataState, string> = { demo: 'Demo data', worst: 'Worst case', one: 'One', empty: 'Empty' }

function datasetFor(state: DataState) {
  switch (state) {
    case 'worst':
      return { projects: worstProjects, experience: worstExperience, skills: worstSkills, contacts: worstContacts }
    case 'one':
      return { projects: projects.slice(0, 1), experience: experiences.slice(0, 1), skills: skillCategories.slice(0, 1), contacts: contactLinks.slice(0, 1) }
    case 'empty':
      return { projects: [], experience: [], skills: [], contacts: [] }
    default:
      return { projects, experience: experiences, skills: skillCategories, contacts: contactLinks }
  }
}

export default async function BreakUiPage({ searchParams }: { searchParams: Promise<{ data?: string }> }) {
  if (process.env.NODE_ENV !== 'development') notFound()

  const { data } = await searchParams
  const state: DataState = STATES.includes(data as DataState) ? (data as DataState) : 'demo'
  const set = datasetFor(state)

  return (
    <>
      <Container className="pt-12">
        <section aria-label="Projects" className="grid gap-6">
          <ProjectList projects={set.projects} />
        </section>
        <section aria-label="Experience" className="mt-16 grid gap-5">
          {set.experience.map((item) => (
            <ExperienceCard key={item.id} item={item} headingLevel="h2" />
          ))}
        </section>
      </Container>
      <TechStack categories={set.skills} />
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {set.contacts.map((link) => (
            <li key={link.label} className="grid">
              <ContactTile link={link} />
            </li>
          ))}
        </ul>
      </Container>

      {/* The toggle: plain chrome, not part of the design under test. */}
      <nav
        aria-label="Dataset"
        className="fixed bottom-4 left-1/2 z-60 flex max-w-[calc(100vw-1rem)] -translate-x-1/2 gap-0.5 rounded-full bg-[#e5e5ea] p-1 font-[system-ui] text-[12px] whitespace-nowrap text-black shadow-chip"
      >
        {STATES.map((s) => (
          <Link
            key={s}
            href={`?data=${s}`}
            aria-current={s === state ? 'true' : undefined}
            className="rounded-full px-2.5 py-1.5 aria-[current=true]:bg-white"
          >
            {LABELS[s]}
          </Link>
        ))}
      </nav>
    </>
  )
}
