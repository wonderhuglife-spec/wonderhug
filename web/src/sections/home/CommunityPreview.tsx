'use client'

import { useCatalog } from '@/hooks/useCatalog'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { whatsappUrl } from '@/services/whatsapp'
import { ButtonLink } from '@/components/ui/Button'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { useCmsImage } from '@/hooks/useCmsImages'

export function CommunityPreview() {
  const { groups } = useCatalog()
  const locale = currentLocale()
  const { t } = useTranslation()
  const art = useCmsImage('community')
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <HoverMedia
            src={art.src}
            alt={art.alt}
            className="min-h-[18rem] w-full rounded-3xl lg:col-span-8 lg:min-h-[28rem]"
            width={1200}
            height={800}
          />
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">AiSensy · WhatsApp</p>
            <Heading as="h2" className="mt-3">
              {t('community.whatsappTitle')}
            </Heading>
            <Text muted className="mt-4 text-lg">
              {t('community.whatsappBody')}
            </Text>
            <ButtonLink to={whatsappUrl()} variant="teal" className="mt-8" size="lg">
              {t('cta.whatsapp')}
            </ButtonLink>
            <ul className="mt-8 flex flex-wrap gap-2">
              {groups.map((group) => (
                <li key={group.id}>
                  <Link
                    to={`/community/${group.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm text-ink hover:border-teal"
                  >
                    {pick(group.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
