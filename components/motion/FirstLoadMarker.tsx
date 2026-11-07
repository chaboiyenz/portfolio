'use client'

import { useEffect } from 'react'

// Longest intro element: delay (3 steps × 70ms) + 700ms duration, with margin.
// Kept in sync with --intro-* in globals.css.
const INTRO_TOTAL_MS = 1100

/**
 * Marks the hero intro as played by setting data-intro-done on <html> once
 * the first-load animation has finished. Later visits to "/" in the same
 * document (client navigation, back button) then render the hero static.
 *
 * It waits for the animation to finish rather than setting the flag right
 * away: removing the selector mid-animation would cut the intro off.
 */
export default function FirstLoadMarker() {
  useEffect(() => {
    const id = window.setTimeout(() => {
      document.documentElement.setAttribute('data-intro-done', '')
    }, INTRO_TOTAL_MS)
    return () => window.clearTimeout(id)
  }, [])

  return null
}
