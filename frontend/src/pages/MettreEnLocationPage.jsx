import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, CheckCircle } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import ContactSection from '../components/ContactSection'
import { useLanguage } from '../context/LanguageContext'
import { useToast } from '../context/ToastContext'
import { AGENCY } from '../config'

const EMPTY_FORM = { type: '', city: '', area: '', name: '', phone: '', email: '', notes: '' }

export default function MettreEnLocationPage() {
  useSEO({
    title: 'Mettre en location votre bien immobilier | Gestion locative Marrakech & Casablanca | Mecalus',
    description: "Confiez la gestion locative de votre bien à Mecalus. Mise en location rapide et suivi professionnel à Marrakech et Casablanca. Réponse sous 24h.",
    canonical: 'https://www.mecalus.org/mettre-en-location',
  })
  const { t } = useLanguage()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY_FORM)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const PROPERTY_TYPES = [
    { value: 'appartement', label: t('filters.apartment') },
    { value: 'villa',       label: t('filters.villa') },
    { value: 'terrain',     label: t('filters.land') },
    { value: 'bureau',      label: t('filters.office') },
    { value: 'commercial',  label: t('filters.commercial') },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Bonjour Mecalus 👋\n\nJe souhaite *mettre mon bien en location* :\n\n🏠 Type : ${form.type}\n📍 Ville : ${form.city}\n📐 Surface : ${form.area} m²\n📝 ${form.notes}\n\n👤 ${form.name}\n📞 ${form.phone}\n✉️ ${form.email}`
    )
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${msg}`, '_blank')
    setForm(EMPTY_FORM)
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'location',
        name: form.name,
        phone: form.phone,
        email: form.email,
        propertyType: form.type,
        city: form.city,
        area: form.area,
        message: form.notes,
      }),
    }).catch(() => {})
    showToast(t('ownerForm.toast'))
    navigate('/')
  }

  return (
    <>
      <PageHero
        title={t('pages.listForRent.title')}
        subtitle={t('pages.listForRent.subtitle')}
        badge={t('pages.listForRent.badge')}
      />

      <section className="estimate-section">
        <div className="container">
          <div className="estimate-grid">

            <div className="estimate-left">
              <span className="estimate-badge">{t('pages.listForRent.badge')}</span>
              <h2>{t('pages.listForRent.formTitle')}</h2>
              <p className="estimate-desc">{t('pages.listForRent.formDesc')}</p>
              <ul className="estimate-trust">
                {[t('ownerForm.trust1'), t('ownerForm.trust2'), t('ownerForm.trust3')].map((item, i) => (
                  <li key={i} className="estimate-trust-item">
                    <CheckCircle size={16} color="var(--accent)" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="estimate-right">
              <form className="estimate-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <label className="filter-label">{t('ownerForm.type')}</label>
                    <select
                      className="form-input"
                      value={form.type}
                      onChange={(e) => set('type', e.target.value)}
                      required
                    >
                      <option value="">—</option>
                      {PROPERTY_TYPES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="filter-label">{t('ownerForm.city')}</label>
                    <select
                      className="form-input"
                      value={form.city}
                      onChange={(e) => set('city', e.target.value)}
                      required
                    >
                      <option value="">— Choisir —</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Casablanca">Casablanca</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="filter-label">{t('ownerForm.area')}</label>
                  <input
                    className="form-input"
                    type="number"
                    value={form.area}
                    onChange={(e) => set('area', e.target.value)}
                    placeholder="m²"
                    min="1"
                  />
                </div>

                <input
                  className="form-input"
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder={t('ownerForm.name')}
                  required
                />
                <input
                  className="form-input"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder={t('ownerForm.phone')}
                  required
                />
                <input
                  className="form-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder={t('ownerForm.email')}
                />
                <textarea
                  className="form-input"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder={t('ownerForm.notes')}
                  style={{ resize: 'vertical' }}
                />

                <button type="submit" className="btn-estimate-submit">
                  <MessageCircle size={18} />
                  {t('ownerForm.submitRent')}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
