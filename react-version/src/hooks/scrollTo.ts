import type { CSSProperties } from 'react'

/** Smoothly scrolls to a section and updates the address bar. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (id === 'home') window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

/** Staggered delay for `data-reveal` elements. */
export function revealDelay(index: number, step = 0.1): CSSProperties {
  return { '--reveal-delay': `${(index * step).toFixed(2)}s` } as CSSProperties
}
