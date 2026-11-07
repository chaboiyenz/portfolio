// Copy that used to be hardcoded inside page components. The wording is
// unchanged; only the casing was the old design's, so it is written plainly
// here and styled by the components.

export const SITE_NAME = 'Yenzo Gervacio'
export const SITE_ROLE = 'Jr. Software Engineer'

// Alt text for the Open Graph / Twitter share image. Mirrors
// app/opengraph-image.alt.txt and app/twitter-image.alt.txt; keep them in sync.
export const SHARE_IMAGE_ALT = 'Yenzo Gervacio - Software engineer, full-stack and applied AI'

export const hero = {
  eyebrow: 'Jr. Software Engineer at Hytel',
  title: 'Yenzo Gervacio',
  summary:
    'Building full-stack products with TypeScript, React, and Node, wired with AI pipelines and third-party integrations.',
  primaryCta: 'View my projects',
  secondaryCta: 'Contact me',
} as const

export const stackSection = {
  title: 'Technical Stack',
} as const

export const workPage = {
  eyebrow: 'Selected Projects',
  title: 'Projects.',
} as const

export const experiencePage = {
  eyebrow: 'Work History',
  title: 'Experience.',
  educationTitle: 'Education',
} as const

export const contactPage = {
  eyebrow: 'Get in touch',
  title: "Let's build together.",
  formTitle: 'Send a message',
  formIntro: 'Tell me about the role, project, or idea. It goes straight to my inbox.',
  elsewhereTitle: 'Elsewhere',
} as const

export const contactForm = {
  labels: {
    email: 'Your email',
    message: 'Message',
  },
  placeholders: {
    email: 'you@example.com',
    message: 'What are you working on, and how can I help?',
  },
  submit: 'Send message',
  pending: 'Sending…',
  success: "Thanks, your message is on its way. I'll reply to the email you gave.",
  errors: {
    emailInvalid: 'Enter a valid email address so I can reply.',
    messageTooShort: 'Write a little more, at least 10 characters.',
    messageTooLong: 'Keep your message under 5,000 characters.',
    rateLimited: "You've sent a few messages already. Try again in a few minutes.",
    sendFailed: "Your message couldn't be sent. Try again, or reach me on LinkedIn.",
  },
} as const

export const navCta = 'Get in touch'

// Per-route <title> and description. The site-wide title and description
// (used by "/") are in lib/metadata.ts alongside the Open Graph setup.
export const routeMeta = {
  work: {
    title: 'Projects',
    description:
      'Selected projects by Yenzo Gervacio: Flinki, Maneho AI, Commission Monitoring System, Lead Management System, BrighterMind, and DailyArc.',
  },
  experience: {
    title: 'Experience',
    description:
      'Jr. Software Engineer at Hytel Pte Ltd, previously Software Developer Support at Inner SPARC Realty Corporation.',
  },
  contact: {
    title: 'Contact',
    description: 'Send Yenzo Gervacio a message, or reach out by phone, GitHub, or LinkedIn.',
  },
} as const

export const notFoundPage = {
  eyebrow: '404',
  title: 'Page not found.',
  body: "The page you're looking for doesn't exist or has moved.",
  cta: 'Go to home',
} as const

// Assistive-technology strings: not visible, but still content.
export const a11y = {
  skipToContent: 'Skip to content',
  primaryNav: 'Primary',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  opensInNewTab: '(opens in a new tab)',
} as const
