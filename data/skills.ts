import type { SkillCategory } from '@/types/portfolio'

const DEVICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

// Devicons drawn in black need inverting to read on the dark background.
const INVERT_FOR_DARK = 'invert(1) brightness(0.8)'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', iconSrc: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: 'JavaScript', iconSrc: `${DEVICONS}/javascript/javascript-original.svg` },
      { name: 'Python',     iconSrc: `${DEVICONS}/python/python-original.svg` },
      { name: 'PHP',        iconSrc: `${DEVICONS}/php/php-original.svg` },
      { name: 'HTML / CSS', iconSrc: `${DEVICONS}/html5/html5-original.svg` },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React',        iconSrc: `${DEVICONS}/react/react-original.svg` },
      { name: 'Next.js',      iconSrc: `${DEVICONS}/nextjs/nextjs-original.svg`, iconFilter: INVERT_FOR_DARK },
      { name: 'Node.js',      iconSrc: `${DEVICONS}/nodejs/nodejs-original.svg` },
      { name: 'Django',       iconSrc: `${DEVICONS}/django/django-plain.svg`, iconFilter: INVERT_FOR_DARK },
      { name: 'Tailwind CSS', iconSrc: `${DEVICONS}/tailwindcss/tailwindcss-original.svg` },
      { name: 'Vite',         iconSrc: `${DEVICONS}/vitejs/vitejs-original.svg` },
    ],
  },
  {
    title: 'Cloud & Data',
    skills: [
      { name: 'Google Cloud Platform', iconSrc: `${DEVICONS}/googlecloud/googlecloud-original.svg` },
      { name: 'Firebase',              iconSrc: `${DEVICONS}/firebase/firebase-original.svg` },
      { name: 'MySQL',                 iconSrc: `${DEVICONS}/mysql/mysql-original.svg` },
      { name: 'SQLite',                iconSrc: `${DEVICONS}/sqlite/sqlite-original.svg` },
    ],
  },
  {
    title: 'AI',
    skills: [
      { name: 'Google Gemini',    customIcon: 'gemini' },
      { name: 'Imagen' },
      { name: 'Google Stitch' },
      { name: 'Google Flow' },
      { name: 'Hugging Face',     customIcon: 'huggingface' },
      { name: 'RAG architecture', customIcon: 'rag' },
    ],
  },
  {
    title: 'APIs',
    skills: [
      { name: 'Vital' },
      { name: 'Terra' },
      { name: 'RunSignUp' },
      { name: 'Geoapify' },
      { name: 'Mapbox' },
    ],
  },
]
