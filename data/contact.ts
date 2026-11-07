import type { ContactLink } from '@/types/portfolio'

// Email is not listed here on purpose: visitors use the contact form, and the
// address stays server-side in CONTACT_TO_EMAIL.
export const contactLinks: ContactLink[] = [
  { label: 'Phone',    value: '0935-161-2607',      href: 'tel:09351612607' },
  { label: 'GitHub',   value: 'chaboiyenz',         href: 'https://github.com/chaboiyenz', external: true },
  { label: 'LinkedIn', value: 'yenzo-teo-gervacio', href: 'https://www.linkedin.com/in/yenzo-teo-gervacio-9008a6367/', external: true },
]
