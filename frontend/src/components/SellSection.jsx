import { Link } from 'react-router-dom'
import { Home, Key } from 'lucide-react'

import { useLanguage } from '../context/LanguageContext'

export default function SellSection() {
  const { t } = useLanguage()

  return (
    <section className="sell-section">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 48 }}>
          <h2 className="section-title" style={{ color: 'white' }}>
            {t('sell.title')}
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {t('sell.subtitle')}
          </p>
        </div>

        <div className="sell-grid">
          <div className="sell-card">
            <div className="sell-icon">
              <Home size={30} color="var(--accent)" />
            </div>
            <h3>{t('sell.sellTitle')}</h3>
            <p>{t('sell.sellDesc')}</p>
            <Link to="/vendre" className="sell-cta">
              {t('sell.sellCTA')}
            </Link>
          </div>

          <div className="sell-card">
            <div className="sell-icon">
              <Key size={30} color="var(--accent)" />
            </div>
            <h3>{t('sell.rentTitle')}</h3>
            <p>{t('sell.rentDesc')}</p>
            <Link to="/mettre-en-location" className="sell-cta sell-cta-outline">
              {t('sell.rentCTA')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
