import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Check, Phone } from 'lucide-react'
import { classModules, contact, danceClasses, whatsappLink, type ClassId, type ModuleId } from '../data/site'
import { WhatsAppIcon } from './decor/BrandIcons'
import { Lotus } from './decor/Lotus'
import { Modal } from './ui/Modal'
import './ClassModal.css'

type Props = {
  view: { id: ClassId; tab: ModuleId } | null
  onClose: () => void
}

export function ClassModal({ view, onClose }: Props) {
  return (
    <Modal open={view !== null} onClose={onClose} labelledBy="class-modal-title" className="class-modal">
      {view && <ClassDetails key={`${view.id}-${view.tab}`} id={view.id} initialTab={view.tab} />}
    </Modal>
  )
}

function ClassDetails({ id, initialTab }: { id: ClassId; initialTab: ModuleId }) {
  const item = danceClasses.find((c) => c.id === id) ?? danceClasses[0]
  const [tab, setTab] = useState<ModuleId>(initialTab)
  const tabRefs = useRef<Record<ModuleId, HTMLButtonElement | null>>({ theory: null, practical: null, paper: null })
  const current = item.modules[tab]
  const currentLabel = classModules.find((m) => m.id === tab)?.label ?? ''

  // When a specific class type was chosen, move focus to its tab
  useEffect(() => {
    if (initialTab !== 'theory') tabRefs.current[initialTab]?.focus()
  }, [initialTab])

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const order = classModules.map((m) => m.id)
    const index = order.indexOf(tab)
    let next: ModuleId | null = null
    if (e.key === 'ArrowRight') next = order[(index + 1) % order.length]
    if (e.key === 'ArrowLeft') next = order[(index - 1 + order.length) % order.length]
    if (e.key === 'Home') next = order[0]
    if (e.key === 'End') next = order[order.length - 1]
    if (next) {
      e.preventDefault()
      setTab(next)
      tabRefs.current[next]?.focus()
    }
  }

  const topic = currentLabel.toLowerCase().replace(/ classes$/, '')
  const enquiry = `Hello Amritha School of Dance, I would like to know more about the ${item.title} ${topic} classes.`

  return (
    <article className="class-details">
      <div className="class-details__media">
        <img src={item.image} alt={item.imageAlt} width={584} height={280} />
        <div className="class-details__heading">
          <p className="class-details__kicker">Amritha School of Dance</p>
          <h2 id="class-modal-title">{item.title} Classes</h2>
        </div>
      </div>

      <div className="class-details__body">
        <p className="class-details__intro">{item.intro}</p>

        <dl className="class-details__facts">
          <div>
            <dt>Medium</dt>
            <dd>{item.medium}</dd>
          </div>
          <div>
            <dt>Ages</dt>
            <dd>{item.ages}</dd>
          </div>
          <div>
            <dt>Also open to</dt>
            <dd>{item.agesNote}</dd>
          </div>
        </dl>

        <div className="class-tabs" role="tablist" aria-label="Class types" onKeyDown={onTabKey}>
          {classModules.map(({ id: moduleId, label, icon: Icon }) => (
            <button
              key={moduleId}
              ref={(el) => {
                tabRefs.current[moduleId] = el
              }}
              type="button"
              role="tab"
              id={`tab-${moduleId}`}
              aria-selected={tab === moduleId}
              aria-controls={`panel-${moduleId}`}
              tabIndex={tab === moduleId ? 0 : -1}
              className={`class-tab${tab === moduleId ? ' is-active' : ''}`}
              onClick={() => setTab(moduleId)}
            >
              <Icon strokeWidth={1.6} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>

        <div className="class-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          <p>{current.summary}</p>
          <ul>
            {current.points.map((point) => (
              <li key={point}>
                <Check strokeWidth={2.2} aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="ornament class-details__ornament" aria-hidden="true">
          <i />
          <Lotus />
          <i />
        </div>

        <div className="class-details__actions">
          <a className="btn btn-brown" href={whatsappLink(enquiry)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Enquire on WhatsApp
          </a>
          <a className="btn btn-outline" href={`tel:${contact.phones[0].tel}`}>
            <Phone strokeWidth={1.8} /> Call {contact.phones[0].display}
          </a>
        </div>
      </div>
    </article>
  )
}
