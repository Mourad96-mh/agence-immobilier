import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          ✦ Mecalus
        </div>

        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">500+</div>
            <div className="hero-stat-label">{t('hero.stats.properties')}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">2</div>
            <div className="hero-stat-label">{t('hero.stats.cities')}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">1200+</div>
            <div className="hero-stat-label">{t('hero.stats.clients')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
