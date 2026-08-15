import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TEAM } from '@/data/team'
import { Seo } from '@/components/seo/Seo'
import { Avatar } from '@/components/ui/Avatar'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/lib/cn'

export function AboutPage() {
  const [activeId, setActiveId] = useState(TEAM[0]?.id ?? '')
  const active = TEAM.find((member) => member.id === activeId) ?? TEAM[0]
  const reduce = useReducedMotion()

  return (
    <>
      <Seo
        title="About"
        description="Meet the people behind WonderHug — named profiles publish after verification."
        path="/about"
      />
      <header className="py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">About</p>
          <Heading as="h1" className="mt-3 max-w-3xl">
            A trusted daily companion from preparing for pregnancy to raising a child.
          </Heading>
          <Text muted className="mt-5 max-w-2xl text-lg">
            WonderHug.Life is being built as a website and a native app with one backend. We will not fill this page
            with invented biographies.
          </Text>
        </Container>
      </header>
      <section className="pb-20" aria-labelledby="team-heading">
        <Container>
          <Heading as="h2" id="team-heading">
            Meet the people behind WonderHug
          </Heading>
          <Text muted className="mt-3 max-w-xl">
            Select a role. The portrait crossfades. Names stay “To be announced” until WonderHug supplies verified data.
          </Text>
        </Container>
        {active ? (
          <div className="relative mt-10 min-h-[28rem] overflow-hidden bg-navy">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.portrait}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.45 }}
              />
            </AnimatePresence>
            <Container className="relative grid min-h-[28rem] items-end gap-8 py-12 lg:grid-cols-12">
              <div className="text-white lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + '-copy'}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35 }}
                  >
                    <p className="text-sm uppercase tracking-[0.18em] text-white/70">{active.role}</p>
                    <p className="mt-2 font-serif text-4xl">{active.name}</p>
                    <p className="mt-4 max-w-xl text-white/85">{active.description}</p>
                    <p className="mt-4 text-xs text-white/60">{active.dataStatus}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                {TEAM.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    className={cn('rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white')}
                    aria-pressed={member.id === active.id}
                    aria-label={`Show ${member.role}`}
                    onClick={() => setActiveId(member.id)}
                  >
                    <Avatar src={member.portrait} alt="" selected={member.id === active.id} />
                  </button>
                ))}
              </div>
            </Container>
          </div>
        ) : null}
      </section>
    </>
  )
}
