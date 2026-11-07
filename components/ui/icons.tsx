import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  'aria-hidden': true,
  focusable: false,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.75} {...base} {...props}>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  )
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.75} {...base} {...props}>
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  )
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden focusable={false} fill="currentColor" {...props}>
      <path d="M8 1.6l1.88 3.98 4.36.5-3.23 2.98.87 4.3L8 11.2l-3.88 2.16.87-4.3L1.76 6.08l4.36-.5L8 1.6z" />
    </svg>
  )
}

export function Envelope(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  )
}

export function Phone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...props}>
      <path d="M6.6 3.5h2.2l1.4 4-2 1.4a11 11 0 0 0 6.9 6.9l1.4-2 4 1.4v2.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  )
}

export function CheckCircle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.25 12.25 2.5 2.5 5-5.25" />
    </svg>
  )
}

/** Generic link, for contact kinds without a dedicated mark. */
export function LinkGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...props}>
      <path d="M10 14a4.5 4.5 0 0 0 6.36 0l3-3a4.5 4.5 0 0 0-6.36-6.36l-1.5 1.5" />
      <path d="M14 10a4.5 4.5 0 0 0-6.36 0l-3 3a4.5 4.5 0 0 0 6.36 6.36l1.5-1.5" />
    </svg>
  )
}

export function GitHubMark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} fill="currentColor" {...props}>
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.6c-2.64.57-3.2-1.27-3.2-1.27-.43-1.1-1.06-1.39-1.06-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.61.33-1.03.6-1.27-2.1-.24-4.32-1.05-4.32-4.68 0-1.03.37-1.88.98-2.54-.1-.24-.43-1.2.09-2.5 0 0 .8-.26 2.61.97a9.1 9.1 0 0 1 4.76 0c1.81-1.23 2.61-.97 2.61-.97.52 1.3.19 2.26.09 2.5.61.66.98 1.51.98 2.54 0 3.64-2.22 4.44-4.34 4.67.34.3.64.88.64 1.77v2.63c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5z" />
    </svg>
  )
}

export function LinkedInMark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} fill="currentColor" {...props}>
      <path d="M5.34 3.5a1.84 1.84 0 1 1 0 3.68 1.84 1.84 0 0 1 0-3.68zM3.75 8.75h3.18V20.5H3.75zM9.08 8.75h3.05v1.6h.04c.42-.8 1.46-1.65 3.01-1.65 3.22 0 3.82 2.12 3.82 4.88v6.92h-3.18v-6.13c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.6-2.35 3.24v6.23H9.08z" />
    </svg>
  )
}
