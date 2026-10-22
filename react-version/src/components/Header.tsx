import { useEffect, useRef, type MouseEvent } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { contact, images, navLinks, whatsappLink, type SectionId } from '../data/site'
import { scrollToSection } from '../hooks/scrollTo'
import { WhatsAppIcon } from './decor/BrandIcons'
import { Lotus } from './decor/Lotus'
import './Header.css'

type Props = {
  active: SectionId
  scrolled: boolean
  menuOpen: boolean
  onMenuChange: (open: boolean) => void
  onConnectLms: () => void
}

export function Header({ active, scrolled, menuOpen, onMenuChange, onConnectLms }: Props) {
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onMenuChange(false)
    requestAnimationFrame(() => scrollToSection(id))
  }

  // Lock page scroll, close on Escape and move focus into the menu while it is open
  useEffect(() => {
    if (!menuOpen) return
    const root = document.documentElement
    root.classList.add('is-locked')
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onMenuChange(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth > 1024) onMenuChange(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      root.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen, onMenuChange])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <a className="brand" href="#home" onClick={go('home')} aria-label="Amritha School of Dance — home">
            <img src={images.logo} alt="" width={64} height={64} />
            <span className="brand__text">
              <strong>AMRITHA</strong>
              <span>SCHOOL OF DANCE</span>
            </span>
          </a>

          <nav className="main-nav" aria-label="Main">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={active === link.id ? 'is-active' : undefined}
                    aria-current={active === link.id ? 'true' : undefined}
                    onClick={go(link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" className="btn btn-gold site-header__lms" onClick={onConnectLms}>
            Connect LMS <ArrowRight strokeWidth={2.4} />
          </button>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => onMenuChange(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile menu sits outside the header so the header's blur doesn't trap it */}
      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} inert={!menuOpen}>
        <div className="mobile-menu__backdrop" onClick={() => onMenuChange(false)} />
        <div
          ref={panelRef}
          className="mobile-menu__panel bg-parchment"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="mobile-menu__top">
            <img src={images.logo} alt="" width={56} height={56} />
            <button
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={() => {
                onMenuChange(false)
                toggleRef.current?.focus()
              }}
            >
              <X />
            </button>
          </div>

          <nav aria-label="Mobile">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={active === link.id ? 'is-active' : undefined}
                    aria-current={active === link.id ? 'true' : undefined}
                    onClick={go(link.id)}
                  >
                    {link.label}
                    <Lotus className="mobile-menu__lotus" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="btn btn-gold mobile-menu__lms"
            onClick={() => {
              onMenuChange(false)
              onConnectLms()
            }}
          >
            Connect LMS <ArrowRight strokeWidth={2.4} />
          </button>

          <div className="mobile-menu__contact">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Message us on WhatsApp
            </a>
            <a href={`tel:${contact.phones[0].tel}`}>{contact.phones[0].display}</a>
          </div>
        </div>
      </div>
    </>
  )
}
