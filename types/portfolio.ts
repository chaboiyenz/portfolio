import type { ReactNode } from 'react'

export type PageId = 'home' | 'work' | 'experience' | 'contact'
export type WipePhase = 'idle' | 'covering' | 'revealing'

export interface Project {
  number: string
  title: string
  description: string
  tags: string[]
  href?: string
  noBorderBottom?: boolean
}

export interface ExperienceItem {
  dateLines: string[]
  role: string
  company: string
  bullets: ReactNode[]
  award?: string
  noBorderBottom?: boolean
}

export interface SkillItem {
  name: string
  iconSrc?: string
  iconFilter?: string
  customIcon?: 'gemini' | 'huggingface' | 'llms' | 'rag'
}

export interface SkillCategory {
  title: string
  skills: SkillItem[]
}
