import { Fragment } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { contact, footerDisciplines, images, whatsappLink } from '../data/site'
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from './decor/BrandIcons'
import { LotusBloom } from './decor/LotusBloom'
import './Footer.css'

const socials = [
  { label: 'WhatsApp', href: whatsappLink(), Icon: WhatsAppIcon },
  { label: 'Facebook', href: contact.social.facebook, Icon: FacebookIcon },
  { label: 'YouTube', href: contact.social.youtube, Icon: YouTubeIcon },
  { label: 'Instagram', href: contact.social.instagram, Icon: InstagramIcon },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="site-footer" aria-labelledby="footer-title">
      <svg className="site-footer__wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 52C220 8 460 6 720 38S1180 74 1440 18V90H0Z" fill="currentColor" />
        <path
          d="M0 52C220 8 460 6 720 38S1180 74 1440 18"
          fill="none"
          stroke="#c99a3c"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <LotusBloom className="decor site-footer__lotus" />

      <div className="container site-footer__grid">
        <div className="footer-brand">
          <img src={images.logo} alt="Amritha School of Dance logo" width={150} height={150} loading="lazy" />
          <div>
            <h2 id="footer-title" className="footer-brand__name">
              Amritha
            </h2>
            <p className="footer-brand__sub">Arts &amp; Development</p>
            <p className="footer-brand__tagline">Inspiring Creativity. Shaping Future</p>
          </div>
        </div>

        <div className="footer-contact">
          <h3 className="footer-heading">Get in Touch</h3>
          <ul>
            <li>
              <Phone aria-hidden="true" />
              <span>
                {contact.phones.map((phone, i) => (
                  <Fragment key={phone.tel}>
                    {i > 0 && <span className="footer-contact__sep" aria-hidden="true">|</span>}
                    <a href={`tel:${phone.tel}`}>{phone.display}</a>
                  </Fragment>
                ))}
              </span>
            </li>
            <li>
              <WhatsAppIcon />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <a
                href={whatsappLink('Hello Amritha School of Dance, could you please send me your location?')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location: sent via WhatsApp on request"
              >
                Sent via WhatsApp
              </a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </div>

        <span className="site-footer__divider" aria-hidden="true" />

        <div className="footer-social">
          <h3 className="footer-heading">Follow Us</h3>
          <ul>
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon />
                  </a>
                ) : (
                  <span className="is-disabled" title={`${label} — coming soon`}>
                    <Icon />
                    <span className="visually-hidden">{label} (coming soon)</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p className="site-footer__disciplines">
          {footerDisciplines.map((item, i) => (
            <Fragment key={item}>
              {i > 0 && <span aria-hidden="true">•</span>}
              {item}
            </Fragment>
          ))}
        </p>
        <p className="site-footer__copy">© {year} Amritha School of Dance. All rights reserved.</p>
      </div>
    </footer>
  )
}
