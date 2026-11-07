import type { ReactNode } from 'react'

export type PageId = 'home' | 'work' | 'experience' | 'contact'

export interface NavItem {
  id: PageId
  label: string
}

/** A screenshot for a project. Until one is supplied, a neutral placeholder
 *  renders at the same aspect ratio. */
export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Project {
  number: string
  title: string
  tagline?: string
  description: string
  tags: string[]
  href?: string
  image?: ProjectImage
}

export interface ExperienceItem {
  id: string
  dateLines: string[]
  role: string
  company: string
  bullets: ReactNode[]
  award?: string
}

export interface SkillItem {
  name: string
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
