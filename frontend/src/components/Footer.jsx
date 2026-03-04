import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import logo from '../images/logo.svg'
import { useLanguage } from '../context/LanguageContext'
import { AGENCY } from '../config'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Logo" className="logo-img" />
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
            <a href={`tel:${AGENCY.phone}`}>
              <Phone size={13} />
              {AGENCY.phoneDisplay}
            </a>
            <a href={`https://wa.me/${AGENCY.whatsapp}`} target="_blank" rel="noopener noreferrer">
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
        </div>
      </div>
    </footer>
  )
}
