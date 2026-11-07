import { Cloud, Code2, Database, Layers, Plug, Sparkles, Wrench, type LucideIcon } from 'lucide-react'
import Container from '@/components/ui/Container'
import { skillCategories } from '@/data/skills'
import { stackSection } from '@/data/site'
import type { SkillCategory } from '@/types/portfolio'

// One icon per category, keyed by the category title in data/skills.ts so the
// data stays text-only. A title missing here renders without an icon (its
// label keeps the same alignment). Skills themselves have no icons.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Programming Languages': Code2,
  'Frameworks & Environments': Layers,
  'Backend & Data': Database,
  'Cloud & Platforms': Cloud,
  'AI & Integrations': Sparkles,
  'APIs & Services': Plug,
  Tools: Wrench,
}

const ICON_SIZE = 18

interface TechStackProps {
  /** Defaults to the real data; the dev break-ui route passes fixtures. */
  categories?: SkillCategory[]
}

/**
 * Flat list, one row per category: label (icon + name) on the left at about
 * 230px (one line on desktop), skills as wrapping pills on the right; stacked
 * on phones. Rows are separated by hairlines, with no cards, so 38 skills read
 * at a glance.
 */
export default function TechStack({ categories = skillCategories }: TechStackProps) {
  return (
    <section aria-labelledby="stack-title" className="pb-6">
      <Container>
        <h2 id="stack-title" className="text-title-1">
          {stackSection.title}
        </h2>

        <div className="mt-5 divide-y divide-hairline">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.title]
            return (
              <div
                key={category.title}
                className="grid gap-2.5 py-2.5 md:grid-cols-[14.5rem_minmax(0,1fr)] md:items-start md:gap-6"
              >
                {/* min-h matches one pill row, so the label centers on the first line of pills. */}
                <h3 className="flex items-center gap-2 text-callout font-medium text-secondary md:min-h-[1.625rem]">
                  {Icon ? (
                    <Icon size={ICON_SIZE} aria-hidden className="shrink-0" />
                  ) : (
                    <span className="size-4.5 shrink-0" aria-hidden />
                  )}
                  <span className="min-w-0 wrap-anywhere md:whitespace-nowrap">{category.title}</span>
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="rounded-full bg-surface px-2.5 py-1 text-footnote text-label wrap-anywhere"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
