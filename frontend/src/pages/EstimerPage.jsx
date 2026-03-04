import PageHero from '../components/PageHero'
import EstimateSection from '../components/EstimateSection'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import { useLanguage } from '../context/LanguageContext'

export default function EstimerPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero
        title={t('pages.estimate.title')}
        subtitle={t('pages.estimate.subtitle')}
        badge={t('pages.estimate.badge')}
      />
      <EstimateSection />
      <WhyUs />
      <Testimonials />
    </>
  )
}
