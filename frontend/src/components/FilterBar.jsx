import { useState, useEffect } from 'react'
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const CATEGORIES = ['apartment', 'villa', 'riad', 'office', 'land', 'commercial', 'maison', 'ferme']
const TRANSACTIONS = ['sale', 'rent']
const CITIES = ['Marrakech', 'Casablanca']

export default function FilterBar({ filters, onFiltersChange, total }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [quartiers, setQuartiers] = useState([])

  useEffect(() => {
    if (!filters.city) { setQuartiers([]); return }
    fetch(`/api/properties/quartiers?city=${encodeURIComponent(filters.city)}`)
      .then((r) => r.json())
      .then((data) => setQuartiers(Array.isArray(data) ? data : []))
      .catch(() => setQuartiers([]))
  }, [filters.city])

  const set = (key, value) => {
    if (key === 'city') {
      onFiltersChange((prev) => ({ ...prev, city: value, quartier: '' }))
    } else {
      onFiltersChange((prev) => ({ ...prev, [key]: value }))
    }
  }

  const reset = () => {
    onFiltersChange({
      category: '', transactionType: '', city: '', quartier: '',
      minPrice: '', maxPrice: '', search: '', minRooms: '',
    })
  }

  const activeCount = [
    filters.category, filters.transactionType, filters.city, filters.quartier,
    filters.minPrice, filters.maxPrice, filters.minRooms,
  ].filter(Boolean).length

  const hasActiveFilters = activeCount > 0

  const filterControls = (
    <>
      <div className="filter-group">
        <span className="filter-label">{t('filters.category')}</span>
        <select value={filters.category} onChange={(e) => set('category', e.target.value)} className="filter-select">
          <option value="">{t('filters.all')}</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{t(`filters.${cat}`)}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <span className="filter-label">{t('filters.transaction')}</span>
        <select value={filters.transactionType} onChange={(e) => set('transactionType', e.target.value)} className="filter-select">
          <option value="">{t('filters.all')}</option>
          {TRANSACTIONS.map((type) => (
            <option key={type} value={type}>{t(`filters.${type}`)}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <span className="filter-label">{t('filters.minRooms')}</span>
        <input
          type="number"
          value={filters.minRooms}
          onChange={(e) => set('minRooms', e.target.value)}
          placeholder={t('filters.roomsAll')}
          min="1"
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <span className="filter-label">{t('filters.city')}</span>
        <select value={filters.city} onChange={(e) => set('city', e.target.value)} className="filter-select">
          <option value="">{t('filters.allCities')}</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {filters.city && quartiers.length > 0 && (
        <div className="filter-group">
          <span className="filter-label">{t('filters.quartier')}</span>
          <select value={filters.quartier || ''} onChange={(e) => set('quartier', e.target.value)} className="filter-select">
            <option value="">{t('filters.allQuartiers')}</option>
            {quartiers.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>
      )}

      <div className="filter-group">
        <span className="filter-label">{t('filters.minPrice')}</span>
        <input type="number" value={filters.minPrice} onChange={(e) => set('minPrice', e.target.value)} placeholder="0" min="0" className="filter-input" />
      </div>
      <div className="filter-group">
        <span className="filter-label">{t('filters.maxPrice')}</span>
        <input type="number" value={filters.maxPrice} onChange={(e) => set('maxPrice', e.target.value)} placeholder="—" min="0" className="filter-input" />
      </div>

      <div className="filter-results-wrap">
        <span className="filter-results">
          <strong>{total}</strong> {t('filters.results')}
        </span>
        {hasActiveFilters && (
          <button className="reset-btn" onClick={reset}>
            ↺ {t('filters.reset')}
          </button>
        )}
      </div>
    </>
  )

  return (
    <div className="filter-section">
      {/* Mobile toggle bar */}
      <button className="filter-mobile-toggle" onClick={() => setOpen((o) => !o)}>
        <span className="filter-mobile-toggle-left">
          <SlidersHorizontal size={16} />
          <span>Filtres</span>
          {activeCount > 0 && <span className="filter-active-badge">{activeCount}</span>}
        </span>
        <span className="filter-mobile-toggle-right">
          <span className="filter-results-inline"><strong>{total}</strong> {t('filters.results')}</span>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* Mobile collapsible body */}
      <div className={`filter-mobile-body${open ? ' open' : ''}`}>
        <div className="filter-inner">{filterControls}</div>
      </div>

      {/* Desktop: always visible */}
      <div className="filter-desktop">
        <div className="filter-inner">{filterControls}</div>
      </div>
    </div>
  )
}
