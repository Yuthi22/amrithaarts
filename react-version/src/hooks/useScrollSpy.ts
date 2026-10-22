import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view.
 * The last section wins once the page is scrolled to the bottom.
 */
export function useScrollSpy<T extends string>(ids: readonly T[], offset = 120): T {
  const [active, setActive] = useState<T>(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const doc = document.documentElement
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setActive(ids[ids.length - 1])
        return
      }
      const line = offset + window.innerHeight * 0.25
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return active
}
