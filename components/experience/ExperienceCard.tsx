import { Star } from '@/components/ui/icons'
import type { ExperienceItem } from '@/types/portfolio'

interface ExperienceCardProps {
  item: ExperienceItem
  /** Heading level for the role, so each page keeps an unbroken outline. */
  headingLevel: 'h2' | 'h3'
}

export default function ExperienceCard({ item, headingLevel: Heading }: ExperienceCardProps) {
  const titleId = `${item.id}-title`

  return (
    <article
      aria-labelledby={titleId}
      // minmax(0,1fr) on phones too: an implicit auto column would grow to fit
      // an unbreakable string instead of letting it wrap.
      className="grid grid-cols-[minmax(0,1fr)] gap-5 rounded-card bg-surface p-6 shadow-card sm:p-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 lg:p-10"
    >
      <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start">
        <p className="text-footnote font-medium text-secondary tabular-nums">
          {item.dateLines.join(' – ')}
        </p>
        {item.award && (
          // A rounded rectangle rather than a pill: long award names wrap, and a
          // fully rounded multi-line badge reads as a blob.
          <p className="inline-flex max-w-full items-start gap-1.5 rounded-lg bg-fill px-2.5 py-1 text-caption font-semibold text-balance">
            <Star className="mt-px size-3 shrink-0" />
            {item.award}
          </p>
        )}
      </div>

      <div className="min-w-0">
        <Heading id={titleId} className="text-title-2 wrap-anywhere">
          {item.role}
        </Heading>
        <p className="mt-1 text-callout text-secondary">{item.company}</p>
        {item.bullets.length > 0 && (
          <ul className="mt-6 grid gap-3">
            {item.bullets.map((bullet, i) => (
              <li
                key={i}
                // wrap-anywhere: a URL or long compound in a bullet must wrap, not
                // push the page wider than the screen.
                className="relative pl-5 text-body text-secondary wrap-anywhere before:absolute before:top-[0.68em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-tertiary before:content-['']"
              >
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
