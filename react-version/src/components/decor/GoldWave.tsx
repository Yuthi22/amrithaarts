/** Flowing double gold line used to soften section edges. */
export function GoldWave({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 96C180 40 360 20 560 58S960 118 1140 70 1360 30 1440 44"
        strokeWidth={1.4}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 112C220 72 420 58 620 82S1000 118 1200 94 1380 76 1440 82"
        strokeWidth={0.8}
        opacity={0.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
