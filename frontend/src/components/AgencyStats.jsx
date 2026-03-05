import { useLanguage } from '../context/LanguageContext'

export default function AgencyStats() {
  const { t } = useLanguage()

  const stats = [
    { num: t('stats.sinceYear'), label: t('stats.since') },
    { num: '500+', label: t('stats.properties') },
    { num: '2', label: t('stats.cities') },
    { num: '98%', label: t('stats.satisfaction') },
  ]

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map(({ num, label }, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
