'use client'

import { Link, useParams } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { PRODUCTS } from '@/data/products'
import { Seo, JsonLd } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCart } from '@/hooks/useCart'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'

import type { Product } from '@/types/domain'
import { Media } from '@/components/media/Media'

export function ProductPage({ slug: slugProp, product: productProp }: { slug?: string; product?: Product }) {
  const params = useParams()
  const slug = slugProp ?? String(params.slug ?? '')
  const product = productProp ?? PRODUCTS.find((item) => item.slug === slug)
  const locale = currentLocale()
  const { add } = useCart()
  const { t } = useTranslation()

  if (!product) {
    return (
      <Container className="py-20">
        <EmptyState title="Product not found" description="This slug is not in the catalogue." />
      </Container>
    )
  }

  const name = pick(product.name, locale)
  const description = pick(product.description, locale)

  return (
    <>
      <Seo title={name} description={description} path={`/shop/${product.slug}`} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          description,
          offers: { '@type': 'Offer', priceCurrency: 'INR', price: product.pricePaise / 100, availability: 'https://schema.org/InStock' },
        }}
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-2">
        <Media src={product.image} alt="" className="aspect-square w-full rounded-2xl bg-canvas object-cover" width={800} height={800} />
        <div>
          <Heading as="h1">{name}</Heading>
          <p className="mt-4 text-lg text-slate">{description}</p>
          <p className="mt-6 text-2xl font-medium">{formatInr(product.pricePaise, locale)}</p>
          <Button
            className="mt-6"
            size="lg"
            onClick={() =>
              add({ kind: 'product', id: product.id, slug: product.slug, title: name, unitPaise: product.pricePaise })
            }
          >
            {t('shop.add')}
          </Button>
          <p className="mt-6 text-sm">
            <Link to="/cart" className="underline">
              {t('nav.cart')}
            </Link>
          </p>
        </div>
      </Container>
    </>
  )
}
