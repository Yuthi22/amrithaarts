import type { MouseEvent } from 'react'
import { journeys, philosophy } from '../data/site'
import { revealDelay, scrollToSection } from '../hooks/scrollTo'
import { GoldWave } from './decor/GoldWave'
import { LeafBranch } from './decor/LeafBranch'
import { Lotus } from './decor/Lotus'
import './Programmes.css'

/** "Learning Beyond the Classroom" + "Explore Your Creative Journey". */
export function Programmes() {
  return (
    <section className="programmes bg-parchment" aria-label="Teaching philosophy and programmes">
      <LeafBranch className="decor programmes__leaf programmes__leaf--tr" leaves={7} />
      <LeafBranch className="decor programmes__leaf programmes__leaf--bl" leaves={6} />
      <LeafBranch className="decor programmes__leaf programmes__leaf--br" leaves={6} />

      <div className="container programmes__grid">
        <div className="philosophy" data-reveal>
          <p className="kicker">
            Teaching Philosophy <Lotus className="kicker__lotus" /> <span className="kicker__line" />
          </p>
          <h2 className="philosophy__title">
            Learning Beyond <br />
            The Classroom
          </h2>
          <p className="philosophy__intro">{philosophy.intro}</p>
          <ul className="philosophy__list">
            {philosophy.methods.map(({ icon: Icon, title, text }) => (
              <li key={title} className="method">
                <span className="method__icon">
                  <Icon strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p>
                  <strong>{title}</strong> — {text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="journey">
          <div data-reveal>
            <p className="kicker">
              Our Classes <span className="kicker__line kicker__line--short" />
              <Lotus className="kicker__lotus" /> <span className="kicker__line" />
            </p>
            <h2 className="journey__title">Explore Your Creative Journey</h2>
          </div>

          <ul className="journey__cards">
            {journeys.map((item, i) => (
              <li key={item.id} data-reveal style={revealDelay(i, 0.1)}>
                <JourneyCard {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <GoldWave className="decor programmes__wave" />
    </section>
  )
}

function JourneyCard({ title, lines, image, imageAlt, icon, target }: (typeof journeys)[number]) {
  const Icon = icon === 'lotus' ? null : icon
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection(target)
  }

  return (
    <a
      className="journey-card"
      href={`#${target}`}
      onClick={onClick}
      aria-label={`${title}: ${lines.join(' ')} — ${target === 'classes' ? 'see classes' : 'contact us'}`}
    >
      <span className="journey-card__media">
        <img src={image} alt={imageAlt} width={800} height={730} loading="lazy" />
      </span>
      <span className="journey-card__icon" aria-hidden="true">
        {Icon ? <Icon strokeWidth={1.5} /> : <Lotus strokeWidth={1.6} />}
      </span>
      <span className="journey-card__title">{title}</span>
      <span className="journey-card__rule" aria-hidden="true" />
      <span className="journey-card__lines">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    </a>
  )
}
