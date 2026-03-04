import { useState } from 'react'
import { Bell } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function AlertSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: send to backend or email service
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <section className="alert-section">
      <div className="container">
        <div className="alert-content">
          <div className="alert-icon-wrap">
            <Bell size={28} color="white" />
          </div>
          <h2 className="alert-title">{t('alert.title')}</h2>
          <p className="alert-subtitle">{t('alert.subtitle')}</p>

          <form className="alert-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('alert.placeholder')}
              className="alert-input"
              required
            />
            <button type="submit" className="alert-btn">
              {subscribed ? t('alert.subscribed') : t('alert.subscribe')}
            </button>
          </form>

          <p className="alert-privacy">{t('alert.privacy')}</p>
        </div>
      </div>
    </section>
  )
}
