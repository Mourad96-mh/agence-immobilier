import { useState } from 'react'
import { TrendingUp, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { AGENCY } from '../config'
import { trackLead } from '../utils/trackLead'

const CATEGORIES = ['apartment', 'villa', 'office', 'land', 'commercial']
const CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
  'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Salé',
]

export default function EstimateSection() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    type: '', city: '', area: '', rooms: '', condition: '', name: '', phone: '', email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Bonjour Mecalus 👋\n\nJe souhaite une *estimation gratuite* pour :\n\n🏠 Type : ${form.type}\n📍 Ville : ${form.city}\n📐 Surface : ${form.area} m²\n🛏 Pièces : ${form.rooms || '—'}\n✨ État : ${form.condition}\n\n👤 ${form.name}\n📞 ${form.phone}\n✉️ ${form.email}`
    )
    trackLead({ source: 'estimate-form', category: form.type, city: form.city }, 'form')
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${msg}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    // Save to DB (fire and forget)
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'estimation',
        name: form.name,
        phone: form.phone,
        email: form.email,
        propertyType: form.type,
        city: form.city,
        area: form.area ? Number(form.area) : null,
        rooms: form.rooms ? Number(form.rooms) : null,
        condition: form.condition,
      }),
    }).catch(() => {})
  }

  const trustItems = [
    t('estimate.trust1'),
    t('estimate.trust2'),
    t('estimate.trust3'),
  ]

  return (
    <section className="estimate-section" id="estimer">
      <div className="container">
        <div className="estimate-grid">
          {/* Left */}
          <div className="estimate-left">
            <span className="estimate-badge">
              <TrendingUp size={14} />
              {t('estimate.badge')}
            </span>
            <h2 className="section-title" style={{ textAlign: 'start', marginBottom: 14 }}>
              {t('estimate.title')}
            </h2>
            <p className="estimate-desc">{t('estimate.description')}</p>
            <ul className="estimate-trust">
              {trustItems.map((item, i) => (
                <li key={i} className="estimate-trust-item">
                  <CheckCircle size={16} color="var(--primary-light)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="estimate-right">
            <form className="estimate-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label className="filter-label">{t('estimate.type')}</label>
                  <select className="form-input" value={form.type} onChange={(e) => set('type', e.target.value)} required>
                    <option value="">—</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{t(`filters.${c}`)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="filter-label">{t('estimate.city')}</label>
                  <select className="form-input" value={form.city} onChange={(e) => set('city', e.target.value)} required>
                    <option value="">—</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label className="filter-label">{t('estimate.area')}</label>
                  <input className="form-input" type="number" value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="ex. 120" required />
                </div>
                <div>
                  <label className="filter-label">{t('estimate.rooms')}</label>
                  <input className="form-input" type="number" value={form.rooms} onChange={(e) => set('rooms', e.target.value)} placeholder="ex. 3" />
                </div>
              </div>

              <div>
                <label className="filter-label">{t('estimate.condition')}</label>
                <select className="form-input" value={form.condition} onChange={(e) => set('condition', e.target.value)} required>
                  <option value="">—</option>
                  <option value="good">{t('estimate.condGood')}</option>
                  <option value="very-good">{t('estimate.condVeryGood')}</option>
                  <option value="excellent">{t('estimate.condExcellent')}</option>
                </select>
              </div>

              <div className="form-row">
                <input className="form-input" type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder={t('estimate.name')} required />
                <input className="form-input" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder={t('estimate.phone')} required />
              </div>

              <input className="form-input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder={t('estimate.email')} />

              <button type="submit" className="btn-estimate-submit">
                {submitted ? t('estimate.submitted') : t('estimate.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
