import { useState, useEffect } from 'react'
import { X, Upload, Trash2, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const EMPTY_FORM = {
  title: { fr: '', ar: '', en: '' },
  description: { fr: '', ar: '', en: '' },
  category: 'apartment',
  transactionType: 'sale',
  city: '',
  price: '',
  area: '',
  rooms: '',
  bathrooms: '',
  quartier: '',
  address: '',
  featured: false,
  isAvailable: true,
  images: [],
}

const CATEGORIES = [
  { value: 'apartment', label: 'Appartement' },
  { value: 'villa', label: 'Villa' },
  { value: 'maison', label: 'Maison' },
  { value: 'riad', label: 'Riad' },
  { value: 'ferme', label: 'Ferme' },
  { value: 'office', label: 'Plateau Bureau' },
  { value: 'land', label: 'Terrain' },
  { value: 'commercial', label: 'Commercial' },
]

const CITIES = ['Marrakech', 'Casablanca']

const QUARTIERS = {
  Casablanca: [
    'Maarif', 'Anfa', 'Ain Diab', 'CIL', 'Gauthier', 'Racine', 'Bourgogne',
    'Belvédère', 'Hay Hassani', 'Sidi Maarouf', 'Bd Zerktouni', 'Centre-ville',
    'Ain Chock', 'Hay Mohammadi', 'Salmia', 'Oasis', 'Californie', 'Val Fleurie',
  ],
  Marrakech: [
    'Guéliz', 'Hivernage', 'Médina', 'Palmeraie', "M'Hamid", 'Agdal',
    'Targa', 'Sidi Ghanem', 'Semlalia', 'Massira', 'Daoudiate', 'Hay Salam',
    "Route de Fès", "Route d'Ourika", 'Route de Casablanca',
  ],
}

const TRANSACTION_TYPES = [
  { value: 'sale', label: 'Vente' },
  { value: 'rent', label: 'Location' },
]

export default function PropertyFormModal({ property, onClose, onSaved }) {
  const { token } = useAuth()
  const isEdit = Boolean(property)

  const [form, setForm] = useState(EMPTY_FORM)
  const [uploadingIdx, setUploadingIdx] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (property) {
      setForm({
        title: { fr: property.title?.fr || '', ar: property.title?.ar || '', en: property.title?.en || '' },
        description: { fr: property.description?.fr || '', ar: property.description?.ar || '', en: property.description?.en || '' },
        category: property.category || 'apartment',
        transactionType: property.transactionType || 'sale',
        city: property.city || '',
        quartier: property.quartier || '',
        price: property.price ?? '',
        area: property.area ?? '',
        rooms: property.rooms ?? '',
        bathrooms: property.bathrooms ?? '',
        address: property.address || '',
        featured: property.featured || false,
        isAvailable: property.isAvailable !== false,
        images: property.images || [],
      })
    }
  }, [property])

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))
  const setNested = (group, key, value) =>
    setForm((f) => ({ ...f, [group]: { ...f[group], [key]: value } }))

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploadingIdx(form.images.length)
    const errors = []
    const uploaded = []
    for (const file of files) {
      try {
        const fd = new FormData()
        fd.append('image', file)
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Upload failed')
        uploaded.push(data.url)
      } catch (err) {
        errors.push(err.message)
      }
    }
    if (uploaded.length) setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }))
    if (errors.length) setError(`Erreur upload: ${errors.join(', ')}`)
    setUploadingIdx(null)
    e.target.value = ''
  }

  const removeImage = (idx) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title.fr.trim()) { setError('Le titre en français est requis.'); return }
    if (!form.city.trim()) { setError('La ville est requise.'); return }
    if (!form.price) { setError('Le prix est requis.'); return }

    setSaving(true)
    try {
      const body = {
        ...form,
        price: Number(form.price),
        area: form.area !== '' ? Number(form.area) : null,
        rooms: form.rooms !== '' ? Number(form.rooms) : null,
        bathrooms: form.bathrooms !== '' ? Number(form.bathrooms) : null,
      }
      const url = isEdit ? `/api/properties/${property._id}` : '/api/properties'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Erreur serveur')
      }
      const saved = await res.json()
      onSaved(saved, isEdit)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{isEdit ? 'Modifier la propriété' : 'Ajouter une propriété'}</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Titre */}
          <div className="modal-section-title">Titre</div>
          <div className="modal-field">
            <label>Titre (FR) <span className="required">*</span></label>
            <input
              type="text"
              value={form.title.fr}
              onChange={(e) => setNested('title', 'fr', e.target.value)}
              placeholder="ex: Appartement 3 pièces à Casablanca"
            />
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Titre (AR)</label>
              <input
                type="text"
                dir="rtl"
                value={form.title.ar}
                onChange={(e) => setNested('title', 'ar', e.target.value)}
              />
            </div>
            <div className="modal-field">
              <label>Titre (EN)</label>
              <input
                type="text"
                value={form.title.en}
                onChange={(e) => setNested('title', 'en', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="modal-section-title">Description</div>
          <div className="modal-field">
            <label>Description (FR)</label>
            <textarea
              rows={3}
              value={form.description.fr}
              onChange={(e) => setNested('description', 'fr', e.target.value)}
            />
          </div>

          {/* Infos principales */}
          <div className="modal-section-title">Informations</div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Catégorie <span className="required">*</span></label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Type de transaction <span className="required">*</span></label>
              <select value={form.transactionType} onChange={(e) => set('transactionType', e.target.value)}>
                {TRANSACTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Ville <span className="required">*</span></label>
              <select value={form.city} onChange={(e) => { set('city', e.target.value); set('quartier', '') }}>
                <option value="">— Choisir —</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Quartier</label>
              <input
                type="text"
                list="quartier-list"
                value={form.quartier}
                onChange={(e) => set('quartier', e.target.value)}
                disabled={!form.city}
                placeholder={form.city ? 'Choisir ou saisir…' : "Choisir une ville d'abord"}
              />
              <datalist id="quartier-list">
                {(QUARTIERS[form.city] || []).map((q) => <option key={q} value={q} />)}
              </datalist>
            </div>
          </div>
          <div className="modal-field">
            <label>Prix (MAD) <span className="required">*</span></label>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
            />
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Surface (m²)</label>
              <input
                type="number"
                min="0"
                value={form.area}
                onChange={(e) => set('area', e.target.value)}
              />
            </div>
            <div className="modal-field">
              <label>Pièces</label>
              <input
                type="number"
                min="0"
                value={form.rooms}
                onChange={(e) => set('rooms', e.target.value)}
              />
            </div>
            <div className="modal-field">
              <label>Salles de bain</label>
              <input
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={(e) => set('bathrooms', e.target.value)}
              />
            </div>
          </div>

          <div className="modal-field">
            <label>Adresse</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
            />
          </div>

          {/* Options */}
          <div className="modal-row modal-checkboxes">
            <label className="modal-checkbox-label">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
              />
              Mise en avant
            </label>
            <label className="modal-checkbox-label">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(e) => set('isAvailable', e.target.checked)}
              />
              Disponible (visible sur le site)
            </label>
          </div>

          {/* Images */}
          <div className="modal-section-title">Images</div>
          <div className="modal-images">
            {form.images.map((url, i) => (
              <div key={i} className="modal-img-thumb">
                <img src={url} alt={`img-${i}`} />
                <button
                  type="button"
                  className="modal-img-remove"
                  onClick={() => removeImage(i)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {uploadingIdx !== null && (
              <div className="modal-img-uploading">
                <Loader2 size={22} className="spin" />
              </div>
            )}
            <label className="modal-img-upload-btn">
              <Upload size={16} />
              <span>Ajouter</span>
              <input type="file" accept="image/*" multiple onChange={handleUpload} hidden />
            </label>
          </div>

          <div className="modal-footer">
            {error && <div className="modal-error modal-error-footer">{error}</div>}
            <button type="button" className="modal-btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="modal-btn-save" disabled={saving}>
              {saving ? <><Loader2 size={15} className="spin" /> Enregistrement...</> : (isEdit ? 'Enregistrer' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
