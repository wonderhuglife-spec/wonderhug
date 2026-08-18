'use client'

import { TOOLS } from '@/data/tools'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Link } from '@/lib/navigation'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { useTranslation } from 'react-i18next'

export function ToolsSection() {
  const locale = currentLocale()
  const { t } = useTranslation()
  return (
    <section className="py-20">
      <Container>
        <Heading as="h2">{t('nav.tools')}</Heading>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.id}>
              <Link to={tool.href} className="block rounded-3xl border border-line bg-white p-8 transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-lift">
                <span className="font-serif text-2xl text-ink">{pick(tool.name, locale)}</span>
                <p className="mt-3 text-slate">{pick(tool.description, locale)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
