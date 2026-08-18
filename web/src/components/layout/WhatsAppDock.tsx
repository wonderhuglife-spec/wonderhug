'use client'

import { useTranslation } from 'react-i18next'
import { captureWhatsappLead, whatsappUrl } from '@/services/whatsapp'
import { currentLocale } from '@/i18n'

export function WhatsAppDock() {
  const { t } = useTranslation()
  return (
    <a
      href={whatsappUrl('Namaste, I would like to join the WonderHug WhatsApp community.')}
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#128C7E] px-5 text-sm font-semibold text-white shadow-[0_12px_40px_-12px_rgba(18,140,126,0.9)]"
      onClick={() => void captureWhatsappLead('unknown', 'dock', currentLocale())}
    >
      {t('cta.whatsapp')}
    </a>
  )
}
