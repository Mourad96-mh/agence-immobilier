import { useLanguage } from '../context/LanguageContext'

const CATEGORIES = ['apartment', 'villa', 'office', 'land', 'commercial']
const TRANSACTIONS = ['sale', 'rent']
const CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
  'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Salé',
]

export default function FilterBar({ filters, onFiltersChange, total }) {
  const { t } = useLanguage()

  const set = (key, value) => onFiltersChange((prev) => ({ ...prev, [key]: value }))

  const reset = () =>
    onFiltersChange({
      category: '', transactionType: '', city: '',
      minPrice: '', maxPrice: '', search: '', minRooms: '',
    })

  const hasActiveFilters =
    filters.category || filters.transactionType || filters.city ||
    filters.minPrice || filters.maxPrice || filters.search || filters.minRooms

  return (
    <div className="filter-section">
      <div className="filter-inner">

        {/* Category */}
        <div className="filter-group">
          <span className="filter-label">{t('filters.category')}</span>
          <select value={filters.category} onChange={(e) => set('category', e.target.value)} className="filter-select">
            <option value="">{t('filters.all')}</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{t(`filters.${cat}`)}</option>
            ))}
          </select>
        </div>

        {/* Transaction */}
        <div className="filter-group">
          <span className="filter-label">{t('filters.transaction')}</span>
          <select value={filters.transactionType} onChange={(e) => set('transactionType', e.target.value)} className="filter-select">
            <option value="">{t('filters.all')}</option>
            {TRANSACTIONS.map((type) => (
              <option key={type} value={type}>{t(`filters.${type}`)}</option>
            ))}
          </select>
        </div>

        {/* Rooms */}
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

        {/* City */}
        <div className="filter-group">
          <span className="filter-label">{t('filters.city')}</span>
          <select value={filters.city} onChange={(e) => set('city', e.target.value)} className="filter-select">
            <option value="">{t('filters.allCities')}</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div className="filter-group">
          <span className="filter-label">{t('filters.minPrice')}</span>
          <input type="number" value={filters.minPrice} onChange={(e) => set('minPrice', e.target.value)} placeholder="0" min="0" className="filter-input" />
        </div>
        <div className="filter-group">
          <span className="filter-label">{t('filters.maxPrice')}</span>
          <input type="number" value={filters.maxPrice} onChange={(e) => set('maxPrice', e.target.value)} placeholder="—" min="0" className="filter-input" />
        </div>

        {/* Results + reset */}
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

      </div>
    </div>
  )
}
