import { ViewTransition, type ReactElement } from 'react'

/** The view-transition name for a project's title, shared by every route that shows it. */
export function projectTitleTransitionName(slug: string): string {
  return `project-title-${slug}`
}

interface SharedProjectTitleProps {
  slug: string
  /** A single block-level element (an inline element that wraps lines can't be a transition target). */
  children: ReactElement
}

/**
 * Marks a project title as a shared element. When /work and a future project
 * detail route (e.g. /work/[slug]) both render this with the same slug, the
 * title morphs between its two positions on navigation.
 *
 * share + default="none": morph only when a pair exists; never run a stray
 * cross-fade during unrelated transitions. Keep both props together - with
 * default="none" and no share, the pair silently stops morphing.
 */
export default function SharedProjectTitle({ slug, children }: SharedProjectTitleProps) {
  return (
    <ViewTransition name={projectTitleTransitionName(slug)} share="project-title-morph" default="none">
      {children}
    </ViewTransition>
  )
}
