import type { ExperienceItem } from '@/types/portfolio'

// Rendered with ExperienceCard so it shares the work-history styling:
// role → program, company → institution, bullets → certifications.
// Most recent first, matching the work history.
export const education: ExperienceItem[] = [
  {
    id: 'hytel-ai-enablement-bootcamp',
    dateLines: ['Feb 2026'],
    role: 'AI Enablement & Jr. Software Engineer Bootcamp',
    company: 'Hytel Pte Ltd',
    bullets: [],
  },
  {
    id: 'cvsu-bacoor-bsit',
    dateLines: ['2021', '2025'],
    role: 'Bachelor of Science in Information Technology',
    company: 'Cavite State University, Bacoor',
    bullets: [
      <>Introduction to Cybersecurity (Cisco Networking Academy)</>,
      <>Endpoint Security (Cisco Networking Academy)</>,
    ],
  },
]
