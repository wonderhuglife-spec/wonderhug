'use client'

import { useCatalog } from '@/hooks/useCatalog'
import { Container } from '@/components/ui/Container'
import { Link } from '@/lib/navigation'
import { Badge } from '@/components/ui/Badge'
import { HoverMedia } from '@/components/editorial/HoverMedia'
import { SectionHeader } from '@/components/editorial/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

export function ExpertsPreview() {
  const { experts } = useCatalog()
  const preview = experts.filter((item) => item.isListed).slice(0, 4)
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader
            kicker="Experts"
            title="Specialists you can verify — when we have names."
            lede="Gynecology, fertility, pediatrics, nutrition, yoga, lactation, parenting and counselling seats. Until credentials are confirmed, this directory shows labelled placeholders only."
            action={
              <Link to="/experts" className="text-sm font-medium text-navy underline-offset-4 hover:underline">
                Open the directory
              </Link>
            }
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {preview.map((expert, index) => (
            <Reveal key={expert.id} delay={index * 0.04}>
              <li className="overflow-hidden rounded-2xl border border-line bg-white">
                <HoverMedia src={expert.photo} alt="Faculty seat atmosphere, not a verified portrait." className="aspect-[16/10] w-full" width={640} height={400} />
                <div className="p-5">
                  <Badge tone="muted">{expert.speciality}</Badge>
                  <p className="mt-3 font-medium text-ink">{expert.name}</p>
                  <p className="mt-2 text-sm text-slate">{expert.qualification}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
