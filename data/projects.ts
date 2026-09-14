import type { Project } from '@/types/portfolio'

export const projects: Project[] = [
  {
    number: '01',
    title: 'FLINKI',
    tagline:
      'An AI-powered identity platform for sports and adventure — athletes build a sporting CV, find events, and shop gear, alongside clubs and organizations.',
    description:
      "Full-stack work across the product. Built the Customize Tab, where Gemini styles a rider's photo while the ride stats are stamped server-side in code — the model paints the look, it never touches the numbers. Integrated Terra for wearable data and Mapbox for the 3D Flyover, and operated the database directly: SQL queries, test data seeding, and verifying fixes against live data.",
    tags: ['Gemini', 'Mapbox', 'Terra', 'TypeScript'],
  },
  {
    number: '02',
    title: 'RAG MANEHO AI',
    description:
      'AI-powered document scanner using a Retrieval-Augmented Generation pipeline and the Google Gemini API to decode and interpret LTO violation documents with contextual understanding.',
    tags: ['RAG Architecture', 'Google Gemini', 'LLMs', 'Python'],
    href: 'https://maneho-ai.web.app/',
  },
  {
    number: '03',
    title: 'COMMISSION MONITORING SYSTEM',
    description:
      'Python/Django platform automating real estate commission tracking. Deployed for 128 active users, boosting operational efficiency by 30%.',
    tags: ['Python', 'Django', 'DevOps'],
    href: 'https://innersparcrealty.pythonanywhere.com/',
  },
  {
    number: '04',
    title: 'LEAD MANAGEMENT SYSTEM',
    description:
      'PHP/MySQL CRM ensuring high availability for sales lead tracking. Administered hosting and performed maintenance for uninterrupted uptime.',
    tags: ['PHP', 'MySQL', 'CRM'],
    href: 'https://leads.dreamhosters.com/',
  },
  {
    number: '05',
    title: 'BRIGHTERMIND',
    description:
      'Mental health diagnostic application utilizing the GAD-7 questionnaire to dynamically recommend personalized anxiety coping mechanisms.',
    tags: ['Healthcare', 'Diagnostics', 'Full-stack'],
  },
  {
    number: '06',
    title: 'DAILY ARC',
    description:
      'Comprehensive health and fitness application for tracking daily exercise metrics and monitoring personal wellness goals with an intuitive interface.',
    tags: ['Health', 'Fitness', 'Full-stack'],
    href: 'https://dailyarc-81a4e.web.app/',
    noBorderBottom: true,
  },
]
