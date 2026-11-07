import { ViewTransition, type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Wraps a route's content so navigations between routes cross-fade it.
 * Lives in each page (not the layout): layouts persist across navigations, so
 * enter/exit would never fire there. The classes are styled in globals.css.
 * default="none" keeps unrelated transitions (e.g. a refresh) from animating.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}
