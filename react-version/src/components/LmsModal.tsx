import { Mail } from 'lucide-react'
import { contact, whatsappLink } from '../data/site'
import { WhatsAppIcon } from './decor/BrandIcons'
import { Lotus } from './decor/Lotus'
import { Modal } from './ui/Modal'
import './LmsModal.css'

type Props = { open: boolean; onClose: () => void }

/** Shown by "Connect LMS" until an LMS address is added in src/data/site.ts. */
export function LmsModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="lms-title" className="lms-modal">
      <div className="lms-modal__inner">
        <Lotus className="lms-modal__lotus" />
        <h2 id="lms-title">Student Learning Portal</h2>
        <p>Our online learning portal is coming soon. For access details or updates, please get in touch with us.</p>
        <div className="lms-modal__actions">
          <a
            className="btn btn-brown"
            href={whatsappLink('Hello Amritha School of Dance, I would like access to the student LMS.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> WhatsApp us
          </a>
          <a className="btn btn-outline" href={`mailto:${contact.email}?subject=${encodeURIComponent('Student LMS access')}`}>
            <Mail strokeWidth={1.8} /> Email us
          </a>
        </div>
      </div>
    </Modal>
  )
}
