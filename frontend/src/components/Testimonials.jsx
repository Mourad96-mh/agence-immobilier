import { Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const DATA = {
  fr: [
    {
      name: 'Samir L.',
      role: 'Acheteur — Casablanca',
      initials: 'SL',
      text: "Service exceptionnel ! L'équipe m'a accompagné avec professionnalisme tout au long de mon achat. Je recommande vivement Mecalus à tous mes proches.",
    },
    {
      name: 'Morad N.',
      role: 'Vendeur — Rabat',
      initials: 'MN',
      text: "Excellente communication et transparence totale. Mon appartement a été vendu en moins de 3 semaines. Très satisfait du résultat et du suivi !",
    },
    {
      name: 'Dounia K.',
      role: 'Locataire — Marrakech',
      initials: 'DK',
      text: "Une expérience sans stress grâce à l'équipe Mecalus. Ils ont trouvé le logement parfait pour moi en un temps record. Merci !",
    },
  ],
  ar: [
    {
      name: 'سمير ل.',
      role: 'مشتري — الدار البيضاء',
      initials: 'س',
      text: 'خدمة استثنائية! رافقني الفريق باحترافية طوال عملية الشراء. أوصي بـ ميكالوس لجميع أصدقائي وعائلتي.',
    },
    {
      name: 'مراد ن.',
      role: 'بائع — الرباط',
      initials: 'م',
      text: 'تواصل ممتاز وشفافية كاملة. تم بيع شقتي في أقل من 3 أسابيع. راضٍ جداً عن النتيجة والمتابعة!',
    },
    {
      name: 'دنيا ك.',
      role: 'مستأجرة — مراكش',
      initials: 'د',
      text: 'تجربة بدون توتر بفضل فريق ميكالوس. وجدوا لي المسكن المثالي في وقت قياسي. شكراً جزيلاً!',
    },
  ],
  en: [
    {
      name: 'Samir L.',
      role: 'Buyer — Casablanca',
      initials: 'SL',
      text: 'Exceptional service! The team supported me professionally throughout my entire purchase. I highly recommend Mecalus to everyone.',
    },
    {
      name: 'Morad N.',
      role: 'Seller — Rabat',
      initials: 'MN',
      text: 'Excellent communication and full transparency. My apartment was sold in less than 3 weeks. Very satisfied with the result and follow-up!',
    },
    {
      name: 'Dounia K.',
      role: 'Tenant — Marrakech',
      initials: 'DK',
      text: 'A stress-free experience thanks to the Mecalus team. They found the perfect property for me in record time. Thank you!',
    },
  ],
}

export default function Testimonials() {
  const { lang, t } = useLanguage()
  const items = DATA[lang] || DATA.fr

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        </div>
        <div className="testimonials-grid">
          {items.map((item, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.initials}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
