import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import FilterBar from '../components/FilterBar'
import PropertyGrid from '../components/PropertyGrid'
import PropertyModal from '../components/PropertyModal'
import AlertSection from '../components/AlertSection'
import { useProperties } from '../hooks/useProperties'
import { useLanguage } from '../context/LanguageContext'

export default function LouerPage() {
  useSEO({
    title: 'Location immobilière à Marrakech & Casablanca | Mecalus',
    description: "Trouvez votre location idéale à Marrakech ou Casablanca. Appartements, villas, maisons et bureaux à louer. Mecalus, votre agence immobilière de confiance au Maroc.",
    canonical: 'https://www.mecalus.org/louer',
  })
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProperty, setSelectedProperty] = useState(null)

  const initialFilters = {
    category: searchParams.get('category') || '',
    transactionType: 'rent',
    city: searchParams.get('city') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    minRooms: searchParams.get('minRooms') || '',
  }

  const { properties, loading, filters, setFilters } = useProperties(initialFilters)

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    const params = {}
    if (newFilters.category) params.category = newFilters.category
    if (newFilters.city) params.city = newFilters.city
    if (newFilters.minPrice) params.minPrice = newFilters.minPrice
    if (newFilters.maxPrice) params.maxPrice = newFilters.maxPrice
    if (newFilters.minRooms) params.minRooms = newFilters.minRooms
    if (newFilters.search) params.search = newFilters.search
    setSearchParams(params, { replace: true })
  }

  return (
    <>
      <PageHero
        title={t('pages.rent.title')}
        subtitle={t('pages.rent.subtitle')}
      />
      <FilterBar filters={filters} onFiltersChange={handleFiltersChange} total={properties.length} />
      <PropertyGrid properties={properties} loading={loading} onSelect={setSelectedProperty} />
      <AlertSection />

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  )
}
