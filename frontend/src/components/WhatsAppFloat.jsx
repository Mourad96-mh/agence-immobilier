import { MessageCircle } from 'lucide-react'
import { AGENCY } from '../config'
import { useLanguage } from '../context/LanguageContext'
import { trackLead } from '../utils/trackLead'

export default function WhatsAppFloat() {
  const { t } = useLanguage()
  return (
    <a
      href={`https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent(t('whatsapp.floatMsg'))}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="WhatsApp"
      title="WhatsApp"
      onClick={() => trackLead({ source: 'float-button' }, 'whatsapp')}
    >
      <MessageCircle size={26} color="white" />
    </a>
  )
}
