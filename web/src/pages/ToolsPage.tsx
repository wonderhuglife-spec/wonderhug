import { TOOLS } from '@/data/tools'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Link } from 'react-router-dom'
import { track } from '@/services/analytics'

export function ToolsPage() {
  return (
    <>
      <Seo
        title="Tools"
        description="Planning checklists, week hubs and birth-preference worksheets from WonderHug.Life."
        path="/tools"
      />
      <header className="border-b border-line py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">Tools</p>
          <Heading as="h1" className="mt-3">
            Practical, not performative.
          </Heading>
          <Text muted className="mt-4 max-w-2xl text-lg">
            Tools help you remember and talk. They do not replace a hospital file or a clinician’s plan.
          </Text>
        </Container>
      </header>
      <Container className="py-12">
        <ul className="divide-y divide-line border-y border-line">
          {TOOLS.map((tool) => (
            <li key={tool.id} className="py-8">
              <Link
                to={tool.href}
                className="font-serif text-3xl hover:text-teal-dark"
                onClick={() => track('tool_used', { tool: tool.slug })}
              >
                {tool.name}
              </Link>
              <p className="mt-3 max-w-2xl text-slate">{tool.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
