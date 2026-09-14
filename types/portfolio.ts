import type { ReactNode } from 'react'

export type PageId = 'home' | 'work' | 'experience' | 'contact'
export type WipePhase = 'idle' | 'covering' | 'revealing'

export interface NavItem {
  id: PageId
  label: string
}

export interface Project {
  number: string
  title: string
  tagline?: string
  description: string
  tags: string[]
  href?: string
  noBorderBottom?: boolean
}

export interface ExperienceItem {
  id: string
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
  customIcon?: 'gemini' | 'huggingface' | 'rag'
}

export interface SkillCategory {
  title: string
  skills: SkillItem[]
}

export interface ContactLink {
  label: string
  value: string
  href: string
  external?: boolean
}
