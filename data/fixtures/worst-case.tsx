// Worst-case fixtures for the dev-only break-ui route (app/dev/break-ui).
// Every value is something a realistic future entry could contain; nothing is
// random filler. Shaped exactly like the real data in data/*.ts so the swap
// happens at the data boundary. Never imported by a production page.
import type { ContactLink, ExperienceItem, Project, SkillCategory } from '@/types/portfolio'

// A portrait phone screenshot (390×844), the shape a mobile-app project would
// supply. Inline SVG so the fixture needs no file in /public.
const PORTRAIT_SCREENSHOT =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">' +
      '<rect width="390" height="844" fill="#2c2c2e"/><rect x="24" y="80" width="342" height="200" rx="16" fill="#48484a"/>' +
      '<rect x="24" y="304" width="342" height="64" rx="12" fill="#3a3a3c"/><rect x="24" y="384" width="342" height="64" rx="12" fill="#3a3a3c"/></svg>',
  )

export const worstProjects: Project[] = [
  {
    number: '01',
    // Long, multi-word title on the feature card.
    title: 'CUSTOMER ONBOARDING AUTOMATION PLATFORM FOR ENTERPRISE CLIENTS',
    tagline:
      'A self-serve onboarding suite for property developers, brokers, and their back offices: document intake, KYC checks, e-signatures, and commission schedules in one workflow, with audit trails that satisfy two regulators at once.',
    description:
      'Led the frontend and most of the API surface. Built the document-intake pipeline (OCR, classification, and a human review queue), the e-signature flow with Dropbox Sign, and the commission-schedule editor that replaced a 40-tab spreadsheet. Wrote the role-based access model, migrated 3,200 legacy records with a resumable import job, and set up preview deployments per pull request. Owned on-call for the first six months after launch and cut the median onboarding time from nine days to under two.',
    // A dozen tags, one far wider than the others.
    tags: ['TypeScript', 'Next.js', 'tRPC', 'PostgreSQL', 'Prisma', 'Dropbox Sign', 'AWS Textract', 'Redis', 'Playwright', 'customer-feedback-from-enterprise-onboarding', 'CI/CD', 'RBAC'],
    // Long host with many subdomains.
    href: 'https://onboarding.northwind-industries-holdings.example.com/',
  },
  {
    number: '02',
    // Two-letter title, minimal description, no tags, no link, no image.
    title: 'JO',
    description: 'Internal tool.',
    tags: [],
  },
  {
    number: '03',
    // A 30-character compound with no break opportunities, set in caps.
    title: 'BENACHRICHTIGUNGSEINSTELLUNGEN',
    description:
      'Notification preferences service for a German-language client: per-channel opt-ins, quiet hours, and digest batching.',
    tags: ['Go', 'gRPC', 'i18n'],
    href: 'https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved',
    // Portrait phone screenshot in a slot designed for landscape.
    image: { src: PORTRAIT_SCREENSHOT, alt: 'Phone screenshot of a notification settings screen.', width: 390, height: 844 },
  },
  {
    number: '04',
    // Stacked Vietnamese diacritics on capitals, plus escaping-sensitive characters.
    title: 'ĐẶNG THỊ NGỌC - OCR & <SCAN> TOOL',
    description: 'Vietnamese ID card OCR with a review UI. Handles "quoted" fields, & ampersands, and <angle brackets> literally.',
    tags: ['Python', 'OCR'],
  },
]

export const worstExperience: ExperienceItem[] = [
  {
    id: 'worst-long-everything',
    dateLines: ['September 2025', 'Present'],
    role: 'Senior Product Design Engineer, Platform Infrastructure',
    company: 'Northwind Industries International Holdings Pte. Ltd. (Singapore Branch)',
    award: 'Outstanding Contributor - Q3 Engineering Excellence Award',
    bullets: [
      <>
        Wrote the migration runbook at https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved
        and ran it across 14 tenants without downtime.
      </>,
      <>Benachrichtigungseinstellungen-Dienst rebuilt with per-channel opt-ins.</>,
    ],
  },
  {
    // Single date (an ongoing role written as one line), short role, no bullets.
    id: 'worst-sparse',
    dateLines: ['2026'],
    role: 'QA',
    company: 'Jo & Co.',
    bullets: [],
  },
]

export const worstSkills: SkillCategory[] = [
  { title: 'Languages', skills: [{ name: 'TypeScript' }] },
  {
    title: 'Observability & Developer Experience',
    skills: [
      { name: 'Grafana' },
      // Emoji-first name.
      { name: '🦊 Firefox DevTools' },
      // All-lowercase name.
      { name: 'pnpm' },
      { name: 'Google Cloud Platform (Vertex AI, Cloud Run, Firestore)' },
    ],
  },
  { title: 'Frameworks', skills: [{ name: 'React' }] },
  { title: 'Cloud & Data', skills: [{ name: 'Firebase' }] },
  { title: 'AI', skills: [{ name: 'Google Gemini' }] },
  { title: 'APIs', skills: [{ name: 'Mapbox' }] },
  // Category titles not in the TechStack icon map render without an icon.
  { title: 'Testing', skills: [{ name: 'Playwright' }, { name: 'Vitest' }] },
]

export const worstContacts: ContactLink[] = [
  { label: 'Email', value: 'bartholomew.fitzgerald@northwind-industries-holdings.example.com', href: 'mailto:bartholomew.fitzgerald@northwind-industries-holdings.example.com' },
  { label: 'Phone', value: '+63 935 161 2607 ext. 4412', href: 'tel:+639351612607,4412' },
  // A link type the tile has no icon for.
  { label: 'Scheduling (Calendly)', value: 'calendly.com/yenzo-gervacio/30-minute-intro-call', href: 'https://calendly.example.com/yenzo/30min', external: true },
  { label: 'GitHub', value: 'GitHub', href: 'https://github.example.com/chaboiyenz', external: true },
  { label: 'Portfolio', value: 'Portfolio', href: 'https://example.org/', external: true },
]
