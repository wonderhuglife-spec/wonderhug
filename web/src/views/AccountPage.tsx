'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button, ButtonLink } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { listLocalOrders, programAccessFromOrders } from '@/services/checkout'
import { formatInr } from '@/lib/constants'
import { currentLocale } from '@/i18n'
import { useJourney } from '@/hooks/useJourney'
import { listSavedArticleIds } from '@/services/saved'
import { pick } from '@/lib/locale'
import { Link } from '@/lib/navigation'
import { useCatalog } from '@/hooks/useCatalog'

export function AccountPage() {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()
  const { profile } = useJourney()
  const locale = currentLocale()
  const { posts } = useCatalog()
  const [orders] = useState(() => listLocalOrders())
  const programs = programAccessFromOrders()
  const saved = listSavedArticleIds()
    .map((id) => posts.find((post) => post.id === id || post.slug === id))
    .filter(Boolean)

  return (
    <>
      <Seo title={t('account.title')} description={t('account.title')} path="/account" />
      <Container className="py-16">
        <Heading as="h1">{t('account.title')}</Heading>
        {!user ? (
          <Text className="mt-4">
            Journey, cart and demo orders stay on this device until you sign in.{' '}
            <ButtonLink to="/signin" className="ml-2">
              {t('cta.signIn')}
            </ButtonLink>
          </Text>
        ) : (
          <Text className="mt-4">{user.phone ?? user.email}</Text>
        )}
        <section className="mt-10">
          <h2 className="font-serif text-2xl">{t('account.timeline')}</h2>
          <p className="mt-2 text-slate">
            Stage: {profile.journeyStage}
            {profile.pregnancyWeek ? ` · week ${profile.pregnancyWeek}` : ''}
            {profile.goals.length ? ` · ${profile.goals.join(', ')}` : ''}
          </p>
        </section>
        <section className="mt-10">
          <h2 className="font-serif text-2xl">{t('account.orders')}</h2>
          {orders.length === 0 ? (
            <p className="mt-2 text-slate">No orders on this device yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((order) => (
                <li key={order.id}>
                  <Link className="underline" to={`/order/${order.id}`}>
                    {order.id}
                  </Link>{' '}
                  · {formatInr(order.amountPaise, locale)} · {order.status}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="mt-10">
          <h2 className="font-serif text-2xl">{t('account.programs')}</h2>
          {programs.length === 0 ? (
            <p className="mt-2 text-slate">
              Enrol from{' '}
              <Link className="underline" to="/programs">
                programmes
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 list-disc pl-5">
              {programs.map((slug) => (
                <li key={slug}>
                  <Link to={`/programs/${slug}`}>{slug}</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="mt-10">
          <h2 className="font-serif text-2xl">{t('account.saved')}</h2>
          {saved.length === 0 ? (
            <p className="mt-2 text-slate">Save an article from the journal to see it here.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {saved.map((post) =>
                post ? (
                  <li key={post.id}>
                    <Link to={`/blog/${post.slug}`}>{pick(post.title, locale)}</Link>
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </section>
        <section className="mt-10">
          <h2 className="font-serif text-2xl">Website CMS</h2>
          <p className="mt-2 text-slate">Edit pages, journal posts, shop, programmes, faculty, practices, and media.</p>
          <ButtonLink to="/admin" className="mt-3">
            Open WonderHug CMS
          </ButtonLink>
        </section>
        {user ? (
          <Button className="mt-10" variant="secondary" onClick={() => void signOut()}>
            {t('cta.signOut')}
          </Button>
        ) : null}
      </Container>
    </>
  )
}
