import { ArrowRight, Expand } from 'lucide-react'
import { achievement, galleryItems, images, SLGT_GALLERY_INDEX } from '../data/site'
import { revealDelay } from '../hooks/scrollTo'
import { LeafBranch } from './decor/LeafBranch'
import { Lotus } from './decor/Lotus'
import './Highlights.css'

type Props = {
  onOpenPhoto: (index: number) => void
  onOpenGallery: () => void
}

/** Achievements + gallery preview. */
export function Highlights({ onOpenPhoto, onOpenGallery }: Props) {
  const preview = galleryItems.slice(0, 4)

  return (
    <section id="gallery" className="highlights bg-parchment" aria-label="Achievements and gallery">
      <LeafBranch className="decor highlights__leaf highlights__leaf--tl" leaves={6} />
      <LeafBranch className="decor highlights__leaf highlights__leaf--br" leaves={6} />

      <div className="container highlights__grid">
        <button
          type="button"
          className="highlights__feature"
          onClick={() => onOpenPhoto(SLGT_GALLERY_INDEX)}
          aria-label="View photo: Sri Lanka’s Got Talent – Runners Up"
          data-reveal
        >
          <img
            src={images.slgtRunnerUp}
            alt="Amritha School of Dance Kandyan dancers — Sri Lanka’s Got Talent runner up"
            width={1400}
            height={788}
            loading="lazy"
          />
          <span className="highlights__zoom" aria-hidden="true">
            <Expand strokeWidth={1.8} />
          </span>
        </button>

        <div className="highlights__achievement" data-reveal style={revealDelay(1)}>
          <p className="highlights__kicker">{achievement.kicker}</p>
          <h2 className="highlights__title">{achievement.title}</h2>
          <p className="highlights__award">– {achievement.award}</p>
          <p className="highlights__text">{achievement.text}</p>
          <div className="ornament" aria-hidden="true">
            <i />
            <Lotus />
            <i />
          </div>
        </div>

        <span className="highlights__divider" aria-hidden="true" />

        <div className="highlights__gallery" data-reveal style={revealDelay(2)}>
          <p className="highlights__kicker">Gallery</p>
          <h2 className="highlights__title">Moments of Inspiration</h2>
          <ul className="thumbs">
            {preview.map((item, i) => (
              <li key={item.caption}>
                <button type="button" className="thumb" onClick={() => onOpenPhoto(i)} aria-label={`View photo: ${item.caption}`}>
                  <img src={item.src} alt={item.alt} width={440} height={476} loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-outline" onClick={onOpenGallery}>
            View Gallery <ArrowRight strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}
