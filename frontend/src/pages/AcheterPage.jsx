import { useState } from 'react'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import FilterBar from '../components/FilterBar'
import PropertyGrid from '../components/PropertyGrid'
import PropertyModal from '../components/PropertyModal'
import AgencyStats from '../components/AgencyStats'
import SellSection from '../components/SellSection'
import { useProperties } from '../hooks/useProperties'
import { useLanguage } from '../context/LanguageContext'

// Pre-filtered to sale — user can still change it via FilterBar
const SALE_FILTERS = {
  category: '', transactionType: 'sale', city: '',
  minPrice: '', maxPrice: '', search: '', minRooms: '',
}

export default function AcheterPage() {
  useSEO({
    title: 'Acheter un bien immobilier à Marrakech & Casablanca | Mecalus',
    description: "Parcourez nos annonces de vente : appartements, villas, maisons, fermes, terrains et bureaux à Marrakech et Casablanca. Trouvez votre bien idéal avec Mecalus.",
    canonical: 'https://mecalus.org/acheter',
  })
  const { t } = useLanguage()
  const { properties, loading, filters, setFilters } = useProperties(SALE_FILTERS)
  const [selectedProperty, setSelectedProperty] = useState(null)

  return (
    <>
      <PageHero
        title={t('pages.buy.title')}
        subtitle={t('pages.buy.subtitle')}
      />
      <FilterBar filters={filters} onFiltersChange={setFilters} total={properties.length} />
      <PropertyGrid properties={properties} loading={loading} onSelect={setSelectedProperty} />
      <AgencyStats />
      <SellSection />

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  )
}
