import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROGRAMS } from '@/data/programs'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCart } from '@/hooks/useCart'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'

export function ProgramDetailPage() {
  const { slug = '' } = useParams()
  const program = PROGRAMS.find((item) => item.slug === slug)
  const locale = currentLocale()
  const { add } = useCart()
  const { t } = useTranslation()
  const navigate = useNavigate()

  if (!program) {
    return (
      <Container className="py-20">
        <EmptyState title="Programme not found" description="" />
      </Container>
    )
  }

  const name = pick(program.name, locale)

  return (
    <>
      <Seo title={name} description={pick(program.summary, locale)} path={`/programs/${program.slug}`} />
      <Container className="py-16">
        <Heading as="h1">{name}</Heading>
        <p className="mt-4 max-w-2xl text-lg text-slate">{pick(program.description, locale)}</p>
        <p className="mt-6 font-medium">
          {formatInr(program.pricePaise, locale)} · {program.durationWeeks} weeks
        </p>
        <ol className="mt-10 space-y-4">
          {program.modules.map((mod) => (
            <li key={mod.title.en} className="border-l-2 border-teal pl-4">
              <p className="font-medium">{pick(mod.title, locale)}</p>
              <p className="text-slate">{pick(mod.body, locale)}</p>
            </li>
          ))}
        </ol>
        <Button
          className="mt-10"
          size="lg"
          onClick={() => {
            add({ kind: 'program', id: program.id, slug: program.slug, title: name, unitPaise: program.pricePaise })
            navigate('/checkout')
          }}
        >
          {t('cta.enroll')}
        </Button>
      </Container>
    </>
  )
}
