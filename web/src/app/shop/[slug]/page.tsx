import { notFound } from 'next/navigation'
import { PRODUCTS } from '@/data/products'
import { pageMetadata } from '@/lib/seo'
import { ProductPage } from '@/views/ProductPage'
import { JsonLd } from '@/components/seo/JsonLd'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PRODUCTS.filter((product) => product.isPublished).map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS.find((item) => item.slug === slug)
  if (!product) return pageMetadata({ title: 'Product', description: '', path: `/shop/${slug}` })
  return pageMetadata({
    title: product.name.en,
    description: product.description.en,
    path: `/shop/${product.slug}`,
    image: product.image,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS.find((item) => item.slug === slug && item.isPublished)
  if (!product) notFound()
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name.en,
          description: product.description.en,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: product.pricePaise / 100,
            availability: 'https://schema.org/InStock',
          },
        }}
      />
      <ProductPage slug={slug} product={product} />
    </>
  )
}
