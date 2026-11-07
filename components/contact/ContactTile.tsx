import type { JSX, SVGProps } from 'react'
import { a11y } from '@/data/site'
import { ArrowUpRight, ChevronRight, Envelope, GitHubMark, LinkGlyph, LinkedInMark, Phone } from '@/components/ui/icons'
import type { ContactLink } from '@/types/portfolio'

type ContactKind = 'email' | 'phone' | 'github' | 'linkedin' | 'link'

/** Infers the kind from the link itself, so data/contact.ts needs no extra field.
 *  Anything unrecognized gets a generic link icon, so every tile keeps the same
 *  icon column and alignment. */
function kindOf(href: string): ContactKind {
  if (href.startsWith('mailto:')) return 'email'
  if (href.startsWith('tel:')) return 'phone'
  if (/(^|\/\/|\.)github\.com/i.test(href)) return 'github'
  if (/(^|\/\/|\.)linkedin\.com/i.test(href)) return 'linkedin'
  return 'link'
}

function ContactGlyph({ kind, ...props }: { kind: ContactKind } & SVGProps<SVGSVGElement>): JSX.Element {
  switch (kind) {
    case 'email':
      return <Envelope {...props} />
    case 'phone':
      return <Phone {...props} />
    case 'github':
      return <GitHubMark {...props} />
    case 'linkedin':
      return <LinkedInMark {...props} />
    case 'link':
      return <LinkGlyph {...props} />
  }
}

/** Lets an email address wrap after the "@" rather than mid-word on narrow screens. */
function BreakableValue({ value }: { value: string }) {
  const at = value.indexOf('@')
  if (at <= 0) return <>{value}</>
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  )
}

interface ContactTileProps {
  link: ContactLink
}

const TILE = 'flex min-h-24 items-center gap-4 rounded-tile bg-surface p-5 shadow-card sm:p-6'

export default function ContactTile({ link }: ContactTileProps) {
  const kind = kindOf(link.href)
  // Show the label line only when it adds information beyond the value.
  const showLabel = link.label !== link.value
  const Trailing = link.external ? ArrowUpRight : ChevronRight

  return (
    <a
      href={link.href}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`press-tile group ${TILE}`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-fill text-label">
        <ContactGlyph kind={kind} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        {showLabel && <span className="block text-footnote text-secondary wrap-anywhere">{link.label}</span>}
        {/* Body size on phones: a long email at title size wraps into four lines. */}
        <span className="block text-body font-semibold wrap-anywhere sm:text-title-3">
          <BreakableValue value={link.value} />
        </span>
      </span>
      <Trailing className="size-4 shrink-0 text-tertiary group-hover:text-accent-ink" />
      {link.external && <span className="sr-only"> {a11y.opensInNewTab}</span>}
    </a>
  )
}
