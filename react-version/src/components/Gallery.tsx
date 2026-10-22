import { useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '../data/site'
import { Lotus } from './decor/Lotus'
import { Modal } from './ui/Modal'
import './Gallery.css'

/* ------------------------------------------------------------------ */
/* Full gallery grid                                                   */
/* ------------------------------------------------------------------ */

type GridProps = {
  open: boolean
  items: GalleryItem[]
  onClose: () => void
  onOpenPhoto: (index: number) => void
}

export function GalleryModal({ open, items, onClose, onOpenPhoto }: GridProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="gallery-modal-title" className="gallery-modal">
      <div className="gallery-modal__inner">
        <header className="gallery-modal__head">
          <p className="gallery-modal__kicker">Gallery</p>
          <h2 id="gallery-modal-title">Moments of Inspiration</h2>
          <div className="ornament" aria-hidden="true">
            <i />
            <Lotus />
            <i />
          </div>
        </header>
        <ul className="gallery-grid">
          {items.map((item, i) => (
            <li key={item.caption}>
              <button type="button" className="gallery-grid__item" onClick={() => onOpenPhoto(i)}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span className="gallery-grid__caption">{item.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

type LightboxProps = {
  items: GalleryItem[]
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}

export function Lightbox({ items, index, onChange, onClose }: LightboxProps) {
  const swipeStart = useRef<number | null>(null)
  const open = index !== null
  const item = open ? items[index] : null
  const count = items.length

  const step = (delta: number) => {
    if (index === null) return
    onChange((index + delta + count) % count)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = e.clientX
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return
    const dx = e.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
  }

  return (
    <Modal open={open} onClose={onClose} label="Photo viewer" variant="fullscreen" onKeyDown={onKeyDown}>
      {item && index !== null && (
        <div className="lightbox">
          <div className="lightbox__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <figure className="lightbox__figure" key={index}>
              <img src={item.src} alt={item.alt} draggable={false} />
              <figcaption>
                <span className="lightbox__caption">{item.caption}</span>
                <span className="lightbox__count" aria-live="polite">
                  {index + 1} / {count}
                </span>
              </figcaption>
            </figure>
          </div>

          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
            <ChevronLeft />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next photo">
            <ChevronRight />
          </button>

          <ul className="lightbox__strip" aria-label="All photos">
            {items.map((thumb, i) => (
              <li key={thumb.caption}>
                <button
                  type="button"
                  className={`lightbox__thumb${i === index ? ' is-active' : ''}`}
                  onClick={() => onChange(i)}
                  aria-label={`Show photo ${i + 1}: ${thumb.caption}`}
                  aria-current={i === index ? 'true' : undefined}
                >
                  <img src={thumb.src} alt="" loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  )
}
