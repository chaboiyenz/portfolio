import type { ExperienceItem } from '@/types/portfolio'

// Rendered with ExperienceRow so it shares the work-history row styling:
// role → degree, company → institution, bullets → certifications.
export const education: ExperienceItem[] = [
  {
    id: 'cvsu-bacoor-bsit',
    dateLines: ['2021', '2025'],
    role: 'BSc Information Technology',
    company: 'Cavite State University – Bacoor',
    noBorderBottom: true,
    bullets: [
      <>Certification: Introduction to Cybersecurity</>,
      <>Certification: Endpoint Security</>,
    ],
  },
]
