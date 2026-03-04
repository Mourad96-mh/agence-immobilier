import { ShieldCheck, MapPin, Eye, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const DATA = {
  fr: [
    {
      Icon: ShieldCheck,
      title: 'Qualité & Fiabilité',
      desc: 'Suivi rigoureux de chaque dossier avec des professionnels expérimentés et des contrôles de qualité réguliers.',
    },
    {
      Icon: MapPin,
      title: 'Expertise Locale',
      desc: 'Connaissance approfondie des quartiers, des prix et des tendances du marché immobilier marocain.',
    },
    {
      Icon: Eye,
      title: 'Transparence Totale',
      desc: 'Prix nets et clairs, sans frais cachés. Un accompagnement honnête de la première visite à la signature.',
    },
    {
      Icon: Zap,
      title: 'Délais Optimisés',
      desc: 'Processus fluide et efficace pour estimer, diffuser et conclure votre transaction rapidement.',
    },
  ],
  ar: [
    {
      Icon: ShieldCheck,
      title: 'جودة وموثوقية',
      desc: 'متابعة دقيقة لكل ملف مع متخصصين ذوي خبرة ومراقبة جودة منتظمة.',
    },
    {
      Icon: MapPin,
      title: 'خبرة محلية',
      desc: 'معرفة عميقة بالأحياء والأسعار واتجاهات سوق العقارات المغربي.',
    },
    {
      Icon: Eye,
      title: 'شفافية كاملة',
      desc: 'أسعار صافية وواضحة بدون رسوم خفية. مرافقة صادقة من الزيارة الأولى حتى التوقيع.',
    },
    {
      Icon: Zap,
      title: 'مواعيد محسّنة',
      desc: 'عملية سلسة وفعالة لتقييم وتسويق وإتمام صفقتك في أقصر وقت ممكن.',
    },
  ],
  en: [
    {
      Icon: ShieldCheck,
      title: 'Quality & Reliability',
      desc: 'Rigorous file management with experienced professionals and regular quality controls.',
    },
    {
      Icon: MapPin,
      title: 'Local Expertise',
      desc: 'Deep knowledge of neighborhoods, prices and trends in the Moroccan real estate market.',
    },
    {
      Icon: Eye,
      title: 'Full Transparency',
      desc: 'Clear net prices, no hidden fees. Honest guidance from first viewing to final signature.',
    },
    {
      Icon: Zap,
      title: 'Optimized Timelines',
      desc: 'Smooth and efficient process to estimate, market and close your transaction quickly.',
    },
  ],
}

export default function WhyUs() {
  const { lang, t } = useLanguage()
  const items = DATA[lang] || DATA.fr

  return (
    <section className="whyus-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('whyUs.title')}</h2>
          <p className="section-subtitle">{t('whyUs.subtitle')}</p>
        </div>
        <div className="whyus-grid">
          {items.map(({ Icon, title, desc }, i) => (
            <div className="whyus-card" key={i}>
              <div className="whyus-icon">
                <Icon size={24} color="white" />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
