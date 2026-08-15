import { Link, useLocation } from 'react-router-dom'
import { hubByPath } from '@/data/hubs'
import { JsonLd, Seo, breadcrumbJsonLd } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { EmptyState } from '@/components/ui/EmptyState'

export function HubPage() {
  const { pathname } = useLocation()
  const hub = hubByPath(pathname)

  if (!hub) {
    return (
      <Container className="py-20">
        <EmptyState title="This hub is not published" description="The path is not in the topic cluster yet." />
      </Container>
    )
  }

  const crumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((_, index, parts) => {
      const path = `/${parts.slice(0, index + 1).join('/')}`
      const name = parts[index].replace(/-/g, ' ')
      return { name: name.charAt(0).toUpperCase() + name.slice(1), path }
    })

  return (
    <>
      <Seo title={hub.seoTitle} description={hub.seoDescription} path={hub.path} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, ...crumbs])} />
      <article>
        <header className="border-b border-line bg-canvas py-16">
          <Container narrow>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">{hub.kicker}</p>
            <Heading as="h1" className="mt-4">
              {hub.title}
            </Heading>
            <Text muted className="mt-5 text-lg">
              {hub.intro}
            </Text>
          </Container>
        </header>
        <Container narrow className="py-14">
          {hub.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="font-serif text-2xl text-ink">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate">{section.body}</p>
            </section>
          ))}
          <nav aria-label="Related" className="border-t border-line pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">Continue</p>
            <ul className="mt-4 space-y-2">
              {hub.related.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-navy underline-offset-4 hover:underline">
                    {item.label}
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
