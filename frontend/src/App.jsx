import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import HomePage from './pages/HomePage'
import AcheterPage from './pages/AcheterPage'
import LouerPage from './pages/LouerPage'
import VendrePage from './pages/VendrePage'
import MettreEnLocationPage from './pages/MettreEnLocationPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLeads from './pages/admin/AdminLeads'
import AdminProperties from './pages/admin/AdminProperties'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? children : <Navigate to="/admin/login" replace />
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/acheter"             element={<AcheterPage />} />
          <Route path="/louer"               element={<LouerPage />} />
          <Route path="/vendre"              element={<VendrePage />} />
          <Route path="/mettre-en-location"  element={<MettreEnLocationPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

function AdminLayout() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/leads"
        element={
          <ProtectedRoute>
            <AdminLeads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/properties"
        element={
          <ProtectedRoute>
            <AdminProperties />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<Navigate to="/admin/leads" replace />} />
    </Routes>
  )
}

export default function App() {
  const isAdmin = window.location.pathname.startsWith('/admin')

  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <ToastProvider>
            {isAdmin ? <AdminLayout /> : <AppLayout />}
          </ToastProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
