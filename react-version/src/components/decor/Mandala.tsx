import type { ReactNode } from 'react'

const ring = (count: number, render: (i: number, deg: number) => ReactNode) =>
  Array.from({ length: count }, (_, i) => render(i, (360 / count) * i))

/** Fine gold mandala used as a faint background ornament. */
export function Mandala({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-100 -100 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6}
      aria-hidden="true"
      focusable="false"
    >
      <circle r="6" />
      <circle r="13" />
      {ring(8, (i, d) => (
        <path key={`a${i}`} d="M0-13C5-19 5-27 0-33-5-27-5-19 0-13Z" transform={`rotate(${d})`} />
      ))}
      {ring(8, (i, d) => (
        <path key={`b${i}`} d="M0-15C3-19 3-23 0-27-3-23-3-19 0-15Z" transform={`rotate(${d + 22.5})`} />
      ))}
      <circle r="38" />
      <circle r="41" strokeDasharray="1 2.4" />
      {ring(16, (i, d) => (
        <path key={`c${i}`} d="M0-41C7-49 7-57 0-65-7-57-7-49 0-41Z" transform={`rotate(${d})`} />
      ))}
      {ring(16, (i, d) => (
        <circle key={`d${i}`} cy="-64" r="2.2" transform={`rotate(${d + 11.25})`} />
      ))}
      <circle r="70" />
      {ring(32, (i, d) => (
        <path key={`e${i}`} d="M-6-70Q0-83 6-70" transform={`rotate(${d})`} />
      ))}
      <circle r="86" strokeDasharray="1.5 3" />
      {ring(48, (i, d) => (
        <path key={`f${i}`} d="M0-89V-96" transform={`rotate(${d})`} />
      ))}
      <circle r="98" />
    </svg>
  )
}
