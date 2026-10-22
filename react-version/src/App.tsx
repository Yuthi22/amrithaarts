import { useCallback, useEffect, useState } from 'react'
import { contact, galleryItems, sectionIds, type ClassId, type ModuleId } from './data/site'
import { useReveal } from './hooks/useReveal'
import { useScrolled } from './hooks/useScrolled'
import { useScrollSpy } from './hooks/useScrollSpy'
import { scrollToSection } from './hooks/scrollTo'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Principal } from './components/Principal'
import { Programmes } from './components/Programmes'
import { Classes } from './components/Classes'
import { ClassModal } from './components/ClassModal'
import { Highlights } from './components/Highlights'
import { GalleryModal, Lightbox } from './components/Gallery'
import { Footer } from './components/Footer'
import { LmsModal } from './components/LmsModal'

export default function App() {
  const activeSection = useScrollSpy(sectionIds)
  const scrolled = useScrolled()
  useReveal()

  const [menuOpen, setMenuOpen] = useState(false)
  const [classView, setClassView] = useState<{ id: ClassId; tab: ModuleId } | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState<number | null>(null)
  const [lmsOpen, setLmsOpen] = useState(false)

  // Jump to the section in the address bar (e.g. /#classes) on first load
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id && document.getElementById(id)) {
      requestAnimationFrame(() => scrollToSection(id))
    }
  }, [])

  const connectLms = useCallback(() => {
    if (contact.lmsUrl) window.open(contact.lmsUrl, '_blank', 'noopener,noreferrer')
    else setLmsOpen(true)
  }, [])

  const openClass = useCallback((id: ClassId, tab: ModuleId = 'theory') => setClassView({ id, tab }), [])

  return (
    <>
      <Header
        active={activeSection}
        scrolled={scrolled}
        menuOpen={menuOpen}
        onMenuChange={setMenuOpen}
        onConnectLms={connectLms}
      />

      <main id="main">
        <Hero />
        <Principal />
        <Programmes />
        <Classes onOpen={openClass} />
        <Highlights onOpenPhoto={setPhotoIndex} onOpenGallery={() => setGalleryOpen(true)} />
      </main>

      <Footer />

      <ClassModal view={classView} onClose={() => setClassView(null)} />
      <GalleryModal
        open={galleryOpen}
        items={galleryItems}
        onClose={() => setGalleryOpen(false)}
        onOpenPhoto={setPhotoIndex}
      />
      <Lightbox items={galleryItems} index={photoIndex} onChange={setPhotoIndex} onClose={() => setPhotoIndex(null)} />
      <LmsModal open={lmsOpen} onClose={() => setLmsOpen(false)} />
    </>
  )
}
