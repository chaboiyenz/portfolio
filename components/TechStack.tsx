import Image from 'next/image'
import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import GeminiIcon from '@/components/icons/GeminiIcon'
import HuggingFaceIcon from '@/components/icons/HuggingFaceIcon'
import LLMsIcon from '@/components/icons/LLMsIcon'
import RAGIcon from '@/components/icons/RAGIcon'
import type { SkillItem } from '@/types/portfolio'

const CUSTOM_ICONS: Record<string, React.FC> = {
  gemini:      GeminiIcon,
  huggingface: HuggingFaceIcon,
  llms:        LLMsIcon,
  rag:         RAGIcon,
}

function SkillEntry({ skill }: { skill: SkillItem }) {
  const CustomIcon = skill.customIcon ? CUSTOM_ICONS[skill.customIcon] : null

  return (
    <div className="group flex items-center gap-2.5 transition-transform duration-200 cursor-default hover:translate-x-1">
      {CustomIcon ? (
        <span className="w-5.5 h-5.5 shrink-0 opacity-[0.78] transition-opacity duration-200 group-hover:opacity-100">
          <CustomIcon />
        </span>
      ) : skill.iconSrc ? (
        <Image
          src={skill.iconSrc}
          alt={skill.name}
          width={22}
          height={22}
          className="shrink-0 opacity-[0.72] transition-opacity duration-200 group-hover:opacity-100"
          style={skill.iconFilter ? { filter: skill.iconFilter } : undefined}
        />
      ) : null}
      <span className="font-mono text-[11px] tracking-[0.06em] text-muted transition-colors duration-200 group-hover:text-accent">
        {skill.name}
      </span>
    </div>
  )
}

export default function TechStack() {
  return (
    <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2">
      {skillCategories.map((cat) => (
        <div key={cat.title}>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-4">
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

export function TechStackAnimated() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
      className="mt-16 pt-10 border-t border-edge"
    >
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-accent opacity-70 mb-8">
        03 — Technical Stack
      </div>
      <TechStack />
    </motion.div>
  )
}
