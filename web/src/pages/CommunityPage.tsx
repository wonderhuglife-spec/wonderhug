import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { communityService } from '@/services/community'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { whatsappUrl } from '@/services/whatsapp'

export function CommunityPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  const { data } = useAsyncResource(() => communityService.listGroups(), 'groups')
  useEffect(() => {
    communityService.openCommunity()
  }, [])
  return (
    <>
      <Seo title="Community" description={t('community.whatsappBody')} path="/community" />
      <header className="border-b border-line py-16">
        <Container>
          <Heading as="h1">{t('community.whatsappTitle')}</Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            {t('community.whatsappBody')}
          </Text>
          <ButtonLink to={whatsappUrl()} className="mt-6" variant="teal">
            {t('cta.whatsapp')}
          </ButtonLink>
        </Container>
      </header>
      <Container className="grid gap-6 py-12 md:grid-cols-2">
        {(data ?? []).map((group) => (
          <Link key={group.id} to={`/community/${group.slug}`} className="rounded-2xl border border-line p-6">
            <h2 className="font-serif text-2xl">{pick(group.name, locale)}</h2>
            <p className="mt-3 text-slate">{pick(group.description, locale)}</p>
          </Link>
        ))}
      </Container>
    </>
  )
}
