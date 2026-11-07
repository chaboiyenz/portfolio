import type { ExperienceItem } from '@/types/portfolio'

/** Technology name. */
const H = ({ children }: { children: string }) => (
  <span className="font-medium text-label">{children}</span>
)

/** Figure (counts, percentages). */
const A = ({ children }: { children: string }) => (
  <span className="font-semibold text-label tabular-nums">{children}</span>
)

/** Bold lead label that opens a bullet. */
const L = ({ children }: { children: string }) => (
  <span className="font-semibold text-label">{children}</span>
)

export const experiences: ExperienceItem[] = [
  {
    id: 'hytel-jr-software-engineer',
    dateLines: ['Mar 2026', 'Present'],
    role: 'Jr. Software Engineer',
    company: 'Hytel Pte Ltd',
    bullets: [
      <>
        <L>Full-Stack Development & Integrations:</L> Built Flinki&apos;s Activity feature, covering wearable connection
        and sync via <H>Terra</H>, Strava-style route rendering on <H>Mapbox</H>, and a 3D Flyover that animates the route
        with photos and video auto-attached by location and time. Integrated <H>Vital</H>, <H>RunSignUp</H>,{' '}
        <H>Zenserp</H>, and <H>Geoapify</H> across the wider platform, and provisioned <H>GCP</H> environments with{' '}
        <H>Terraform</H>.
      </>,
      <>
        <L>AI Implementations:</L> Built a <H>Gemini</H>-powered image stylization pipeline with four selectable effects,
        combining model-generated lighting with deterministic server-side text rendering via <H>opentype.js</H> to
        guarantee data accuracy, and implemented subject masking with footprint-aware overlay placement to preserve the
        athlete.
      </>,
      <>
        <L>Agile QA & Debugging:</L> Executed manual and automated testing across five internal and client products,
        diagnosing and resolving critical defects during Agile sprints.
      </>,
    ],
  },
  {
    id: 'inner-sparc-software-developer-support',
    dateLines: ['Jun 2025', 'Dec 2025'],
    role: 'Software Developer Support',
    company: 'Inner SPARC Realty Corporation',
    bullets: [
      <>
        <L>System Deployment & Maintenance:</L> Managed deployment and hosting for the company&apos;s{' '}
        <H>Python/Django</H> Commission Monitoring System and <H>PHP/MySQL</H> Lead Management CRM, ensuring reliable
        access to both as centralized sales data systems.
      </>,
      <>
        <L>Technical Troubleshooting & Support:</L> Provided dedicated software support for <A>128</A> active users,
        diagnosing system defects, resolving minor codebase issues, and managing environment configurations.
      </>,
      <>
        <L>Operational Optimization & Onboarding:</L> Facilitated automated commission tracking that boosted overall
        operational efficiency by <A>30%</A>, and led user training sessions to ensure smooth system adoption across the
        sales team.
      </>,
    ],
  },
  {
    id: 'inner-sparc-intern',
    dateLines: ['Mar 2025', 'Jun 2025'],
    role: 'Intern',
    company: 'Inner SPARC Realty Corporation',
    award: 'Most Outstanding Intern',
    bullets: [
      <>
        Built a recruitment landing page with <H>Brevo</H> email automation and <H>Calendly</H> scheduling, and
        automated sales computations in <H>Google Sheets</H> using advanced formulas.
      </>,
      <>
        Managed deployment of <H>Django</H> (PythonAnywhere) and <H>PHP</H> (DreamHost) applications; recognized as Most
        Outstanding Intern in the fourth week of OJT and awarded the highest performance grade.
      </>,
    ],
  },
]
