import { useId } from 'react'

type Props = { className?: string; filled?: boolean }

/** Large line-art lotus flower (footer and section corners). */
export function LotusBloom({ className, filled = false }: Props) {
  const id = useId()
  const fill = filled ? `url(#${id})` : 'none'
  return (
    <svg
      className={className}
      viewBox="0 0 220 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {filled && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.7" stopColor="#fbf1dc" />
            <stop offset="1" stopColor="#efd9a8" />
          </linearGradient>
        </defs>
      )}
      <path fill={fill} d="M108 134C72 146 30 140 6 122c34-10 74-4 102 12Z" />
      <path fill={fill} d="M112 134c36 12 78 6 102-12-34-10-74-4-102 12Z" />
      <path fill={fill} d="M110 132c-34 2-66-16-84-48 32-4 64 16 84 48Z" />
      <path fill={fill} d="M110 132c34 2 66-16 84-48-32-4-64 16-84 48Z" />
      <path fill={fill} d="M110 130c-26-10-44-40-42-80 22 12 36 40 42 80Z" />
      <path fill={fill} d="M110 130c26-10 44-40 42-80-22 12-36 40-42 80Z" />
      <path fill={fill} d="M110 20c-18 30-18 80 0 110 18-30 18-80 0-110Z" />
      <path d="M110 34v88M86 76c8 14 14 30 18 46M134 76c-8 14-14 30-18 46" strokeWidth={0.7} opacity={0.6} />
    </svg>
  )
}
