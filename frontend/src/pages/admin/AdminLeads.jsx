import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Phone, Mail, MessageSquare, Home, Key } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AdminNav from '../../components/AdminNav'

const STATUS_LABELS = { new: 'Nouveau', contacted: 'Contacté', closed: 'Clôturé' }
const STATUS_COLORS = { new: '#e74c3c', contacted: '#f39c12', closed: '#27ae60' }

export default function AdminLeads() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ status: '', source: '' })

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.source) params.append('source', filters.source)
      const res = await fetch(`/api/leads?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { logout(); navigate('/admin/login'); return }
      setLeads(await res.json())
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [token, filters, logout, navigate])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const updateStatus = async (id, status) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)))
  }

  const deleteLead = async (id) => {
    if (!confirm('Supprimer ce lead ?')) return
    await fetch(`/api/leads/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setLeads((prev) => prev.filter((l) => l._id !== id))
  }

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    closed: leads.filter((l) => l.status === 'closed').length,
    contact: leads.filter((l) => l.source === 'contact').length,
    vendre: leads.filter((l) => l.source === 'vendre').length,
    location: leads.filter((l) => l.source === 'location').length,
  }

  return (
    <div className="admin-page">
      <AdminNav />

      {/* Refresh bar */}
      <div className="admin-filters" style={{ paddingTop: '20px' }}>
        <button className="admin-icon-btn" onClick={fetchLeads} title="Actualiser">
          <RefreshCw size={15} /> Actualiser
        </button>
      </div>

      {/* Stats — by status */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-number">{counts.total}</span>
          <span className="admin-stat-label">Total</span>
        </div>
        <div className="admin-stat-card new">
          <span className="admin-stat-number">{counts.new}</span>
          <span className="admin-stat-label">Nouveaux</span>
        </div>
        <div className="admin-stat-card contacted">
          <span className="admin-stat-number">{counts.contacted}</span>
          <span className="admin-stat-label">Contactés</span>
        </div>
        <div className="admin-stat-card closed">
          <span className="admin-stat-number">{counts.closed}</span>
          <span className="admin-stat-label">Clôturés</span>
        </div>
      </div>

      {/* Stats — by source */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-number">{counts.contact}</span>
          <span className="admin-stat-label">Contact</span>
        </div>
        <div className="admin-stat-card contacted">
          <span className="admin-stat-number">{counts.vendre}</span>
          <span className="admin-stat-label">Vendre</span>
        </div>
        <div className="admin-stat-card closed">
          <span className="admin-stat-number">{counts.location}</span>
          <span className="admin-stat-label">Mettre en location</span>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <select
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          className="admin-select"
        >
          <option value="">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="contacted">Contacté</option>
          <option value="closed">Clôturé</option>
        </select>
        <select
          value={filters.source}
          onChange={(e) => setFilters((f) => ({ ...f, source: e.target.value }))}
          className="admin-select"
        >
          <option value="">Toutes les sources</option>
          <option value="contact">Contact</option>
          <option value="vendre">Vendre</option>
          <option value="location">Mettre en location</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Chargement...</div>
      ) : leads.length === 0 ? (
        <div className="admin-empty">Aucun lead trouvé.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Nom</th>
                <th>Contact</th>
                <th>Détails</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>
                    <span className={`admin-source-badge ${lead.source}`}>
                      {lead.source === 'contact'   && <><MessageSquare size={12} /> Contact</>}
                      {lead.source === 'vendre'    && <><Home size={12} /> Vendre</>}
                      {lead.source === 'location'  && <><Key size={12} /> Location</>}
                      {!['contact', 'vendre', 'location'].includes(lead.source) && lead.source}
                    </span>
                  </td>
                  <td className="admin-td-name">{lead.name}</td>
                  <td>
                    <div className="admin-contact-info">
                      <a href={`tel:${lead.phone}`} className="admin-contact-link">
                        <Phone size={12} /> {lead.phone}
                      </a>
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="admin-contact-link">
                          <Mail size={12} /> {lead.email}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="admin-td-details">
                    {(lead.source === 'vendre' || lead.source === 'location') ? (
                      <span>
                        {lead.propertyType} — {lead.city}
                        {lead.area ? `, ${lead.area} m²` : ''}
                      </span>
                    ) : (
                      <span title={lead.message}>{lead.subject}</span>
                    )}
                  </td>
                  <td className="admin-td-date">
                    {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className="admin-status-select"
                      style={{ borderColor: STATUS_COLORS[lead.status] }}
                    >
                      {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => deleteLead(lead._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
