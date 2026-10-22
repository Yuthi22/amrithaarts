import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { X } from 'lucide-react'
import './Modal.css'

type Props = {
  open: boolean
  onClose: () => void
  /** id of the heading that names the dialog */
  labelledBy?: string
  /** accessible name when there is no visible heading */
  label?: string
  variant?: 'panel' | 'fullscreen'
  className?: string
  onKeyDown?: (e: KeyboardEvent<HTMLDialogElement>) => void
  children: ReactNode
}

/**
 * Accessible modal built on the native <dialog> element:
 * focus is trapped, Escape closes it and focus returns to the trigger.
 */
export function Modal({ open, onClose, labelledBy, label, variant = 'panel', className = '', onKeyDown, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`modal modal--${variant} ${className}`}
      aria-labelledby={labelledBy}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClose={() => {
        if (open) onClose()
      }}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop area
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={onKeyDown}
    >
      {open && (
        <>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <X />
          </button>
          {children}
        </>
      )}
    </dialog>
  )
}
