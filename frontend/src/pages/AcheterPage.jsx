import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import FilterBar from '../components/FilterBar'
import PropertyGrid from '../components/PropertyGrid'
import PropertyModal from '../components/PropertyModal'
import AgencyStats from '../components/AgencyStats'
import SellSection from '../components/SellSection'
import { useProperties } from '../hooks/useProperties'
import { useLanguage } from '../context/LanguageContext'

export default function AcheterPage() {
  useSEO({
    title: 'Acheter un bien immobilier à Marrakech & Casablanca | Mecalus',
    description: "Parcourez nos annonces de vente : appartements, villas, maisons, fermes, terrains et bureaux à Marrakech et Casablanca. Trouvez votre bien idéal avec Mecalus.",
    canonical: 'https://www.mecalus.org/acheter',
  })
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProperty, setSelectedProperty] = useState(null)

  const initialFilters = {
    category: searchParams.get('category') || '',
    transactionType: 'sale',
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
        title={t('pages.buy.title')}
        subtitle={t('pages.buy.subtitle')}
      />
      <FilterBar filters={filters} onFiltersChange={handleFiltersChange} total={properties.length} />
      <PropertyGrid properties={properties} loading={loading} onSelect={setSelectedProperty} />
      <AgencyStats />
      <SellSection />

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  )
}
