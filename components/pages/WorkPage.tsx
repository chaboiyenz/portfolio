'use client'

import { motion } from 'framer-motion'
import ProjectRow from '@/components/ProjectRow'
import { projects } from '@/data/projects'

export default function WorkPage() {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-12 pt-18 pb-24 max-md:px-5 max-md:pt-12 max-md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent opacity-70 mb-2.5">
          01 — SELECTED PROJECT
        </div>
        <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.04em] uppercase mb-16">
          PROJECTS.
        </h2>
      </motion.div>

      <div className="border-t border-edge">
        {projects.map((project, i) => (
          <ProjectRow key={project.number} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
