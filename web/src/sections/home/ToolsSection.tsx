import { TOOLS } from '@/data/tools'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'
import { track } from '@/services/analytics'

export function ToolsSection() {
  return (
    <section className="bg-canvas py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Tools</p>
            <Heading as="h2" className="mt-3">
              Quiet tools for real weeks.
            </Heading>
          </div>
          <Link to="/tools" className="text-sm font-medium text-navy underline-offset-4 hover:underline">
            All tools
          </Link>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.id} className="bg-white p-8">
              <Link
                to={tool.href}
                className="font-serif text-2xl text-ink hover:text-teal-dark"
                onClick={() => track('tool_used', { tool: tool.slug })}
              >
                {tool.name}
              </Link>
              <p className="mt-3 text-slate">{tool.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
