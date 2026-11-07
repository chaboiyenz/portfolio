import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/** Centers content at the site's reading width with safe-area-aware gutters. */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-content pr-[max(var(--spacing-gutter),env(safe-area-inset-right))] pl-[max(var(--spacing-gutter),env(safe-area-inset-left))] ${className}`}
    >
      {children}
    </div>
  )
}
