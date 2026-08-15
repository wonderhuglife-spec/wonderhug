'use client'

import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { PROGRAMS } from '@/data/programs'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { formatInr } from '@/lib/constants'

export function ProgramsPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  return (
    <>
      <Seo title={t('programs.title')} description={t('programs.intro')} path="/programs" />
      <header className="border-b border-line py-16">
        <Container>
          <Heading as="h1">{t('programs.title')}</Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            {t('programs.intro')}
          </Text>
        </Container>
      </header>
      <Container className="grid gap-8 py-12">
        {PROGRAMS.map((program) => (
          <article key={program.id} className="rounded-2xl border border-line p-8">
            <h2 className="font-serif text-3xl">
              <Link to={`/programs/${program.slug}`}>{pick(program.name, locale)}</Link>
            </h2>
            <p className="mt-3 max-w-2xl text-slate">{pick(program.summary, locale)}</p>
            <p className="mt-4 font-medium">
              {formatInr(program.pricePaise, locale)} · {program.durationWeeks} weeks
            </p>
          </article>
        ))}
      </Container>
    </>
  )
}
