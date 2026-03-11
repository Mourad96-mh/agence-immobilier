import { useState } from 'react'
import { MapPin, Maximize2, BedDouble, Bath, Phone, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { AGENCY } from '../config'
import { trackPropertyLead } from '../utils/trackLead'

export default function PropertyCard({ property, onSelect }) {
  const { lang, t } = useLanguage()

  const title = property.title[lang] || property.title.fr || property.title.en || ''
  const isRent = property.transactionType === 'rent'
  const price = property.price.toLocaleString()
  const pricePerSqm =
    property.area && property.area > 0
      ? Math.round(property.price / property.area).toLocaleString()
      : null

  const waMsg = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le bien : *${title}* à ${property.city}${property.propertyCode ? ' (Réf: ' + property.propertyCode + ')' : ''}. Pouvez-vous me donner plus d'informations ?`
  )

  const images = property.images?.filter(Boolean) || []
  const hasMany = images.length > 1
  const [imgIdx, setImgIdx] = useState(0)

  const prevImg = (e) => {
    e.stopPropagation()
    setImgIdx((i) => (i - 1 + images.length) % images.length)
  }
  const nextImg = (e) => {
    e.stopPropagation()
    setImgIdx((i) => (i + 1) % images.length)
  }

  // Favorites — stored in localStorage
  const [isFav, setIsFav] = useState(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('immobilier-favorites') || '[]')
      return favs.includes(property._id)
    } catch {
      return false
    }
  })

  const toggleFav = (e) => {
    e.stopPropagation()
    try {
      const favs = JSON.parse(localStorage.getItem('immobilier-favorites') || '[]')
      const newFavs = isFav
        ? favs.filter((id) => id !== property._id)
        : [...favs, property._id]
      localStorage.setItem('immobilier-favorites', JSON.stringify(newFavs))
      setIsFav(!isFav)
    } catch {
      setIsFav(!isFav)
    }
  }

  const handleImgError = (e) => {
    e.target.style.display = 'none'
    e.target.parentNode.classList.add('no-img')
  }

  return (
    <article className="property-card" onClick={() => onSelect(property)} role="button" tabIndex={0}>
      <div className="card-image-wrap">
        {images[imgIdx] && (
          <img
            src={images[imgIdx]}
            alt={title}
            className="card-img"
            loading="lazy"
            onError={handleImgError}
          />
        )}

        {hasMany && (
          <>
            <button className="card-carousel-btn card-carousel-prev" onClick={prevImg} aria-label="Image précédente">
              <ChevronLeft size={16} />
            </button>
            <button className="card-carousel-btn card-carousel-next" onClick={nextImg} aria-label="Image suivante">
              <ChevronRight size={16} />
            </button>
            <div className="card-carousel-dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`card-carousel-dot${i === imgIdx ? ' active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i) }}
                />
              ))}
            </div>
          </>
        )}

        <div className="card-badges">
          <span className={`badge ${isRent ? 'badge-rent' : 'badge-sale'}`}>
            {t(`filters.${property.transactionType}`)}
          </span>
          <span className="badge badge-category">
            {t(`filters.${property.category}`)}
          </span>
        </div>
        <button
          className={`fav-btn${isFav ? ' fav-active' : ''}`}
          onClick={toggleFav}
          aria-label="Favori"
          title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart size={15} fill={isFav ? 'white' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>

        <p className="card-location">
          <MapPin size={13} />
          {property.city}{property.quartier ? `, ${property.quartier}` : ''}
          {property.propertyCode && <span className="card-code-badge">{property.propertyCode}</span>}
        </p>

        <div className="card-features">
          {property.area && (
            <span className="card-feature">
              <Maximize2 size={13} />
              {property.area} {t('card.area')}
            </span>
          )}
          {property.rooms && (
            <span className="card-feature">
              <BedDouble size={13} />
              {property.rooms} {t('card.rooms')}
            </span>
          )}
          {property.bathrooms && (
            <span className="card-feature">
              <Bath size={13} />
              {property.bathrooms}
            </span>
          )}
        </div>

        <div className="card-footer">
          <div className="card-price-wrap">
            <div className="card-price">
              {price}
              <span className="card-price-currency"> {t('card.currency')}</span>
              {isRent && <span className="card-price-period">{t('card.perMonth')}</span>}
            </div>
            {pricePerSqm && (
              <div className="card-price-sqm">
                {pricePerSqm} {t('card.perSqm')}
              </div>
            )}
          </div>

          <div className="card-actions">
            <a
              href={`tel:${AGENCY.phone}`}
              className="btn-call"
              onClick={(e) => { e.stopPropagation(); trackPropertyLead(property, 'phone') }}
              title="Appeler"
            >
              <Phone size={14} />
              {t('card.call')}
            </a>
            <a
              href={`https://wa.me/${AGENCY.whatsapp}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-card"
              onClick={(e) => { e.stopPropagation(); trackPropertyLead(property, 'whatsapp') }}
              title="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
