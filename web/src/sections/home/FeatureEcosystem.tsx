import { PROGRAMS } from '@/data/programs'
import { PRODUCTS } from '@/data/products'
import { FEATURE_ECOSYSTEM } from '@/data/features'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'

export function FeatureEcosystem() {
  const locale = currentLocale()
  return (
    <section className="py-20">
      <Container>
        <Heading as="h2">Garbh Sanskar, programmes, and the shop</Heading>
        <Text muted className="mt-4 max-w-2xl text-lg">
          Education and practice for Telugu-speaking families first, then pan-India English. Not a clinic.
        </Text>
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {FEATURE_ECOSYSTEM.map((item, index) => (
            <li key={item.id} className="grid gap-4 py-8 sm:grid-cols-12">
              <p className="font-serif text-2xl text-purple sm:col-span-1">{String(index + 1).padStart(2, '0')}</p>
              <Link to={item.href} className="font-semibold sm:col-span-4">
                {item.title}
              </Link>
              <p className="text-slate sm:col-span-7">{item.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program) => (
            <Link key={program.id} to={`/programs/${program.slug}`} className="rounded-2xl border border-line p-6">
              <p className="font-serif text-2xl">{pick(program.name, locale)}</p>
              <p className="mt-2 text-sm text-slate">{pick(program.summary, locale)}</p>
              <p className="mt-4 text-sm font-medium">{formatInr(program.pricePaise, locale)}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm">
          Also in the shop: {PRODUCTS.map((p) => pick(p.name, locale)).join(' · ')}
        </p>
      </Container>
    </section>
  )
}
