import type { ExperienceItem } from '@/types/portfolio'

const H = ({ children }: { children: string }) => (
  <span className="text-[rgba(242,242,242,0.72)] font-medium">{children}</span>
)

const A = ({ children }: { children: string }) => (
  <span className="text-accent font-mono font-semibold">{children}</span>
)

export const experiences: ExperienceItem[] = [
  {
    dateLines: ['Mar 2026', 'Present'],
    role: 'Jr. Software Engineer',
    company: 'Hytel Pte Ltd',
    bullets: [
      <>Engineered full-stack features integrating enterprise APIs — <H>Vital, RunSignUp, Geoapify</H>.</>,
      <>Leveraged <H>Google Gemini</H> & <H>Hugging Face</H> models for AI-powered capabilities.</>,
      <>Executed Agile QA cycles, debugging, and automated testing.</>,
    ],
  },
  {
    dateLines: ['Jun 2025', 'Dec 2025'],
    role: 'Software Developer Support',
    company: 'Inner SPARC Realty Corp.',
    bullets: [
      <>Managed deployment of <H>Python/Django</H> Commission Monitoring System.</>,
      <>Provided support for <A>128</A> active users.</>,
      <>Boosted operational efficiency by <A>30%</A> via automated tracking.</>,
    ],
  },
  {
    dateLines: ['Mar 2025', 'Jun 2025'],
    role: 'Intern',
    company: 'Inner SPARC Realty Corp.',
    award: 'Top Intern',
    noBorderBottom: true,
    bullets: [
      <>Built recruitment landing page with <H>Brevo</H> automation & Calendly scheduling.</>,
      <>Deployed <H>Django</H> (PythonAnywhere) & <H>PHP</H> (DreamHost) applications.</>,
      <>Automated sales computations in Google Sheets.</>,
    ],
  },
]
