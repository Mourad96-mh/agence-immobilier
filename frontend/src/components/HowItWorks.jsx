import { Search, CalendarCheck, FileCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const STEPS = {
  fr: [
    {
      icon: Search,
      number: '01',
      title: 'Recherchez',
      desc: 'Parcourez notre catalogue de biens à Marrakech et Casablanca, filtrez par type de bien et budget pour trouver les annonces qui correspondent à vos critères.',
    },
    {
      icon: CalendarCheck,
      number: '02',
      title: 'Visitez',
      desc: 'Contactez-nous par téléphone ou WhatsApp pour organiser une visite. Notre équipe vous accompagne et répond à toutes vos questions.',
    },
    {
      icon: FileCheck,
      number: '03',
      title: 'Finalisez',
      desc: 'Nous vous guidons dans toutes les démarches administratives jusqu\'à la signature. Un accompagnement complet de A à Z.',
    },
  ],
  ar: [
    {
      icon: Search,
      number: '01',
      title: 'ابحث',
      desc: 'تصفح كتالوجنا من العقارات في مراكش والدار البيضاء، وقم بالتصفية حسب نوع العقار والميزانية للعثور على الإعلانات المناسبة لمعاييرك.',
    },
    {
      icon: CalendarCheck,
      number: '02',
      title: 'قم بالزيارة',
      desc: 'تواصل معنا عبر الهاتف أو واتساب لترتيب زيارة. فريقنا يرافقك ويجيب على جميع أسئلتك.',
    },
    {
      icon: FileCheck,
      number: '03',
      title: 'أتمم الصفقة',
      desc: 'نرشدك خلال جميع الإجراءات الإدارية حتى التوقيع. مرافقة كاملة من الألف إلى الياء.',
    },
  ],
  en: [
    {
      icon: Search,
      number: '01',
      title: 'Search',
      desc: 'Browse our catalogue of properties in Marrakech and Casablanca, filter by property type and budget to find listings that match your criteria.',
    },
    {
      icon: CalendarCheck,
      number: '02',
      title: 'Visit',
      desc: 'Contact us by phone or WhatsApp to arrange a viewing. Our team accompanies you and answers all your questions.',
    },
    {
      icon: FileCheck,
      number: '03',
      title: 'Finalize',
      desc: 'We guide you through all the administrative steps up to signing. Complete support from start to finish.',
    },
  ],
}

export default function HowItWorks() {
  const { lang, t } = useLanguage()
  const steps = STEPS[lang] || STEPS.fr

  return (
    <section className="hiw-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('hiw.title')}</h2>
          <p className="section-subtitle">{t('hiw.subtitle')}</p>
        </div>

        <div className="hiw-grid">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div className="hiw-card" key={i}>
                <div className="hiw-number">{step.number}</div>
                <div className="hiw-icon-wrap">
                  <Icon size={28} />
                </div>
                <h3 className="hiw-title">{step.title}</h3>
                <p className="hiw-desc">{step.desc}</p>
                {i < steps.length - 1 && <div className="hiw-arrow" />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
