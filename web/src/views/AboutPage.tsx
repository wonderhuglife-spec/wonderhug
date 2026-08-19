'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TEAM } from '@/data/team'
import { Seo } from '@/components/seo/Seo'
import { Avatar } from '@/components/ui/Avatar'
import { Container } from '@/components/ui/Container'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { cn } from '@/lib/cn'
import { PageHero } from '@/components/editorial/PageHero'

export function AboutPage() {
  const [activeId, setActiveId] = useState(TEAM[0]?.id ?? '')
  const active = TEAM.find((member) => member.id === activeId) ?? TEAM[0]
  const reduce = useReducedMotion()
  const locale = currentLocale()

  return (
    <>
      <Seo title="About" description="WonderHug.Life — Garbh Sanskar and modern wellness for Telugu-speaking families." path="/about" />
      <PageHero
        kicker="WonderHug.Life"
        title="A daily companion from planning to parenting"
        lede="Primary home is Telugu-speaking families in Telangana and Andhra Pradesh. Secondary is pan-India English. WhatsApp (AiSensy) already holds a community of 50,000+ mothers. Official logo and photography replace the lockup when supplied."
        src="/images/placeholder-ai-hero-home.png"
        alt="An expecting couple sitting together in a sunlit family living room."
      />
      {active ? (
        <div className="relative min-h-[28rem] bg-navy">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.id}
              src={active.portrait}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-40"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={reduce ? undefined : { opacity: 0 }}
            />
          </AnimatePresence>
          <Container className="relative grid min-h-[28rem] items-end gap-8 py-12 lg:grid-cols-12">
            <div className="text-white lg:col-span-7">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">{pick(active.role, locale)}</p>
              <p className="mt-2 font-serif text-4xl">{active.name}</p>
              <p className="mt-4 max-w-xl text-white/85">{pick(active.description, locale)}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              {TEAM.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  className={cn('rounded-full')}
                  aria-pressed={member.id === active.id}
                  aria-label={pick(member.role, locale)}
                  onClick={() => setActiveId(member.id)}
                >
                  <Avatar src={member.portrait} alt="" selected={member.id === active.id} />
                </button>
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </>
  )
}
