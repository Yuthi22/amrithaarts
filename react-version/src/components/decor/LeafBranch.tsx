type Props = { className?: string; leaves?: number }

// Cubic curve the stem follows (viewBox 0 0 200 320).
const P = [
  [20, 305],
  [70, 230],
  [92, 140],
  [172, 18],
] as const

function point(t: number): [number, number] {
  const u = 1 - t
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const d = t * t * t
  return [
    a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0],
    a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1],
  ]
}

function angle(t: number) {
  const u = 1 - t
  const dx = 3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0])
  const dy = 3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1])
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

const LEAF = 'M0 0C9-9 25-10.5 38 0 25 10.5 9 9 0 0Z'

/** Gold line-art branch with leaves, used as a corner decoration. */
export function LeafBranch({ className, leaves = 9 }: Props) {
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = 0.08 + (i / Math.max(leaves - 1, 1)) * 0.84
    const [x, y] = point(t)
    const side = i % 2 === 0 ? 1 : -1
    return { x, y, rotate: angle(t) + side * 50, scale: 1.3 - t * 0.65 }
  })
  const [ex, ey] = point(1)

  return (
    <svg
      className={className}
      viewBox="0 0 200 320"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={`M${P[0].join(' ')}C${P[1].join(' ')} ${P[2].join(' ')} ${P[3].join(' ')}`} />
      {items.map((leaf, i) => (
        <g
          key={i}
          transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.rotate.toFixed(1)}) scale(${leaf.scale.toFixed(2)})`}
        >
          <path d={LEAF} fill="currentColor" fillOpacity={0.07} vectorEffect="non-scaling-stroke" />
          <path d="M3 0H32" strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      <g transform={`translate(${ex} ${ey}) rotate(${angle(1).toFixed(1)}) scale(0.75)`}>
        <path d={LEAF} fill="currentColor" fillOpacity={0.07} vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}
