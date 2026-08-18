'use client'

import { Link, useLocation } from '@/lib/navigation'
import { hubByPath } from '@/data/hubs'
import { JsonLd, Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { PageHero } from '@/components/editorial/PageHero'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { Reveal } from '@/components/motion/Reveal'

function hubArt(path: string) {
  if (path.includes('garbh')) return '/images/placeholder-ai-journal-garbh.png'
  if (path.includes('parent')) return '/images/placeholder-ai-program-parenting.png'
  if (path.includes('postpartum')) return '/images/placeholder-ai-journal-postpartum.png'
  if (path.includes('planning')) return '/images/placeholder-ai-journal-planning.png'
  return '/images/placeholder-ai-program-womb.png'
}

export function HubPage({ path }: { path?: string }) {
  const { pathname } = useLocation()
  const resolved = path ?? pathname
  const hub = hubByPath(resolved)
  const locale = currentLocale()

  if (!hub) {
    return (
      <Container className="py-20">
        <EmptyState title="This hub is not published" description="The path is not in the topic cluster yet." />
      </Container>
    )
  }

  const crumbs = resolved
    .split('/')
    .filter(Boolean)
    .map((_, index, parts) => {
      const path = `/${parts.slice(0, index + 1).join('/')}`
      const name = parts[index].replace(/-/g, ' ')
      return { name: name.charAt(0).toUpperCase() + name.slice(1), path }
    })

  return (
    <>
      <Seo title={pick(hub.seoTitle, locale)} description={pick(hub.seoDescription, locale)} path={hub.path} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, ...crumbs])} />
      <article>
        <PageHero
          kicker={pick(hub.kicker, locale)}
          title={pick(hub.title, locale)}
          lede={pick(hub.intro, locale)}
          src={hubArt(resolved)}
          alt="A pregnant woman resting in a home courtyard."
        />
        <Container narrow className="py-14">
          {hub.sections.map((section) => (
            <Reveal key={section.heading.en}>
              <section className="mb-10">
                <h2 className="font-serif text-2xl text-ink">{pick(section.heading, locale)}</h2>
                <p className="mt-3 leading-relaxed text-slate">{pick(section.body, locale)}</p>
              </section>
            </Reveal>
          ))}
          <nav aria-label="Related" className="border-t border-line pt-8">
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {hub.related.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="group block overflow-hidden rounded-2xl border border-line bg-white">
                    <HoverMedia src={hubArt(item.href)} alt="" className="aspect-[16/8] w-full" width={640} height={320} />
                    <span className="block p-4 text-navy group-hover:text-teal-dark">{pick(item.label, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </article>
    </>
  )
}
