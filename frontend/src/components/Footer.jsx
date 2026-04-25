import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import logo from '../images/logo.svg'
import { useLanguage } from '../context/LanguageContext'
import { AGENCY } from '../config'
import { trackLead } from '../utils/trackLead'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Mecalus — Agence Immobilière à Marrakech & Casablanca" className="logo-img" />
            </Link>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4>{t('footer.links')}</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/acheter">{t('nav.buy')}</Link>
            <Link to="/louer">{t('nav.rent')}</Link>
            <Link to="/vendre">{t('nav.sell')}</Link>
            <Link to="/mettre-en-location">{t('nav.listForRent')}</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>{t('footer.contact')}</h4>
            <a href={`tel:${AGENCY.phone}`} onClick={() => trackLead({ source: 'footer' }, 'phone')}>
              <Phone size={13} />
              {AGENCY.phoneDisplay}
            </a>
            <a href={`https://wa.me/${AGENCY.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => trackLead({ source: 'footer' }, 'whatsapp')}>
              <MessageCircle size={13} />
              {AGENCY.whatsappDisplay}
            </a>
            <a href={`mailto:${AGENCY.email}`}>
              <Mail size={13} />
              {AGENCY.email}
            </a>
            <p>
              <MapPin size={13} />
              {AGENCY.address}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer.rights')}</p>
          <a href="https://www.moudevpro.com" target="_blank" rel="noopener" title="Développeur Web Freelance Maroc">Site créé par MouDev</a>
        </div>
      </div>
    </footer>
  )
}
