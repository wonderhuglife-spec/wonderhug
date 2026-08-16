'use client'

import { TOOLS } from '@/data/tools'
import { Container } from '@/components/ui/Container'
import { Link } from '@/lib/navigation'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { useTranslation } from 'react-i18next'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'

export function ToolsSection() {
  const locale = currentLocale()
  const { t } = useTranslation()
  return (
    <section className="py-20">
      <Container>
        <SectionHeader kicker="Everyday helpers" title={t('nav.tools')} lede="Due date, kicks, contractions and weight — educational notebooks, not a diagnosis." />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.id}>
              <Link to={tool.href} className="group flex overflow-hidden rounded-3xl border border-line bg-white transition duration-300 ease-editorial hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-lift">
                <HoverMedia src={tool.image} alt={tool.imageAlt} className="h-full w-36 shrink-0 sm:w-44" width={360} height={280} />
                <span className="p-6">
                  <span className="font-serif text-2xl text-ink group-hover:text-teal-dark">{pick(tool.name, locale)}</span>
                  <p className="mt-3 text-slate">{pick(tool.description, locale)}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
