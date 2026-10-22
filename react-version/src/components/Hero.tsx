import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { images } from '../data/site'
import { scrollToSection } from '../hooks/scrollTo'
import { LeafBranch } from './decor/LeafBranch'
import './Hero.css'

export function Hero() {
  const exploreClasses = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('classes')
  }

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__sky" aria-hidden="true" />
      <div className="hero__photo">
        <img
          src={images.heroProcession}
          alt="Amritha School of Dance students in traditional Sri Lankan costume walking together in procession"
          width={1070}
          height={714}
          fetchPriority="high"
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__inner">
          <p className="hero__kicker">
            Tradition <span aria-hidden="true">×</span> Discipline <span aria-hidden="true">×</span> Expression
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-main">Amritha</span>
            <span className="hero__title-sub">School of Dance</span>
          </h1>
          <p className="hero__tagline">Inspiring Creativity. Shaping Future.</p>
          <a className="btn btn-gold hero__cta" href="#classes" onClick={exploreClasses}>
            Explore Our Classes <ArrowRight strokeWidth={2.6} />
          </a>
        </div>
      </div>

      <LeafBranch className="decor hero__leaf hero__leaf--left" leaves={5} />
      <LeafBranch className="decor hero__leaf hero__leaf--right" leaves={5} />
    </section>
  )
}
