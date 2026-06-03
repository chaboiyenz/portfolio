import { motion } from 'framer-motion'
import type { ExperienceItem } from '@/types/portfolio'

interface ExperienceRowProps {
  item: ExperienceItem
  index: number
}

const springVariant = {
  hidden:  { opacity: 0, y: 44, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 360, damping: 24, delay: 0.05 + i * 0.13 },
  }),
}

export default function ExperienceRow({ item, index }: ExperienceRowProps) {
  return (
    <motion.div
      className={`grid grid-cols-[180px_1fr] gap-12 py-11 max-md:grid-cols-1 max-md:gap-2.5 ${item.noBorderBottom ? '' : 'border-b border-edge'}`}
      custom={index}
      variants={springVariant}
      initial="hidden"
      animate="visible"
    >
      {/* Left column — dates + award */}
      <div>
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2.5 leading-[1.6]">
          {item.dateLines[0]}<br />{item.dateLines[1]}
        </div>
        {item.award && (
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.1em] uppercase text-gold border border-[rgba(252,211,77,0.22)] px-2 py-1 mt-1.5">
            <svg width="9" height="9" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {item.award}
          </div>
        )}
      </div>

      {/* Right column — role + bullets */}
      <div>
        <div className="text-[clamp(1.05rem,2.2vw,1.45rem)] font-bold tracking-[-0.02em] uppercase mb-1">
          {item.role}
        </div>
        <div className="text-[13px] text-accent font-medium mb-[18px]">
          {item.company}
        </div>
        <ul className="list-none">
          {item.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-[13px] text-muted leading-[1.75] py-[3px] pl-[18px] relative before:content-['→'] before:absolute before:left-0 before:text-[11px] before:text-[rgba(242,242,242,0.2)]"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
