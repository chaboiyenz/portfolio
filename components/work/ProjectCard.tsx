import { a11y } from '@/data/site'
import { displayHost, slugify } from '@/lib/routes'
import { ArrowUpRight } from '@/components/ui/icons'
import ProjectMedia from '@/components/work/ProjectMedia'
import SharedProjectTitle from '@/components/motion/SharedProjectTitle'
import type { Project } from '@/types/portfolio'

export type ProjectCardLayout = 'feature' | 'start' | 'end'

interface ProjectCardProps {
  project: Project
  /** feature: stacked, full-bleed media. start/end: side-by-side, media on that side. */
  layout: ProjectCardLayout
}

// Titles are stored uppercase; caps read cramped at display tracking, so they
// get a looser value than the title-1 default.
const TITLE_CLASS = 'tracking-[-0.012em] wrap-anywhere'

// The stretched link makes the whole card the target, so when it has keyboard
// focus the ring is drawn around the card as well as the link itself.
const CARD_FOCUS = 'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent-ink'

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full bg-fill px-3 py-1 text-footnote font-medium text-secondary">
          {tag}
        </li>
      ))}
    </ul>
  )
}

/** External link whose hit area stretches over the whole card. Only the host is
 *  in the tab order and accessible name, not the card's full text. */
function VisitLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex min-h-11 items-center gap-1 rounded-full text-callout font-medium text-accent-ink after:absolute after:inset-0 after:rounded-card after:content-['']"
    >
      <span className="wrap-anywhere group-hover/card:underline group-hover/card:underline-offset-4">
        {displayHost(href)}
      </span>
      <ArrowUpRight className="size-3.5 shrink-0" />
      <span className="sr-only"> {a11y.opensInNewTab}</span>
    </a>
  )
}

export default function ProjectCard({ project, layout }: ProjectCardProps) {
  const slug = slugify(project.title)
  const titleId = `${slug}-title`

  // The feature card's title steps up to near-display size; its card is twice as large.
  const titleSize =
    layout === 'feature' ? 'text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-[1.04] font-bold' : 'text-title-1'

  const heading = (
    <div>
      <p className="text-footnote font-semibold text-secondary tabular-nums">{project.number}</p>
      <SharedProjectTitle slug={slug}>
        <h2 id={titleId} className={`mt-2 ${TITLE_CLASS} ${titleSize}`}>
          {project.title}
        </h2>
      </SharedProjectTitle>
    </div>
  )

  if (layout === 'feature') {
    return (
      <article
        id={slug}
        aria-labelledby={titleId}
        className={`group/card press-card ${CARD_FOCUS} relative scroll-mt-24 rounded-card bg-surface p-5 shadow-float sm:p-8 lg:p-12`}
      >
        {/* The title gets the card's full width: at near-display size, a long
            title in a narrow column would break mid-word. */}
        <div className="px-1 pt-2 sm:px-0 lg:pt-0">{heading}</div>
        <div className="mt-6 grid gap-6 px-1 sm:px-0 lg:mt-8 lg:grid-cols-12 lg:gap-12">
          {project.tagline && <p className="text-intro lg:col-span-5">{project.tagline}</p>}
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-body text-secondary">{project.description}</p>
            {project.tags.length > 0 && (
              <div className="mt-6">
                <Tags tags={project.tags} />
              </div>
            )}
            {project.href && (
              <div className="mt-6">
                <VisitLink href={project.href} />
              </div>
            )}
          </div>
        </div>
        <ProjectMedia
          image={project.image}
          aspect="16/9"
          sizes="(min-width: 1140px) 1040px, 100vw"
          eager
          className="mt-8 lg:mt-12"
        />
      </article>
    )
  }

  const mediaFirst = layout === 'start'

  return (
    <article
      id={slug}
      aria-labelledby={titleId}
      className={`group/card press-card ${CARD_FOCUS} relative scroll-mt-24 rounded-card bg-surface p-5 shadow-card sm:p-8 lg:p-10`}
    >
      {/* Text precedes media in source order so phones read every card the same
          way as the feature card; desktop alternates the media side. */}
      <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-12">
        <div className="px-1 pt-1 sm:px-0 sm:pt-0 lg:col-span-5">
          {heading}
          <p className="mt-4 text-body text-secondary">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="mt-6">
              <Tags tags={project.tags} />
            </div>
          )}
          {project.href && (
            <div className="mt-5">
              <VisitLink href={project.href} />
            </div>
          )}
        </div>
        <ProjectMedia
          image={project.image}
          aspect="16/10"
          sizes="(min-width: 1024px) 600px, 100vw"
          className={`lg:col-span-7 ${mediaFirst ? 'lg:order-first' : ''}`}
        />
      </div>
    </article>
  )
}
