import type { ExperienceItem } from '@/types/portfolio'

const H = ({ children }: { children: string }) => (
  <span className="text-[rgba(242,242,242,0.72)] font-medium">{children}</span>
)

const A = ({ children }: { children: string }) => (
  <span className="text-accent font-ui font-medium">{children}</span>
)

export const experiences: ExperienceItem[] = [
  {
    id: 'hytel-jr-software-engineer',
    dateLines: ['Mar 2026', 'Present'],
    role: 'Jr. Software Engineer',
    company: 'Hytel Pte Ltd',
    bullets: [
      <>
        Build full-stack features for a sports and adventure platform, integrating <H>Vital</H> and <H>Terra</H> for
        wearable health data, <H>RunSignUp</H> for race events, and <H>Geoapify</H> and <H>Mapbox</H> for mapping and
        route generation.
      </>,
      <>
        Built a <H>Gemini</H>-powered image stylization pipeline with four selectable effects, pairing model-generated
        lighting with deterministic server-side text rendering via <H>opentype.js</H> so the displayed stats are always
        exact. Added subject masking with footprint-aware overlay placement.
      </>,
      <>Run manual and automated QA across five products, diagnosing and resolving defects during Agile sprints.</>,
    ],
  },
  {
    id: 'inner-sparc-support-engineer',
    dateLines: ['Jun 2025', 'Dec 2025'],
    role: 'Support Engineer',
    company: 'Inner SPARC Realty Corp.',
    bullets: [
      <>Managed deployment of <H>Python/Django</H> Commission Monitoring System.</>,
      <>Provided support for <A>128</A> active users.</>,
      <>Boosted operational efficiency by <A>30%</A> via automated tracking.</>,
    ],
  },
  {
    id: 'inner-sparc-intern',
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
