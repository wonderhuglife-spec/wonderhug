import { Link } from 'react-router-dom'
import { PRACTICES } from '@/data/practices'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function PracticesPage() {
  const locale = currentLocale()
  return (
    <>
      <Seo title="Garbh Sanskar practice library" description="Short daily practices." path="/practices" />
      <Container className="py-16">
        <Heading as="h1">Practice library</Heading>
        <Text muted className="mt-4 max-w-xl">
          Audio files ship with the daily pack after purchase. These guides work offline in the app once saved.
        </Text>
        <ul className="mt-10 space-y-6">
          {PRACTICES.map((practice) => (
            <li key={practice.id} className="border-b border-line pb-6">
              <h2 className="font-serif text-2xl">
                <Link to={`/practices/${practice.slug}`}>{pick(practice.title, locale)}</Link>
              </h2>
              <p className="mt-2 text-slate">{pick(practice.description, locale)}</p>
              <p className="mt-2 text-xs text-slate-muted">
                {practice.durationMinutes} min · {practice.mediaType}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
