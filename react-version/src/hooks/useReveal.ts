import { useEffect } from 'react'

/**
 * Fades in every element marked with `data-reveal` as it scrolls into view.
 * Content stays visible if IntersectionObserver is unavailable.
 */
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    )

    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
