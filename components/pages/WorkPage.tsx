'use client'

import ProjectRow from '@/components/ProjectRow'
import { projects } from '@/data/projects'

export default function WorkPage() {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-12 pt-18 pb-24 max-md:px-5 max-md:pt-12 max-md:pb-20">
      <div>
        <div className="font-ui text-[10px] tracking-[0.06em] uppercase text-accent-soft mb-2.5">
          01 — SELECTED PROJECT
        </div>
        <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.04em] uppercase mb-16">
          PROJECTS.
        </h2>
      </div>

      <div className="border-t border-edge">
        {projects.map((project) => (
          <ProjectRow key={project.number} project={project} />
        ))}
      </div>
    </div>
  )
}
