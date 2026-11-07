import ProjectCard, { type ProjectCardLayout } from '@/components/work/ProjectCard'
import type { Project } from '@/types/portfolio'

// First project leads as the feature; the rest alternate media side so the
// page reads as a sequence of chapters rather than a grid.
function layoutFor(index: number): ProjectCardLayout {
  if (index === 0) return 'feature'
  return index % 2 === 1 ? 'end' : 'start'
}

interface ProjectListProps {
  projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid gap-6 lg:gap-8">
      {projects.map((project, i) => (
        <ProjectCard key={project.number} project={project} layout={layoutFor(i)} />
      ))}
    </div>
  )
}
