import { FEATURE_ECOSYSTEM } from '@/data/features'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'

export function FeatureEcosystem() {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">The ecosystem</p>
          <Heading as="h2" className="mt-3">
            One journey. Many kinds of support.
          </Heading>
          <Text muted className="mt-4 text-lg">
            These are WonderHug feature concepts — education and practice, not a clinic. We do not attach success rates
            or medical outcomes to any of them.
          </Text>
        </div>
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {FEATURE_ECOSYSTEM.map((item, index) => (
            <li key={item.id} className="grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline">
              <p className="font-serif text-2xl text-purple sm:col-span-1">{String(index + 1).padStart(2, '0')}</p>
              <div className="sm:col-span-4">
                <Link to={item.href} className="font-semibold text-ink hover:text-teal-dark">
                  {item.title}
                </Link>
              </div>
              <p className="text-slate sm:col-span-7">{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
