import { motion } from 'framer-motion'
import type { Project } from '@/types/portfolio'

interface ProjectRowProps {
  project: Project
  index: number
}

const springVariant = {
  hidden:  { opacity: 0, y: 52, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 22, delay: 0.04 + i * 0.1 },
  }),
}

const rowClass = (noBorderBottom?: boolean) =>
  `group relative grid grid-cols-[96px_1fr_40px] gap-8 items-start py-9 cursor-default transition-colors duration-250 text-fg
   before:content-[''] before:absolute before:-left-12 before:top-0 before:bottom-0 before:w-[3px] before:bg-accent
   before:scale-y-0 before:origin-bottom before:transition-transform before:duration-380 before:ease-[cubic-bezier(0.34,1.56,0.64,1)]
   hover:bg-white/[0.018] hover:before:scale-y-100
   max-md:grid-cols-[52px_1fr] max-md:gap-4 max-md:before:-left-5
   ${noBorderBottom ? '' : 'border-b border-edge'}`

const inner = (project: Project) => (
  <>
    <div className="font-mono text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[rgba(242,242,242,0.07)] leading-none transition-colors duration-300 group-hover:text-accent">
      {project.number}
    </div>
    <div>
      <div className="text-[clamp(1.1rem,2.5vw,1.65rem)] font-bold tracking-[-0.025em] uppercase mb-2.5 leading-[1.1]">
        {project.title}
      </div>
      <div className="text-[13px] leading-[1.7] text-muted max-w-[540px] mb-4">
        {project.description}
      </div>
      <div className="flex flex-wrap gap-[7px]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted border border-edge px-2.5 py-1 transition-[border-color,color] duration-200 group-hover:border-[rgba(185,255,102,0.25)] group-hover:text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="text-[1.4rem] leading-none text-[rgba(242,242,242,0.1)] self-center transition-[color,transform] duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:text-accent group-hover:translate-x-2 max-md:hidden">
      →
    </div>
  </>
)

export default function ProjectRow({ project, index }: ProjectRowProps) {
  if (project.href) {
    return (
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowClass(project.noBorderBottom)} cursor-pointer`}
        custom={index}
        variants={springVariant}
        initial="hidden"
        animate="visible"
      >
        {inner(project)}
      </motion.a>
    )
  }

  return (
    <motion.div
      className={rowClass(project.noBorderBottom)}
      custom={index}
      variants={springVariant}
      initial="hidden"
      animate="visible"
    >
      {inner(project)}
    </motion.div>
  )
}
