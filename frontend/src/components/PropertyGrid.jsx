import PropertyCard from './PropertyCard'
import { useLanguage } from '../context/LanguageContext'

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line" style={{ width: '80%' }} />
        <div className="skeleton skeleton-line" style={{ width: '50%' }} />
        <div className="skeleton skeleton-line" style={{ width: '65%', marginTop: 8 }} />
        <div className="skeleton skeleton-line" style={{ width: '40%', height: 18, marginTop: 12 }} />
      </div>
    </div>
  )
}

export default function PropertyGrid({ properties, loading, onSelect }) {
  const { t } = useLanguage()

  if (loading) {
    return (
      <section className="properties-section">
        <div className="container">
          <div className="properties-grid">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="properties-section">
      <div className="container">
        <div className="properties-grid">
          {properties.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🏠</div>
              <h3>{t('filters.noResults')}</h3>
              <p>{t('filters.noResultsHint')}</p>
            </div>
          ) : (
            properties.map((p) => (
              <PropertyCard key={p._id} property={p} onSelect={onSelect} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
