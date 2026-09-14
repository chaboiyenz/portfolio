import { skillCategories } from '@/data/skills'
import GeminiIcon from '@/components/icons/GeminiIcon'
import HuggingFaceIcon from '@/components/icons/HuggingFaceIcon'
import RAGIcon from '@/components/icons/RAGIcon'
import type { SkillItem } from '@/types/portfolio'

const ICON_SIZE = 22

type CustomIconId = NonNullable<SkillItem['customIcon']>

const CUSTOM_ICONS: Record<CustomIconId, () => React.JSX.Element> = {
  gemini:      GeminiIcon,
  huggingface: HuggingFaceIcon,
  rag:         RAGIcon,
}

function SkillEntry({ skill }: { skill: SkillItem }) {
  const CustomIcon = skill.customIcon ? CUSTOM_ICONS[skill.customIcon] : null

  return (
    <div className="group flex items-center gap-2.5 cursor-default">
      {CustomIcon ? (
        <span className="w-5.5 h-5.5 shrink-0 text-accent-soft opacity-[0.78] transition-opacity duration-120 ease-out group-hover:opacity-100">
          <CustomIcon />
        </span>
      ) : skill.iconSrc ? (
        // Small static icons from a third-party CDN. The image optimizer
        // isn't needed here and would require images.remotePatterns config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={skill.iconSrc}
          alt=""
          width={ICON_SIZE}
          height={ICON_SIZE}
          loading="lazy"
          decoding="async"
          className="shrink-0 opacity-[0.72] transition-opacity duration-120 ease-out group-hover:opacity-100"
          style={skill.iconFilter ? { filter: skill.iconFilter } : undefined}
        />
      ) : null}
      <span className="font-ui text-[11px] tracking-[0.06em] text-muted transition-colors duration-120 ease-out group-hover:text-accent-soft">
        {skill.name}
      </span>
    </div>
  )
}

export default function TechStack() {
  return (
    <div className="grid grid-cols-5 gap-8 max-[1100px]:grid-cols-2 max-md:grid-cols-1">
      {skillCategories.map((cat) => (
        <div key={cat.title}>
          <div className="font-ui text-[10px] tracking-[0.06em] uppercase text-muted mb-4">
            {cat.title}
          </div>
          <div className="flex flex-col gap-2.5">
            {cat.skills.map((skill) => (
              <SkillEntry key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function TechStackSection() {
  return (
    <section className="mt-16 pt-10 border-t border-edge">
      <div className="font-ui text-[10px] tracking-[0.06em] uppercase text-accent-soft mb-8">
        03 — Technical Stack
      </div>
      <TechStack />
    </section>
  )
}
