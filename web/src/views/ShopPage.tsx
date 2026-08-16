'use client'

import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { PRODUCTS } from '@/data/products'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'
import { JsonLd } from '@/components/seo/Seo'
import { Media } from '@/components/media/Media'

export function ShopPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  const { add } = useCart()
  return (
    <>
      <Seo title={t('shop.title')} description={t('shop.intro')} path="/shop" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'WonderHug shop',
        }}
      />
      <header className="border-b border-line py-16">
        <Container>
          <Heading as="h1">{t('shop.title')}</Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            {t('shop.intro')}
          </Text>
        </Container>
      </header>
      <Container className="grid gap-8 py-12 md:grid-cols-2">
        {PRODUCTS.map((product) => (
          <article key={product.id} className="rounded-2xl border border-line p-6">
            <Media src={product.image} alt="" className="aspect-[16/10] w-full rounded-xl bg-canvas object-cover" />
            <h2 className="mt-4 font-serif text-2xl">
              <Link to={`/shop/${product.slug}`}>{pick(product.name, locale)}</Link>
            </h2>
            <p className="mt-2 text-slate">{pick(product.description, locale)}</p>
            <p className="mt-4 font-medium">{formatInr(product.pricePaise, locale)}</p>
            <Button
              className="mt-4"
              onClick={() =>
                add({
                  kind: 'product',
                  id: product.id,
                  slug: product.slug,
                  title: pick(product.name, locale),
                  unitPaise: product.pricePaise,
                })
              }
            >
              {t('shop.add')}
            </Button>
          </article>
        ))}
      </Container>
    </>
  )
}
