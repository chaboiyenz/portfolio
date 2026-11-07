import type { Project } from '@/types/portfolio'

// Titles stay uppercase (they read as wordmarks). Each title's slug is the
// card's anchor and shared-transition name: flinki, maneho-ai, … dailyarc.
export const projects: Project[] = [
  {
    number: '01',
    title: 'FLINKI',
    tagline:
      'An AI-powered identity platform for sports and adventure, where athletes build a sporting CV, discover events, and shop gear.',
    description:
      'Full-stack developer and owner of the Activity feature; also served as database operator through direct SQL queries, test data seeding, and verification of fixes against live data.',
    tags: ['Gemini', 'Mapbox', 'Terra', 'TypeScript', 'Fastify', 'PostgreSQL'],
    image: {
      src: '/projects/flinki.png',
      alt: "Flinki home feed: a post celebrating an athlete's Brighton Marathon finish in 2:39:18, beside suggested training matches and trending races.",
      width: 1909,
      height: 911,
    },
  },
  {
    number: '02',
    title: 'MANEHO AI',
    description:
      'AI assistant for Philippine drivers that answers traffic violation questions from verified LTO documents through a Retrieval-Augmented Generation pipeline, explains photographed tickets with Gemini OCR, and includes a license practice exam.',
    tags: ['Google Gemini', 'RAG', 'Firebase', 'Vertex AI'],
    href: 'https://maneho-ai.web.app/',
    image: {
      src: '/projects/maneho-ai.png',
      alt: 'Maneho AI legal assistant: an empty chat inviting questions about LTO regulations, with six suggested questions about traffic fines and violations.',
      width: 1919,
      height: 913,
    },
  },
  {
    number: '03',
    title: 'COMMISSION MONITORING SYSTEM',
    description:
      'Managed the deployment and technical support of a Python/Django platform automating real estate commission tracking.',
    tags: ['Python', 'Django'],
    href: 'https://innersparcrealty.pythonanywhere.com/',
  },
  {
    number: '04',
    title: 'LEAD MANAGEMENT SYSTEM',
    description: 'Administered hosting and maintained a PHP/MySQL CRM, ensuring high availability for sales lead tracking.',
    tags: ['PHP', 'MySQL'],
    href: 'https://leads.dreamhosters.com/',
  },
  {
    number: '05',
    title: 'BRIGHTERMIND',
    description:
      'Built a mental health diagnostic application utilizing the GAD-7 questionnaire to dynamically recommend personalized anxiety coping mechanisms.',
    // TODO(content): stack tags pending (plan Q5). Previous tags kept until supplied.
    tags: ['Healthcare', 'Diagnostics', 'Full-stack'],
    image: {
      src: '/projects/brightermind.png',
      alt: 'BrighterMind home page: a crisis hotline banner, the headline "A steadier week starts with one small check-in," and a daily check-in card with a breathing guide and mood options.',
      width: 1745,
      height: 771,
    },
  },
  {
    number: '06',
    title: 'DAILYARC',
    description:
      'Developed a comprehensive health and fitness application with intuitive tracking capabilities to monitor daily exercise metrics.',
    // TODO(content): stack tags pending (plan Q5). Previous tags kept until supplied.
    tags: ['Health', 'Fitness', 'Full-stack'],
    href: 'https://dailyarc-81a4e.web.app/',
    image: {
      src: '/projects/dailyarc.png',
      alt: 'Daily Arc command center dashboard with a readiness score, macro targets, a muscle fatigue map, and sleep, heart rate, and energy cards.',
      width: 1898,
      height: 907,
    },
  },
]
