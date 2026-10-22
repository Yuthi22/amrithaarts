import { Fragment } from 'react'
import { images, principal } from '../data/site'
import { revealDelay } from '../hooks/scrollTo'
import { GoldWave } from './decor/GoldWave'
import { LeafBranch } from './decor/LeafBranch'
import { Lotus } from './decor/Lotus'
import { LotusBloom } from './decor/LotusBloom'
import { Mandala } from './decor/Mandala'
import './Principal.css'

export function Principal() {
  return (
    <section id="about" className="principal bg-parchment" aria-labelledby="principal-title">
      <Mandala className="decor principal__mandala" />
      <LeafBranch className="decor principal__leaf principal__leaf--top" />
      <LeafBranch className="decor principal__leaf principal__leaf--bottom" leaves={7} />
      <img className="principal__ghost" src={images.classBallet} alt="" aria-hidden="true" loading="lazy" />
      <LotusBloom className="decor principal__bloom" filled />

      <div className="container principal__grid">
        <header className="principal__head" data-reveal>
          <div className="principal__title-row">
            <span className="principal__head-line" aria-hidden="true" />
            <Lotus className="principal__head-lotus" />
            <h2 id="principal-title" className="principal__title">
              <span className="principal__title-meet">Meet Our</span>{' '}
              <span className="principal__title-main">Principal</span>
              <svg className="principal__swash" viewBox="0 0 360 40" fill="none" aria-hidden="true">
                <path
                  d="M4 30C110 40 240 38 318 16c22-6 30 4 18 12"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </h2>
          </div>
          <p className="principal__traits">
            {principal.traits.map((trait, i) => (
              <Fragment key={trait}>
                {i > 0 && <span aria-hidden="true">•</span>}
                {trait}
              </Fragment>
            ))}
          </p>
        </header>

        <ol className="principal__timeline" aria-label="Milestones">
          {principal.milestones.map(({ icon: Icon, title, detail }, i) => (
            <li key={title} className="milestone" data-reveal style={revealDelay(i, 0.08)}>
              <span className="milestone__icon">
                <Icon strokeWidth={1.6} aria-hidden="true" />
              </span>
              <strong className="milestone__title">{title}</strong>
              <span className="milestone__detail">{detail}</span>
            </li>
          ))}
        </ol>

        <div className="principal__bio" data-reveal>
          {principal.bio.map((block, i) => (
            <div key={i} className="principal__bio-block">
              {block.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <figure className="principal__portrait" data-reveal style={revealDelay(1, 0.15)}>
          <div className="portrait__frame">
            <LeafBranch className="decor portrait__vine" leaves={7} />
            <div className="portrait__arch">
              <img
                src={images.principalPhoto}
                alt="Amritha Manage, Principal of Amritha School of Dance, seated in a pink saree"
                width={960}
                height={960}
                loading="lazy"
              />
            </div>
          </div>
          <figcaption className="portrait__plaque">
            <span className="portrait__name">{principal.name}</span>
            <span className="ornament portrait__ornament" aria-hidden="true">
              <i />
              <Lotus />
              <i />
            </span>
            <span className="portrait__roles">
              {principal.roles.map((role, i) => (
                <Fragment key={role}>
                  {i > 0 && <b aria-hidden="true">|</b>}
                  <span>{role}</span>
                </Fragment>
              ))}
            </span>
          </figcaption>
        </figure>
      </div>

      <GoldWave className="decor principal__wave" />
    </section>
  )
}
