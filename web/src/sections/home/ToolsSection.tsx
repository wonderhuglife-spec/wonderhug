'use client'

import { TOOLS } from '@/data/tools'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Link } from '@/lib/navigation'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'

export function ToolsSection() {
  const locale = currentLocale()
  return (
    <section className="bg-canvas py-20">
      <Container>
        <Heading as="h2">Tools</Heading>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.id} className="bg-white p-8">
              <Link to={tool.href} className="font-serif text-2xl text-ink hover:text-teal-dark">
                {pick(tool.name, locale)}
              </Link>
              <p className="mt-3 text-slate">{pick(tool.description, locale)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
