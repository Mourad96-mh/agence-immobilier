import { useNavigate, useLocation } from 'react-router-dom'
import { LogOut, BarChart2, Building2, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AdminNav() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <span className="admin-brand">Mecalus Admin</span>
        <nav className="admin-nav-tabs">
          <button
            className={`admin-nav-tab${pathname === '/admin/leads' ? ' active' : ''}`}
            onClick={() => navigate('/admin/leads')}
          >
            <BarChart2 size={15} /> Leads
          </button>
          <button
            className={`admin-nav-tab${pathname === '/admin/properties' ? ' active' : ''}`}
            onClick={() => navigate('/admin/properties')}
          >
            <Building2 size={15} /> Propriétés
          </button>
          <button
            className={`admin-nav-tab${pathname === '/admin/settings' ? ' active' : ''}`}
            onClick={() => navigate('/admin/settings')}
          >
            <Settings size={15} /> Paramètres
          </button>
        </nav>
      </div>
      <div className="admin-topbar-right">
        <button className="admin-icon-btn admin-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Déconnexion</span>
        </button>
      </div>
    </header>
  )
}
