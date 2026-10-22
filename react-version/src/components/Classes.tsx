import { ArrowRight, User, Users } from 'lucide-react'
import { classModules, danceClasses, type ClassId, type DanceClass, type ModuleId } from '../data/site'
import { revealDelay } from '../hooks/scrollTo'
import { GoldWave } from './decor/GoldWave'
import { LeafBranch } from './decor/LeafBranch'
import { Lotus } from './decor/Lotus'
import { Mandala } from './decor/Mandala'
import './Classes.css'

type Props = { onOpen: (id: ClassId, tab?: ModuleId) => void }

export function Classes({ onOpen }: Props) {
  return (
    <section id="classes" className="classes bg-parchment" aria-labelledby="classes-title">
      <Mandala className="decor classes__mandala classes__mandala--tl" />
      <Mandala className="decor classes__mandala classes__mandala--br" />
      <LeafBranch className="decor classes__leaf classes__leaf--left" leaves={8} />
      <LeafBranch className="decor classes__leaf classes__leaf--right" leaves={8} />

      <div className="container">
        <header className="classes__head" data-reveal>
          <h2 id="classes-title" className="classes__title">
            <span>Classes</span>
          </h2>
          <Lotus className="classes__lotus" />
        </header>

        <div className="classes__grid">
          {danceClasses.map((item, i) => (
            <ClassCard key={item.id} item={item} onOpen={onOpen} index={i} />
          ))}
        </div>
      </div>

      <GoldWave className="decor classes__wave" />
    </section>
  )
}

function ClassCard({ item, onOpen, index }: { item: DanceClass; onOpen: Props['onOpen']; index: number }) {
  const titleId = `class-${item.id}-title`
  return (
    <article className="class-card" aria-labelledby={titleId} data-reveal style={revealDelay(index, 0.15)}>
      <div className="class-card__media">
        <img src={item.image} alt={item.imageAlt} width={584} height={280} loading="lazy" />
      </div>

      <div className="class-card__body">
        <h3 id={titleId} className="class-card__title">
          {item.title}
        </h3>

        <div className="class-card__meta">
          <div className="class-meta">
            <Users className="class-meta__icon" strokeWidth={1.4} aria-hidden="true" />
            <div>
              <span className="class-meta__label">Medium</span>
              <strong>{item.medium}</strong>
            </div>
          </div>
          <span className="class-card__divider" aria-hidden="true" />
          <div className="class-meta">
            <User className="class-meta__icon" strokeWidth={1.4} aria-hidden="true" />
            <div>
              <span className="class-meta__label">Ages</span>
              <strong>{item.ages}</strong>
              <span className="class-meta__note">{item.agesNote}</span>
            </div>
          </div>
        </div>

        <ul className="class-card__chips" aria-label={`${item.title} class types`}>
          {classModules.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                className="chip"
                onClick={() => onOpen(item.id, id)}
                aria-label={`${item.title} ${label} — view details`}
              >
                <Icon strokeWidth={1.6} aria-hidden="true" /> {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="class-card__footer">
          <button type="button" className="btn btn-brown" onClick={() => onOpen(item.id)}>
            View Classes <ArrowRight strokeWidth={2} />
          </button>
        </div>
      </div>
    </article>
  )
}
