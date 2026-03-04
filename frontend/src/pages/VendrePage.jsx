import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, CheckCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import ContactSection from '../components/ContactSection'
import { useLanguage } from '../context/LanguageContext'
import { useToast } from '../context/ToastContext'
import { AGENCY } from '../config'

const EMPTY_FORM = { type: '', city: '', area: '', name: '', phone: '', email: '', notes: '' }

export default function VendrePage() {
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
      `Bonjour Mecalus 👋\n\nJe souhaite *vendre mon bien* :\n\n🏠 Type : ${form.type}\n📍 Ville : ${form.city}\n📐 Surface : ${form.area} m²\n📝 ${form.notes}\n\n👤 ${form.name}\n📞 ${form.phone}\n✉️ ${form.email}`
    )
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${msg}`, '_blank')
    setForm(EMPTY_FORM)
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'vendre',
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
        title={t('pages.sell.title')}
        subtitle={t('pages.sell.subtitle')}
        badge={t('pages.sell.badge')}
      />

      <section className="estimate-section">
        <div className="container">
          <div className="estimate-grid">

            <div className="estimate-left">
              <span className="estimate-badge">{t('pages.sell.badge')}</span>
              <h2>{t('pages.sell.formTitle')}</h2>
              <p className="estimate-desc">{t('pages.sell.formDesc')}</p>
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
                    <input
                      className="form-input"
                      type="text"
                      value={form.city}
                      onChange={(e) => set('city', e.target.value)}
                      required
                    />
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
                  {t('ownerForm.submitSell')}
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
