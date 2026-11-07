import type { SkillCategory } from '@/types/portfolio'

// Category icons are chosen by title in components/home/TechStack.tsx.

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'PHP' },
      { name: 'HTML/CSS' },
    ],
  },
  {
    title: 'Frameworks & Environments',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Node.js' },
      { name: 'Fastify' },
      { name: 'Django' },
      { name: 'Tailwind CSS' },
      { name: 'Vite' },
    ],
  },
  {
    title: 'Backend & Data',
    skills: [
      { name: 'Prisma' },
      { name: 'Zod' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'SQLite' },
    ],
  },
  {
    title: 'Cloud & Platforms',
    skills: [
      { name: 'Google Cloud Platform (Cloud Run)' },
      { name: 'Terraform' },
      { name: 'Firebase' },
      { name: 'Vercel' },
    ],
  },
  {
    title: 'AI & Integrations',
    skills: [
      { name: 'Google Gemini' },
      { name: 'Imagen' },
      { name: 'Google Stitch' },
      { name: 'Google Flow' },
      { name: 'Hugging Face' },
      { name: 'LLMs' },
      { name: 'RAG Architecture' },
    ],
  },
  {
    title: 'APIs & Services',
    skills: [
      { name: 'Terra' },
      { name: 'Vital' },
      { name: 'Mapbox' },
      { name: 'Geoapify' },
      { name: 'RunSignUp' },
      { name: 'Zenserp' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'pnpm' },
      { name: 'Turborepo' },
    ],
  },
]
