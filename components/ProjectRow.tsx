import type { Project } from '@/types/portfolio'

interface ProjectRowProps {
  project: Project
}

const rowClass = (noBorderBottom?: boolean) =>
  `group relative grid grid-cols-[96px_1fr_40px] gap-8 items-start py-9 cursor-default text-fg
   max-md:grid-cols-[52px_1fr] max-md:gap-4
   ${noBorderBottom ? '' : 'border-b border-edge'}`

const inner = (project: Project) => (
  <>
    <div className="font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[rgba(242,242,242,0.07)] leading-none transition-colors duration-120 ease-out group-hover:text-accent">
      {project.number}
    </div>
    <div>
      <div className="text-[clamp(1.1rem,2.5vw,1.65rem)] font-bold tracking-[-0.025em] uppercase mb-2.5 leading-[1.1] transition-colors duration-120 ease-out group-hover:text-accent">
        {project.title}
      </div>
      {project.tagline && (
        <div className="text-[11px] leading-[1.6] text-muted max-w-[540px] mb-2.5">
          {project.tagline}
        </div>
      )}
      <div className="text-[13px] leading-[1.7] text-muted max-w-[540px] mb-4">
        {project.description}
      </div>
      <div className="flex flex-wrap gap-[7px]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-ui text-[10px] tracking-[0.06em] uppercase text-muted border border-edge px-2.5 py-1 transition-colors duration-120 ease-out group-hover:border-accent-soft group-hover:text-accent-soft"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="text-[1.4rem] leading-none text-[rgba(242,242,242,0.1)] self-center transition-colors duration-120 ease-out group-hover:text-accent max-md:hidden">
      →
    </div>
  </>
)

export default function ProjectRow({ project }: ProjectRowProps) {
  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowClass(project.noBorderBottom)} cursor-pointer`}
      >
        {inner(project)}
      </a>
    )
  }

  return <div className={rowClass(project.noBorderBottom)}>{inner(project)}</div>
}
