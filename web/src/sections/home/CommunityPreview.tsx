import { COMMUNITY_GROUPS } from '@/data/community'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { whatsappUrl } from '@/services/whatsapp'
import { ButtonLink } from '@/components/ui/Button'

export function CommunityPreview() {
  const locale = currentLocale()
  const { t } = useTranslation()
  return (
    <section className="border-y border-line py-20">
      <Container>
        <Heading as="h2">{t('community.whatsappTitle')}</Heading>
        <Text muted className="mt-4 max-w-2xl text-lg">
          {t('community.whatsappBody')}
        </Text>
        <ButtonLink to={whatsappUrl()} className="mt-6" variant="teal">
          {t('cta.whatsapp')}
        </ButtonLink>
        <ul className="mt-10 flex flex-wrap gap-3">
          {COMMUNITY_GROUPS.map((group) => (
            <li key={group.id}>
              <Link
                to={`/community/${group.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-ink hover:border-teal hover:bg-teal-soft"
              >
                {pick(group.name, locale)}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
