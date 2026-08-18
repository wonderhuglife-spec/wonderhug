'use client'

import { COMMUNITY_GROUPS } from '@/data/community'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { whatsappUrl } from '@/services/whatsapp'
import { ButtonLink } from '@/components/ui/Button'
import { HoverMedia } from '@/components/editorial/HoverMedia'

export function CommunityPreview() {
  const locale = currentLocale()
  const { t } = useTranslation()
  return (
    <section className="py-8">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-navy text-white">
          <div className="grid lg:grid-cols-2">
            <HoverMedia src="/images/placeholder-ai-community.png" alt="Mothers and babies sitting together in a bright community room." className="min-h-[16rem] w-full lg:min-h-full" width={960} height={720} />
            <div className="px-6 py-14 sm:px-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">AiSensy · WhatsApp</p>
              <Heading as="h2" className="mt-3 text-white">
                {t('community.whatsappTitle')}
              </Heading>
              <Text className="mt-4 max-w-2xl text-lg text-white/85">{t('community.whatsappBody')}</Text>
              <ButtonLink to={whatsappUrl()} className="mt-8 bg-white text-teal-dark hover:bg-teal-soft" size="lg">
                {t('cta.whatsapp')}
              </ButtonLink>
              <ul className="mt-10 flex flex-wrap gap-2">
                {COMMUNITY_GROUPS.map((group) => (
                  <li key={group.id}>
                    <Link
                      to={`/community/${group.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-white/25 bg-white/10 px-4 text-sm text-white hover:bg-white/20"
                    >
                      {pick(group.name, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
