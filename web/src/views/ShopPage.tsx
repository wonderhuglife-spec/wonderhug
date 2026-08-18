'use client'

import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { PRODUCTS } from '@/data/products'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/components/ui/Toast'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'
import { JsonLd } from '@/components/seo/Seo'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { PageHero } from '@/components/editorial/PageHero'
import { Reveal } from '@/components/motion/Reveal'

export function ShopPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  const { add } = useCart()
  const toast = useToast()
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
      <PageHero
        kicker="Wellness products · not medicines"
        title={t('shop.title')}
        lede={t('shop.intro')}
        src="/images/placeholder-ai-shop-journal.png"
        alt="placeholder-ai- Shop atmosphere"
      />
      <Container className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.04}>
            <article className="overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lift">
              <Link to={`/shop/${product.slug}`} className="block">
                <HoverMedia src={product.image} alt={`placeholder-ai- ${pick(product.name, locale)}`} className="aspect-[4/3] w-full" />
              </Link>
              <div className="p-6">
                <h2 className="font-serif text-2xl">
                  <Link to={`/shop/${product.slug}`}>{pick(product.name, locale)}</Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-slate">{pick(product.description, locale)}</p>
                <p className="mt-4 font-medium">{formatInr(product.pricePaise, locale)}</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    add({
                      kind: 'product',
                      id: product.id,
                      slug: product.slug,
                      title: pick(product.name, locale),
                      unitPaise: product.pricePaise,
                    })
                    toast('Added to cart')
                  }}
                >
                  {t('shop.add')}
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </Container>
    </>
  )
}
