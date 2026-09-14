'use client'

import ExperienceRow from '@/components/ExperienceRow'
import { experiences } from '@/data/experience'
import { education } from '@/data/education'

export default function ExperiencePage() {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-12 pt-18 pb-24 max-md:px-5 max-md:pt-12 max-md:pb-20">
      <div>
        <div className="font-ui text-[10px] tracking-[0.06em] uppercase text-accent-soft mb-2.5">
          02 — WORK HISTORY
        </div>
        <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.04em] uppercase mb-16">
          EXPERIENCE.
        </h2>
      </div>

      <div className="border-t border-edge">
        {experiences.map((item) => (
          <ExperienceRow key={item.id} item={item} />
        ))}
      </div>

      <section className="mt-16">
        <div className="font-ui text-[10px] tracking-[0.06em] uppercase text-accent-soft mb-6">
          EDUCATION
        </div>
        <div className="border-t border-edge">
          {education.map((item) => (
            <ExperienceRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
