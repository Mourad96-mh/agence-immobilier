import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)
    setTimeout(() => setToast(null), 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="toast" role="alert">
          <CheckCircle size={20} className="toast-icon" />
          <span>{toast}</span>
          <button className="toast-close" onClick={() => setToast(null)} aria-label="Fermer">
            <X size={16} />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
