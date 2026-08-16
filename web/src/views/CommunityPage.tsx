'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { COMMUNITY_GROUPS } from '@/data/community'
import { communityService } from '@/services/community'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { captureWhatsappLead, whatsappUrl } from '@/services/whatsapp'

export function CommunityPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  const [phone, setPhone] = useState('+91')
  const [note, setNote] = useState<string | null>(null)

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
          <ButtonLink to={whatsappUrl('Namaste, I would like to join the WonderHug WhatsApp community.')} className="mt-6" variant="teal">
            {t('cta.whatsapp')}
          </ButtonLink>
          <form
            className="mt-8 max-w-md rounded-2xl border border-line bg-white p-6"
            onSubmit={async (event) => {
              event.preventDefault()
              await captureWhatsappLead(phone, 'community-page', locale)
              setNote('Request recorded. Open WhatsApp to finish joining the AiSensy room.')
            }}
          >
            <Label htmlFor="wa-phone">WhatsApp number</Label>
            <Input id="wa-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" />
            <Button className="mt-4" type="submit">
              Opt in via AiSensy
            </Button>
            {note ? <p className="mt-3 text-sm text-navy">{note}</p> : null}
          </form>
        </Container>
      </header>
      <Container className="grid gap-6 py-12 md:grid-cols-2">
        {COMMUNITY_GROUPS.map((group) => (
          <Link key={group.id} to={`/community/${group.slug}`} className="rounded-2xl border border-line p-6">
            <h2 className="font-serif text-2xl">{pick(group.name, locale)}</h2>
            <p className="mt-3 text-slate">{pick(group.description, locale)}</p>
          </Link>
        ))}
      </Container>
    </>
  )
}
