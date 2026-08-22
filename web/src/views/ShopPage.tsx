'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { useCatalog } from '@/hooks/useCatalog'
import { Seo, JsonLd } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Button, ButtonLink } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/components/ui/Toast'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { Reveal } from '@/components/motion/Reveal'
import { Tabs } from '@/components/ui/Tabs'
import type { Product } from '@/types/domain'
import { TrustSignals } from '@/components/editorial/TrustSignals'
import { conversionTrustSignals } from '@/data/trustSignals'

type ShopFilter = 'all' | 'garbh' | 'planning' | 'pregnancy' | 'parenting' | 'kitchen'

const FILTERS: { id: ShopFilter; label: string }[] = [
  { id: 'all', label: 'All products' },
  { id: 'garbh', label: 'Garbh Sanskar' },
  { id: 'planning', label: 'Planning' },
  { id: 'pregnancy', label: 'Pregnancy' },
  { id: 'parenting', label: 'Parenting' },
  { id: 'kitchen', label: 'Kitchen' },
]

const STAGES: { id: ShopFilter; title: string; lede: string; href: string }[] = [
  {
    id: 'planning',
    title: 'Planning together',
    lede: 'Workbooks and kitchen cards for couples before a test.',
    href: '/pregnancy-planning',
  },
  {
    id: 'pregnancy',
    title: 'Pregnancy days',
    lede: 'Journals and daily Garbh Sanskar practice packs.',
    href: '/pregnancy',
  },
  {
    id: 'parenting',
    title: 'Fourth trimester',
    lede: 'Visitor boundaries, rest windows, feeding questions.',
    href: '/parenting',
  },
]

function matchesFilter(product: Product, filter: ShopFilter) {
  if (filter === 'all') return true
  if (filter === 'garbh') return product.goals.includes('garbh_sanskar')
  if (filter === 'planning') return product.journeyStages.some((stage) => stage === 'planning' || stage === 'ttc')
  if (filter === 'pregnancy') return product.journeyStages.some((stage) => stage === 'pregnant' || stage === 'birth_prep')
  if (filter === 'parenting') return product.journeyStages.includes('new_parent')
  return product.goals.includes('nutrition')
}

function ProductCard({
  product,
  onAdd,
  addLabel,
}: {
  product: Product
  onAdd: (product: Product) => void
  addLabel: string
}) {
  const locale = currentLocale()
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lift">
      <Link to={`/shop/${product.slug}`} className="block">
        <HoverMedia src={product.image} alt={pick(product.name, locale)} className="aspect-[4/3] w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-dark">
          {product.isDigital ? 'Digital download' : 'Product'}
        </p>
        <h2 className="mt-2 font-serif text-2xl leading-tight">
          <Link to={`/shop/${product.slug}`}>{pick(product.name, locale)}</Link>
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate">{pick(product.description, locale)}</p>
        <p className="mt-4 text-lg font-semibold text-purple">{formatInr(product.pricePaise, locale)}</p>
        <Button className="mt-4 w-full" onClick={() => onAdd(product)}>
          {addLabel}
        </Button>
      </div>
    </article>
  )
}

export function ShopPage() {
  const { t } = useTranslation()
  const { products } = useCatalog()
  const locale = currentLocale()
  const { add } = useCart()
  const toast = useToast()
  const [filter, setFilter] = useState<ShopFilter>('all')
  const list = products.filter((product) => product.isPublished)
  const filtered = useMemo(() => list.filter((product) => matchesFilter(product, filter)), [filter, list])
  const featured = list.find((product) => product.slug === 'garbh-sanskar-daily-pack') ?? list[0]
  const mustHaves = list.slice(0, 3)

  function addProduct(product: Product) {
    add({
      kind: 'product',
      id: product.id,
      slug: product.slug,
      title: pick(product.name, locale),
      unitPaise: product.pricePaise,
    })
    toast('Added to cart')
  }

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

      <section className="relative overflow-hidden bg-gradient-to-br from-canvas via-paper to-teal-soft">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple">Wellness kits · not medicines</p>
            <h1 className="mt-4 font-serif text-display font-medium text-ink">{t('shop.title')}</h1>
            <p className="mt-5 max-w-xl text-lg text-slate">{t('shop.intro')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => featured && addProduct(featured)}
                disabled={!featured}
              >
                {t('shop.add')}
              </Button>
              <ButtonLink to="/programs" variant="secondary" size="lg">
                Browse programmes
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            {featured ? (
              <Link to={`/shop/${featured.slug}`} className="block overflow-hidden rounded-[2rem] border border-white/80 shadow-lift">
                <HoverMedia src={featured.image} alt={pick(featured.name, locale)} className="aspect-[16/10] w-full" />
                <div className="bg-white px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-teal-dark">Today’s pick</p>
                  <p className="mt-1 font-serif text-2xl">{pick(featured.name, locale)}</p>
                  <p className="mt-2 font-medium text-purple">{formatInr(featured.pricePaise, locale)}</p>
                </div>
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

      <TrustSignals variant="bar" signals={conversionTrustSignals} />

      <Container className="py-8">
        <Tabs label="Shop categories" value={filter} onChange={setFilter} tabs={FILTERS} />
      </Container>

      <Container className="py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">Must-haves</p>
            <h2 className="mt-2 font-serif text-3xl">Start with these</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {mustHaves.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <ProductCard product={product} onAdd={addProduct} addLabel={t('shop.add')} />
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="bg-canvas">
        <Container className="py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple">Shop by stage</p>
          <h2 className="mt-2 font-serif text-3xl">Where are you right now?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                type="button"
                className="rounded-3xl border border-line bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-lift"
                onClick={() => setFilter(stage.id)}
              >
                <h3 className="font-serif text-2xl">{stage.title}</h3>
                <p className="mt-2 text-sm text-slate">{stage.lede}</p>
                <Link to={stage.href} className="mt-4 inline-block text-sm font-medium text-teal-dark" onClick={(event) => event.stopPropagation()}>
                  Read the stage guide →
                </Link>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <h2 className="font-serif text-3xl">{filter === 'all' ? 'All products' : FILTERS.find((item) => item.id === filter)?.label}</h2>
        {filtered.length === 0 ? (
          <p className="mt-6 text-slate">No products in this category yet.</p>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.04}>
                <ProductCard product={product} onAdd={addProduct} addLabel={t('shop.add')} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
