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
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader kicker="Everyday helpers" title={t('nav.tools')} lede="Due date, kicks, contractions and weight — educational notebooks, not a diagnosis." />
        <ul className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
          {TOOLS.map((tool) => (
            <li key={tool.id} className="min-w-[16rem] snap-start md:min-w-0">
              <Link to={tool.href} className="group block">
                <HoverMedia src={tool.image} alt={tool.imageAlt} className="aspect-[4/3] w-full rounded-2xl bg-canvas" width={480} height={360} />
                <span className="mt-4 block font-serif text-xl text-ink group-hover:text-teal-dark">{pick(tool.name, locale)}</span>
                <p className="mt-2 text-sm text-slate">{pick(tool.description, locale)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
