type Props = { className?: string; strokeWidth?: number }

/** Small line-art lotus used as an ornament throughout the site. */
export function Lotus({ className, strokeWidth = 1.4 }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 3.5c-4.6 5.6-5 15.6 0 23 5-7.4 4.6-17.4 0-23Z" />
      <path d="M24 26.5c-6.3-2.6-10.6-8.6-10.6-16.6 5.2 1.7 9.2 7.2 10.6 16.6Z" />
      <path d="M24 26.5c6.3-2.6 10.6-8.6 10.6-16.6-5.2 1.7-9.2 7.2-10.6 16.6Z" />
      <path d="M23.6 27C15.4 27.4 8 23.5 3.5 16.6c7.4-1 14.6 3.2 20.1 10.4Z" />
      <path d="M24.4 27c8.2.4 15.6-3.5 20.1-10.4-7.4-1-14.6 3.2-20.1 10.4Z" />
      <path d="M15 30h18" />
    </svg>
  )
}
