import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useToast } from '../context/ToastContext'
import { AGENCY } from '../config'

const EMPTY_FORM = { name: '', phone: '', email: '', subject: '', message: '' }

export default function ContactSection() {
  const { t } = useLanguage()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY_FORM)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Bonjour Mecalus,\n\nJe suis *${form.name}*.\n*Sujet:* ${form.subject}\n\n${form.message}\n\n📞 ${form.phone}\n✉️ ${form.email}`
    )
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${msg}`, '_blank')
    setForm(EMPTY_FORM)
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'contact',
        name: form.name,
        phone: form.phone,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }),
    }).catch(() => {})
    showToast(t('contact.toast'))
    navigate('/')
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                placeholder={t('contact.name')}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
              />
              <input
                className="form-input"
                type="tel"
                placeholder={t('contact.phone')}
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <input
                className="form-input"
                type="email"
                placeholder={t('contact.email')}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
              <input
                className="form-input"
                type="text"
                placeholder={t('contact.subject')}
                value={form.subject}
                onChange={(e) => set('subject', e.target.value)}
                required
              />
            </div>
            <textarea
              className="form-textarea"
              placeholder={t('contact.message')}
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              required
            />
            <button type="submit" className="btn-whatsapp-submit">
              <MessageCircle size={20} />
              {t('contact.send')}
            </button>
          </form>

          {/* Contact info */}
          <div className="contact-info">
            <h3 className="contact-info-title">{t('contact.infoTitle')}</h3>

            <div className="contact-info-list">
              <a href={`tel:${AGENCY.phone}`} className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="contact-info-label">{t('contact.phoneLabel')}</div>
                  <div className="contact-info-value">{AGENCY.phoneDisplay}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${AGENCY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-item"
              >
                <div className="contact-info-icon whatsapp-icon">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="contact-info-label">WhatsApp</div>
                  <div className="contact-info-value">{AGENCY.whatsappDisplay}</div>
                </div>
              </a>

              <a href={`mailto:${AGENCY.email}`} className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">{AGENCY.email}</div>
                </div>
              </a>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="contact-info-label">{t('contact.addressLabel')}</div>
                  <div className="contact-info-value">{AGENCY.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
