'use client'

import { Link } from '@/lib/navigation'
import { useCatalog } from '@/hooks/useCatalog'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { PageHero } from '@/components/editorial/PageHero'
import { Reveal } from '@/components/motion/Reveal'

export function PracticesPage() {
  const locale = currentLocale()
  const { practices } = useCatalog()
  return (
    <>
      <Seo title="Garbh Sanskar practice library" description="Short daily practices." path="/practices" />
      <PageHero
        kicker="Garbh Sanskar"
        title="Practice library"
        lede="Audio files ship with the daily pack after purchase. These guides work offline in the app once saved."
        src="/images/placeholder-ai-practice.png"
        alt="placeholder-ai- Practice still life."
      />
      <Container className="py-16">
        <ul className="grid gap-6 md:grid-cols-2">
          {practices.map((practice, index) => (
            <Reveal key={practice.id} delay={index * 0.04}>
              <li className="overflow-hidden rounded-3xl border border-line bg-white">
                <HoverMedia src="/images/placeholder-ai-practice.png" alt="placeholder-ai- Practice still life." className="aspect-[16/9] w-full" />
                <div className="p-6">
                  <h2 className="font-serif text-2xl">
                    <Link to={`/practices/${practice.slug}`}>{pick(practice.title, locale)}</Link>
                  </h2>
                  <p className="mt-2 text-slate">{pick(practice.description, locale)}</p>
                  <p className="mt-2 text-xs text-slate-muted">
                    {practice.durationMinutes} min · {practice.mediaType}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  )
}
