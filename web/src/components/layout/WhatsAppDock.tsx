import { useTranslation } from 'react-i18next'
import { captureWhatsappLead, whatsappUrl } from '@/services/whatsapp'
import { currentLocale } from '@/i18n'

export function WhatsAppDock() {
  const { t } = useTranslation()
  return (
    <a
      href={whatsappUrl('Namaste, I would like to join the WonderHug WhatsApp community.')}
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center rounded-full bg-[#128C7E] px-4 text-sm font-semibold text-white shadow-lift"
      onClick={() => void captureWhatsappLead('unknown', 'dock', currentLocale())}
    >
      {t('cta.whatsapp')}
    </a>
  )
}
