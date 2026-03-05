import { useState } from 'react'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import FilterBar from '../components/FilterBar'
import PropertyGrid from '../components/PropertyGrid'
import PropertyModal from '../components/PropertyModal'
import AlertSection from '../components/AlertSection'
import { useProperties } from '../hooks/useProperties'
import { useLanguage } from '../context/LanguageContext'

// Pre-filtered to rent
const RENT_FILTERS = {
  category: '', transactionType: 'rent', city: '',
  minPrice: '', maxPrice: '', search: '', minRooms: '',
}

export default function LouerPage() {
  useSEO({
    title: 'Location immobilière à Marrakech & Casablanca | Mecalus',
    description: "Trouvez votre location idéale à Marrakech ou Casablanca. Appartements, villas, maisons et bureaux à louer. Mecalus, votre agence immobilière de confiance au Maroc.",
    canonical: 'https://mecalus.org/louer',
  })
  const { t } = useLanguage()
  const { properties, loading, filters, setFilters } = useProperties(RENT_FILTERS)
  const [selectedProperty, setSelectedProperty] = useState(null)

  return (
    <>
      <PageHero
        title={t('pages.rent.title')}
        subtitle={t('pages.rent.subtitle')}
      />
      <FilterBar filters={filters} onFiltersChange={setFilters} total={properties.length} />
      <PropertyGrid properties={properties} loading={loading} onSelect={setSelectedProperty} />
      <AlertSection />

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  )
}
