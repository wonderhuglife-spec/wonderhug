'use client'

import { useMemo, useState } from 'react'
import { Link, useNavigate } from '@/lib/navigation'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/components/ui/Toast'
import { formatInr } from '@/lib/constants'
import { currentLocale } from '@/i18n'
import { pick } from '@/lib/locale'
import { cn } from '@/lib/cn'
import {
  PLANNER_FEATURES,
  durationLabel,
  emiPaise,
  programForPlanner,
  type PlannerDuration,
  type PlannerStatus,
} from '@/lib/planner'

const STATUSES: { id: PlannerStatus; label: string; hint: string }[] = [
  { id: 'planning', label: 'Planning', hint: 'Preparing or trying to conceive' },
  { id: 'pregnant', label: 'Pregnant', hint: 'Share a last period if you have one' },
  { id: 'parenting', label: 'Parenting', hint: 'Fourth trimester and after' },
]

const DURATIONS: PlannerDuration[] = ['until_delivery', 'three_months', 'monthly']

export function JourneyPlannerPage() {
  const locale = currentLocale()
  const navigate = useNavigate()
  const { add } = useCart()
  const toast = useToast()
  const [status, setStatus] = useState<PlannerStatus>('planning')
  const [duration, setDuration] = useState<PlannerDuration>('three_months')
  const [lmp, setLmp] = useState('')
  const [payMode, setPayMode] = useState<'full' | 'emi'>('full')

  const program = useMemo(() => programForPlanner(status), [status])
  const name = pick(program.name, locale)
  const emi = emiPaise(program.pricePaise)
  const features = PLANNER_FEATURES[status]

  function enrol() {
    add({
      kind: 'program',
      id: program.id,
      slug: program.slug,
      title: name,
      unitPaise: program.pricePaise,
    })
    toast(payMode === 'emi' ? 'Added at the full programme price — three EMI is a display, not a split charge yet' : 'Added to cart')
    navigate('/checkout')
  }

  return (
    <>
      <Seo
        title="Journey planner"
        description="Choose planning, pregnancy or parenting, then enrol in the matching WonderHug programme."
        path="/journey/planner"
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">Planner · payment</p>
          <h1 className="mt-3 font-serif text-display">Choose your plan</h1>
          <p className="mt-4 max-w-xl text-slate">
            This is wellness education priced in Indian rupees. It does not treat infertility, replace antenatal care, or split a live EMI charge until Razorpay EMI is configured. Three EMI amounts are shown so you can compare.
          </p>

          <fieldset className="mt-10">
            <legend className="text-sm font-medium text-ink">Your status</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {STATUSES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left',
                    status === item.id ? 'border-teal bg-teal-soft' : 'border-line bg-white hover:border-navy/30',
                  )}
                  onClick={() => setStatus(item.id)}
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="mt-1 block text-sm text-slate">{item.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {status === 'pregnant' ? (
            <div className="mt-8 max-w-sm">
              <Label htmlFor="lmp">Last menstrual period</Label>
              <Input id="lmp" type="date" value={lmp} onChange={(event) => setLmp(event.target.value)} />
              <p className="mt-2 text-sm text-slate">Optional. Used only on this page. A dating scan still leads.</p>
            </div>
          ) : null}

          <fieldset className="mt-8">
            <legend className="text-sm font-medium text-ink">Plan length</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {DURATIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    'min-h-11 rounded-full px-4 text-sm font-medium',
                    duration === item ? 'bg-navy text-white' : 'bg-canvas text-slate hover:text-ink',
                  )}
                  onClick={() => setDuration(item)}
                >
                  {durationLabel(item)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate">
              {duration === 'until_delivery'
                ? 'Womb Care follows a pregnancy when you share a due date. Planning and parenting programmes still run their published length.'
                : duration === 'monthly'
                  ? 'Monthly here means you can view the price as three EMI amounts. Checkout still records the full programme price.'
                  : 'Three months of structured lessons and WhatsApp prompts for the programme that matches your status.'}
            </p>
          </fieldset>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-line bg-white p-6 shadow-lift">
            <p className="text-xs uppercase tracking-[0.14em] text-teal-dark">Recommended</p>
            <h2 className="mt-2 font-serif text-3xl">{name}</h2>
            <p className="mt-3 text-sm text-slate">{pick(program.summary, locale)}</p>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                type="button"
                className={cn('rounded-2xl border px-3 py-3 text-left', payMode === 'full' ? 'border-teal bg-teal-soft' : 'border-line')}
                onClick={() => setPayMode('full')}
              >
                <span className="block text-xs uppercase tracking-[0.12em] text-slate">Pay in full</span>
                <span className="mt-1 block font-semibold">{formatInr(program.pricePaise, locale)}</span>
              </button>
              <button
                type="button"
                className={cn('rounded-2xl border px-3 py-3 text-left', payMode === 'emi' ? 'border-teal bg-teal-soft' : 'border-line')}
                onClick={() => setPayMode('emi')}
              >
                <span className="block text-xs uppercase tracking-[0.12em] text-slate">3 EMI</span>
                <span className="mt-1 block font-semibold">{formatInr(emi, locale)} × 3</span>
              </button>
            </div>
            {lmp && status === 'pregnant' ? (
              <p className="mt-4 text-sm text-slate">Last period noted: {lmp}</p>
            ) : null}
            <Button className="mt-6 w-full" onClick={enrol}>
              Continue to checkout
            </Button>
            <Link to={`/programs/${program.slug}`} className="mt-4 block text-center text-sm text-teal-dark">
              Read the full programme →
            </Link>
          </div>
        </aside>
      </Container>
    </>
  )
}
