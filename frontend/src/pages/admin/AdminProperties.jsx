import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AdminNav from '../../components/AdminNav'
import PropertyFormModal from './PropertyFormModal'

const CATEGORY_LABELS = {
  apartment: 'Appartement',
  villa: 'Villa',
  maison: 'Maison',
  office: 'Bureau',
  land: 'Terrain',
  riad: 'Riad',
  ferme: 'Ferme',
  commercial: 'Commercial',
}

const TRANSACTION_LABELS = { sale: 'Vente', rent: 'Location' }

export default function AdminProperties() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ category: '', transactionType: '', isAvailable: '', codeSearch: '' })
  const [modal, setModal] = useState(null) // null | 'add' | property object (edit)

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/properties?showAll=true', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { logout(); navigate('/admin/login'); return }
      setProperties(await res.json())
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [token, logout, navigate])

  useEffect(() => { fetchProperties() }, [fetchProperties])

  const toggleAvailability = async (prop) => {
    const res = await fetch(`/api/properties/${prop._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isAvailable: !prop.isAvailable }),
    })
    if (!res.ok) return
    const updated = await res.json()
    setProperties((prev) => prev.map((p) => (p._id === updated._id ? updated : p)))
  }

  const deleteProperty = async (id) => {
    if (!confirm('Supprimer cette propriété définitivement ?')) return
    const res = await fetch(`/api/properties/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return
    setProperties((prev) => prev.filter((p) => p._id !== id))
  }

  const handleSaved = (saved, isEdit) => {
    if (isEdit) {
      setProperties((prev) => prev.map((p) => (p._id === saved._id ? saved : p)))
    } else {
      setProperties((prev) => [saved, ...prev])
    }
    setModal(null)
  }

  const filtered = properties.filter((p) => {
    if (filters.category && p.category !== filters.category) return false
    if (filters.transactionType && p.transactionType !== filters.transactionType) return false
    if (filters.isAvailable === 'true' && !p.isAvailable) return false
    if (filters.isAvailable === 'false' && p.isAvailable) return false
    if (filters.codeSearch && !p.propertyCode?.toLowerCase().includes(filters.codeSearch.toLowerCase())) return false
    return true
  })

  const total = properties.length
  const available = properties.filter((p) => p.isAvailable).length
  const unavailable = total - available

  return (
    <div className="admin-page">
      <AdminNav />

      {/* Stats */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-number">{total}</span>
          <span className="admin-stat-label">Total</span>
        </div>
        <div className="admin-stat-card closed">
          <span className="admin-stat-number">{available}</span>
          <span className="admin-stat-label">Disponibles</span>
        </div>
        <div className="admin-stat-card new">
          <span className="admin-stat-number">{unavailable}</span>
          <span className="admin-stat-label">Vendus / Loués</span>
        </div>
      </div>

      {/* Filters + Add button */}
      <div className="admin-filters">
        <select
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          className="admin-select"
        >
          <option value="">Toutes catégories</option>
          {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <select
          value={filters.transactionType}
          onChange={(e) => setFilters((f) => ({ ...f, transactionType: e.target.value }))}
          className="admin-select"
        >
          <option value="">Vente & Location</option>
          <option value="sale">Vente</option>
          <option value="rent">Location</option>
        </select>
        <select
          value={filters.isAvailable}
          onChange={(e) => setFilters((f) => ({ ...f, isAvailable: e.target.value }))}
          className="admin-select"
        >
          <option value="">Tous les statuts</option>
          <option value="true">Disponible</option>
          <option value="false">Vendu / Loué</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher par code (ex: CA01)"
          value={filters.codeSearch}
          onChange={(e) => setFilters((f) => ({ ...f, codeSearch: e.target.value }))}
          className="admin-code-search"
        />
        <button className="admin-icon-btn" onClick={fetchProperties} title="Actualiser">
          <RefreshCw size={15} />
        </button>
        <button className="admin-add-btn" onClick={() => setModal('add')}>
          <Plus size={16} /> Ajouter une propriété
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">Aucune propriété trouvée.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Photo</th>
                <th>Titre</th>
                <th>Ville / Quartier</th>
                <th>Prix</th>
                <th>Type</th>
                <th>Catégorie</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((prop) => (
                <tr key={prop._id}>
                  <td>
                    {prop.propertyCode ? (
                      <span className="prop-code-cell">{prop.propertyCode}</span>
                    ) : (
                      <span className="prop-code-empty">—</span>
                    )}
                  </td>
                  <td>
                    {prop.images?.[0] ? (
                      <img
                        src={prop.images[0]}
                        alt=""
                        className="prop-thumb"
                      />
                    ) : (
                      <div className="prop-thumb-empty">—</div>
                    )}
                  </td>
                  <td className="admin-td-name">{prop.title?.fr || '—'}</td>
                  <td>
                    {prop.city}
                    {prop.quartier && <div className="prop-quartier-cell">{prop.quartier}</div>}
                  </td>
                  <td className="prop-price">
                    {prop.price?.toLocaleString('fr-MA')} MAD
                  </td>
                  <td>
                    <span className={`prop-type-badge ${prop.transactionType}`}>
                      {TRANSACTION_LABELS[prop.transactionType]}
                    </span>
                  </td>
                  <td>{CATEGORY_LABELS[prop.category] || prop.category}</td>
                  <td>
                    <span className={`prop-status-badge ${prop.isAvailable ? 'available' : 'sold'}`}>
                      {prop.isAvailable ? 'Disponible' : 'Vendu/Loué'}
                    </span>
                  </td>
                  <td>
                    <div className="prop-actions">
                      <button
                        className="admin-icon-btn"
                        title={prop.isAvailable ? 'Marquer vendu/loué' : 'Marquer disponible'}
                        onClick={() => toggleAvailability(prop)}
                      >
                        {prop.isAvailable ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        className="admin-icon-btn"
                        title="Modifier"
                        onClick={() => setModal(prop)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="admin-delete-btn"
                        title="Supprimer"
                        onClick={() => deleteProperty(prop._id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <PropertyFormModal
          property={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}
