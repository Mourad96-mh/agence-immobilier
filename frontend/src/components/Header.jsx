import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Phone, Mail, MessageCircle, Menu, X } from 'lucide-react'
import logo from '../images/logo.svg'
import { useLanguage } from '../context/LanguageContext'
import { AGENCY } from '../config'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
]

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const navItems = [
    { to: '/',                    label: t('nav.home'),        end: true },
    { to: '/acheter',             label: t('nav.buy') },
    { to: '/louer',               label: t('nav.rent') },
    { to: '/vendre',              label: t('nav.sell') },
    { to: '/mettre-en-location',  label: t('nav.listForRent') },
  ]

  const close = () => setMenuOpen(false)

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <a href={`tel:${AGENCY.phone}`}>
              <Phone size={12} />
              {AGENCY.phoneDisplay}
            </a>
            <a href={`https://wa.me/${AGENCY.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={12} />
              {AGENCY.whatsappDisplay}
            </a>
            <a href={`mailto:${AGENCY.email}`}>
              <Mail size={12} />
              {AGENCY.email}
            </a>
          </div>
          <div className="topbar-right">
            <a href={AGENCY.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href={AGENCY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={AGENCY.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="header-main">
        <div className="container header-inner">
          {/* Logo */}
          <Link to="/" className="logo" onClick={close}>
            <img src={logo} alt="Mecalus — Agence Immobilière à Marrakech & Casablanca" className="logo-img" />
          </Link>

          {/* Desktop nav */}
          <nav className="nav">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: lang switcher + burger */}
          <div className="header-right">
            <div className="lang-switcher">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  className={`lang-btn${lang === code ? ' active' : ''}`}
                  onClick={() => { setLang(code); close() }}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              className={`burger-btn${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <>
          <div className="mobile-menu-backdrop" onClick={close} />
          <nav className="mobile-menu">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {label}
              </NavLink>
            ))}
            <div className="mobile-menu-footer">
              <div className="lang-switcher">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    className={`lang-btn${lang === code ? ' active' : ''}`}
                    onClick={() => { setLang(code); close() }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <a href={`tel:${AGENCY.phone}`} className="mobile-menu-contact">
                <Phone size={14} /> {AGENCY.phoneDisplay}
              </a>
              <a href={`https://wa.me/${AGENCY.whatsapp}`} className="mobile-menu-contact" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={14} /> {AGENCY.whatsappDisplay}
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
