import { useState } from 'react'
import Hero from '../components/Hero'
import FilterBar from '../components/FilterBar'
import PropertyGrid from '../components/PropertyGrid'
import PropertyModal from '../components/PropertyModal'
import AgencyStats from '../components/AgencyStats'
import SellSection from '../components/SellSection'
import HowItWorks from '../components/HowItWorks'
import AlertSection from '../components/AlertSection'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'
import { useProperties } from '../hooks/useProperties'

const INITIAL_FILTERS = {
  category: '', transactionType: '', city: '',
  minPrice: '', maxPrice: '', search: '', minRooms: '',
}

export default function HomePage() {
  const { properties, loading, filters, setFilters } = useProperties(INITIAL_FILTERS)
  const [selectedProperty, setSelectedProperty] = useState(null)

  return (
    <>
      <Hero />
      <FilterBar filters={filters} onFiltersChange={setFilters} total={properties.length} />
      <PropertyGrid properties={properties} loading={loading} onSelect={setSelectedProperty} />
      <AgencyStats />
      <SellSection />
      <HowItWorks />
      <AlertSection />
      <WhyUs />
      <Testimonials />
      <ContactSection />

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  )
}
