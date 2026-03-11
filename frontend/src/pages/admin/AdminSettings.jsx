import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Save, Eye, EyeOff } from 'lucide-react'
import AdminNav from '../../components/AdminNav'
import { useAuth } from '../../context/AuthContext'

export default function AdminSettings() {
  const { token, login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ currentPassword: '', newEmail: '', newPassword: '', confirmPassword: '' })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.currentPassword) { setError('Le mot de passe actuel est requis.'); return }
    if (!form.newEmail && !form.newPassword) { setError('Renseignez un nouvel email ou un nouveau mot de passe.'); return }
    if (form.newPassword && form.newPassword !== form.confirmPassword) { setError('Les nouveaux mots de passe ne correspondent pas.'); return }
    if (form.newPassword && form.newPassword.length < 6) { setError('Le nouveau mot de passe doit contenir au moins 6 caractères.'); return }

    setSaving(true)
    try {
      const res = await fetch('/api/auth/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newEmail: form.newEmail || undefined,
          newPassword: form.newPassword || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erreur serveur')
      login(data.token)
      setSuccess('Vos informations ont été mises à jour avec succès.')
      setForm({ currentPassword: '', newEmail: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => navigate('/admin/properties'), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <AdminNav />
      <div className="admin-page">
        <div className="admin-settings-wrap">
          <h1 className="admin-settings-title">Paramètres du compte</h1>
          <p className="admin-settings-subtitle">Modifiez votre email et/ou mot de passe de connexion.</p>

          <form className="admin-settings-form" onSubmit={handleSubmit}>
            {error && <div className="modal-error">{error}</div>}
            {success && <div className="admin-settings-success">{success}</div>}

            <div className="modal-field">
              <label>Mot de passe actuel <span className="required">*</span></label>
              <div className="settings-input-wrap">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={form.currentPassword}
                  onChange={(e) => set('currentPassword', e.target.value)}
                  placeholder="Votre mot de passe actuel"
                  autoComplete="current-password"
                />
                <button type="button" className="settings-eye-btn" onClick={() => setShowCurrent((v) => !v)}>
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <hr className="settings-divider" />

            <div className="modal-field">
              <label>Nouvel email</label>
              <input
                type="email"
                value={form.newEmail}
                onChange={(e) => set('newEmail', e.target.value)}
                placeholder="Laisser vide pour ne pas modifier"
                autoComplete="email"
              />
            </div>

            <div className="modal-field">
              <label>Nouveau mot de passe</label>
              <div className="settings-input-wrap">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={form.newPassword}
                  onChange={(e) => set('newPassword', e.target.value)}
                  placeholder="Laisser vide pour ne pas modifier"
                  autoComplete="new-password"
                />
                <button type="button" className="settings-eye-btn" onClick={() => setShowNew((v) => !v)}>
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="modal-field">
              <label>Confirmer le nouveau mot de passe</label>
              <input
                type={showNew ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => set('confirmPassword', e.target.value)}
                placeholder="Répétez le nouveau mot de passe"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="modal-btn-save" disabled={saving}>
              {saving ? <><Loader2 size={15} className="spin" /> Enregistrement...</> : <><Save size={15} /> Enregistrer</>}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
