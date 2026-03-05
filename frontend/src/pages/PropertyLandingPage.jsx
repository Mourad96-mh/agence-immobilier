import { useState } from 'react'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import FilterBar from '../components/FilterBar'
import PropertyGrid from '../components/PropertyGrid'
import PropertyModal from '../components/PropertyModal'
import AgencyStats from '../components/AgencyStats'
import SellSection from '../components/SellSection'
import { useProperties } from '../hooks/useProperties'

/**
 * Generic keyword-targeted landing page.
 * Used for city + category SEO pages (e.g. /acheter-appartement-casablanca).
 */
export default function PropertyLandingPage({ seo, defaultFilters, hero, intro, faq }) {
  useSEO(seo)
  const { properties, loading, filters, setFilters } = useProperties(defaultFilters)
  const [selectedProperty, setSelectedProperty] = useState(null)

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} />

      {/* Keyword-rich intro paragraph — visible to users and indexed by Google */}
      {intro && (
        <section className="landing-intro">
          <div className="container">
            <p className="landing-intro-text">{intro}</p>
          </div>
        </section>
      )}

      <FilterBar filters={filters} onFiltersChange={setFilters} total={properties.length} />
      <PropertyGrid properties={properties} loading={loading} onSelect={setSelectedProperty} />
      <AgencyStats />
      <SellSection />

      {/* FAQ Section — triggers Google FAQ rich snippets */}
      {faq && faq.length > 0 && (
        <section className="faq-section">
          <div className="container">
            <h2 className="faq-title">Questions fréquentes</h2>
            <div className="faq-list">
              {faq.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-question">{item.q}</summary>
                  <p className="faq-answer">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* FAQ JSON-LD for Google rich snippets */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faq.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              }),
            }}
          />
        </section>
      )}

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  )
}
