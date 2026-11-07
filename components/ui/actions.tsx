import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from '@/components/ui/icons'

interface ActionProps {
  href: string
  children: ReactNode
  className?: string
}

/** Shared by PrimaryAction and any <button> that should look like it. */
export const PRIMARY_ACTION_CLASS =
  'press inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-callout font-medium text-on-accent hover:bg-accent-hover'

/** Filled pill: the one primary action on a screen. */
export function PrimaryAction({ href, children, className = '' }: ActionProps) {
  return (
    <Link
      href={href}
      className={`${PRIMARY_ACTION_CLASS} ${className}`}
    >
      {children}
    </Link>
  )
}

/** Text link with a trailing chevron, Apple's secondary action. */
export function TextAction({ href, children, className = '' }: ActionProps) {
  return (
    <Link
      href={href}
      className={`press group inline-flex min-h-11 items-center gap-1 rounded-full px-1 text-callout font-medium text-accent-ink ${className}`}
    >
      <span className="group-hover:underline group-hover:underline-offset-4">{children}</span>
      <ChevronRight className="size-3.5" />
    </Link>
  )
}
