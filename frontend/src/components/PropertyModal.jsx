import { useEffect } from 'react'
import { X, MapPin, Maximize2, BedDouble, Bath, Phone, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { AGENCY } from '../config'

export default function PropertyModal({ property, onClose }) {
  const { lang, t } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!property) return null

  const title = property.title[lang] || property.title.fr || ''
  const description = property.description?.[lang] || property.description?.fr || ''
  const isRent = property.transactionType === 'rent'
  const pricePerSqm = property.area ? Math.round(property.price / property.area) : null

  const waMsg = encodeURIComponent(
    `Bonjour Mecalus, je suis intéressé(e) par le bien :\n*${title}* à ${property.city}.\nPouvez-vous me contacter ?`
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t('modal.close')}>
          <X size={18} />
        </button>

        {/* Image */}
        <div className="modal-image-wrap">
          {property.images?.[0] ? (
            <img
              src={property.images[0]}
              alt={title}
              className="modal-img"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.classList.add('no-img')
              }}
            />
          ) : (
            <div className="modal-img-placeholder" />
          )}
          <div className="modal-img-badges">
            <span className={`badge ${isRent ? 'badge-rent' : 'badge-sale'}`}>
              {t(`filters.${property.transactionType}`)}
            </span>
            <span className="badge badge-category">
              {t(`filters.${property.category}`)}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="modal-content">
          <div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-location">
              <MapPin size={14} />
              {property.city}
            </p>
          </div>

          <div className="modal-price-block">
            <div className="modal-price-main">
              <span className="modal-price">{property.price.toLocaleString()}</span>
              <span className="modal-price-currency"> {t('card.currency')}</span>
              {isRent && <span className="modal-price-period">{t('card.perMonth')}</span>}
            </div>
            {pricePerSqm && (
              <div className="modal-price-sqm">
                {pricePerSqm.toLocaleString()} {t('card.perSqm')}
              </div>
            )}
          </div>

          <div className="modal-features-grid">
            {property.area && (
              <div className="modal-feature">
                <Maximize2 size={20} color="var(--primary)" />
                <strong>{property.area} m²</strong>
                <label>{t('modal.area')}</label>
              </div>
            )}
            {property.rooms && (
              <div className="modal-feature">
                <BedDouble size={20} color="var(--primary)" />
                <strong>{property.rooms}</strong>
                <label>{t('modal.rooms')}</label>
              </div>
            )}
            {property.bathrooms && (
              <div className="modal-feature">
                <Bath size={20} color="var(--primary)" />
                <strong>{property.bathrooms}</strong>
                <label>{t('modal.bathrooms')}</label>
              </div>
            )}
          </div>

          {description && (
            <div className="modal-description">
              <h4>{t('modal.description')}</h4>
              <p>{description}</p>
            </div>
          )}

          <div className="modal-actions">
            <a href={`tel:${AGENCY.phone}`} className="modal-btn modal-btn-call">
              <Phone size={16} />
              {t('card.call')} — {AGENCY.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${AGENCY.whatsapp}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-wa"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
