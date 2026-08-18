'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { TOOLS } from '@/data/tools'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Media } from '@/components/media/Media'
import { Reveal } from '@/components/motion/Reveal'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { dueDateFromLmp, gestationalWeek, parseIsoDate } from '@/utils/dueDate'
import { useAuth } from '@/hooks/useAuth'
import { useCmsImage } from '@/hooks/useCmsImages'
import { SignInToSaveNote, appendTracker, listTracker } from '@/services/trackers'
import { useToast } from '@/components/ui/Toast'
import { PageHero } from '@/components/editorial/PageHero'

export function ToolsPage() {
  const locale = currentLocale()
  return (
    <>
      <Seo title="Tools" description="Due date, kicks, contractions, weight." path="/tools" />
      <PageHero
        kicker="Educational helpers"
        title="Tools"
        lede="Due date, kick counts, contractions and weight — notebooks for this week, not a diagnosis."
        src="/images/placeholder-ai-tool-due.png"
        alt="A family calendar and pregnancy journal for due-date and kick tools."
      />
      <Container className="py-16">
        <ul className="grid gap-6 md:grid-cols-2">
          {TOOLS.filter((tool) => tool.href.startsWith('/tools/')).map((tool) => (
            <li key={tool.id}>
              <Link to={tool.href} className="block overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lift">
                <Media src={tool.image} alt={tool.imageAlt} className="aspect-[16/9] w-full object-cover" />
                <span className="block p-8">
                  <span className="font-serif text-3xl">{pick(tool.name, locale)}</span>
                  <p className="mt-3 text-slate">{pick(tool.description, locale)}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export function DueDateToolPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const toast = useToast()
  const art = useCmsImage('tool_due')
  const [lmp, setLmp] = useState('')
  const parsed = parseIsoDate(lmp)
  const due = parsed ? dueDateFromLmp(parsed) : null
  const week = parsed ? gestationalWeek(parsed) : null

  useEffect(() => {
    const last = listTracker('due').at(-1)
    if (last && typeof last.payload.lmp === 'string') setLmp(last.payload.lmp)
  }, [])

  return (
    <>
      <Seo title={t('tools.due')} description={t('tools.due')} path="/tools/due-date" />
      <Container className="max-w-2xl py-16">
        <Media src={art.src} alt={art.alt} className="mb-8 aspect-[16/9] w-full rounded-3xl object-cover" />
        <Heading as="h1">{t('tools.due')}</Heading>
        <Text muted className="mt-4">
          Naegele’s rule adds 280 days to the first day of the last period. It is an estimate. Your clinician’s dating scan wins.
        </Text>
        <Label htmlFor="lmp">Last period date</Label>
        <Input id="lmp" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} />
        {due && week ? (
          <Reveal className="mt-8">
            <p className="text-lg" data-testid="due-result">
              Estimated due date: {due.toISOString().slice(0, 10)} · about week {week}
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              <li className={`rounded-2xl border p-4 ${week <= 13 ? 'border-teal bg-teal-soft' : 'border-line'}`}>
                <p className="text-xs uppercase tracking-[0.14em] text-slate">Trimester 1</p>
                <p className="mt-1 font-medium">Weeks 1–13</p>
              </li>
              <li className={`rounded-2xl border p-4 ${week >= 14 && week <= 27 ? 'border-teal bg-teal-soft' : 'border-line'}`}>
                <p className="text-xs uppercase tracking-[0.14em] text-slate">Trimester 2</p>
                <p className="mt-1 font-medium">Weeks 14–27</p>
              </li>
              <li className={`rounded-2xl border p-4 ${week >= 28 ? 'border-teal bg-teal-soft' : 'border-line'}`}>
                <p className="text-xs uppercase tracking-[0.14em] text-slate">Trimester 3</p>
                <p className="mt-1 font-medium">Weeks 28–40+</p>
              </li>
            </ol>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-canvas">
              <div className="h-full rounded-full bg-purple" style={{ width: `${Math.min(100, (week / 40) * 100)}%` }} />
            </div>
            <p className="mt-4">
              <Link className="font-medium text-purple underline" to={`/pregnancy/week/${week}`}>
                Open this week’s content hub
              </Link>
            </p>
            <Button
              className="mt-6"
              variant="secondary"
              onClick={() => {
                appendTracker('due', { lmp, due: due.toISOString(), week }, Boolean(user))
                toast('Due-date estimate saved')
              }}
            >
              Save this estimate
            </Button>
          </Reveal>
        ) : null}
        <SignInToSaveNote signedIn={Boolean(user)} />
      </Container>
    </>
  )
}

export function KickToolPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const toast = useToast()
  const art = useCmsImage('tool_kicks')
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState<number | null>(null)
  const [history, setHistory] = useState<{ at: string; count: number }[]>([])

  useEffect(() => {
    setHistory(
      listTracker('kicks')
        .filter((row) => typeof row.payload.count === 'number')
        .map((row) => ({ at: row.at, count: Number(row.payload.count) })),
    )
  }, [])

  const max = Math.max(10, ...history.map((row) => row.count), count)
  const avg = history.length ? history.reduce((sum, row) => sum + row.count, 0) / history.length : null
  const quiet = avg != null && count > 0 && count < avg * 0.5

  return (
    <>
      <Seo title={t('tools.kicks')} description={t('tools.kicks')} path="/tools/kicks" />
      <Container className="max-w-2xl py-16">
        <Media src={art.src} alt={art.alt} className="mb-8 aspect-[16/9] w-full rounded-3xl object-cover" />
        <Heading as="h1">{t('tools.kicks')}</Heading>
        <Text muted className="mt-4">
          A notebook. Use the method your clinician taught (often a count-to-10 window). This is not an alarm and not a diagnosis.
        </Text>
        <p className="mt-8 font-serif text-5xl" data-testid="kick-count">
          {count}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              if (!started) setStarted(Date.now())
              setCount((n) => n + 1)
            }}
          >
            Count a movement
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (count > 0) {
                appendTracker('kicks', { count, started }, Boolean(user))
                setHistory((rows) => [...rows, { at: new Date().toISOString(), count }])
                toast('Session saved')
              }
              setCount(0)
              setStarted(null)
            }}
          >
            Save session
          </Button>
        </div>
        {started ? <p className="mt-4 text-sm text-slate">Session started {new Date(started).toLocaleTimeString()}</p> : null}
        {quiet ? (
          <p className="mt-6 rounded-2xl bg-canvas p-4 text-sm text-slate">
            This session is quieter than your recent average on this device. Patterns vary. If something feels different from what is usual for you, talk with your doctor. WonderHug cannot tell you whether a baby is well.
          </p>
        ) : null}
        {history.length > 0 ? (
          <div className="mt-10">
            <p className="font-medium">Kicks per saved session</p>
            <div className="mt-4 flex h-40 items-end gap-2">
              {history.slice(-12).map((row) => (
                <div
                  key={row.at}
                  className="flex-1 rounded-t-lg bg-teal/70"
                  style={{ height: `${Math.max(8, (row.count / max) * 100)}%` }}
                  title={`${row.count}`}
                />
              ))}
            </div>
          </div>
        ) : null}
        <SignInToSaveNote signedIn={Boolean(user)} />
      </Container>
    </>
  )
}

export function ContractionToolPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const toast = useToast()
  const art = useCmsImage('tool_contractions')
  const [start, setStart] = useState<number | null>(null)
  const [log, setLog] = useState<{ start: number; end: number }[]>([])

  const stats = useMemo(() => {
    if (log.length === 0) return null
    const durations = log.map((row) => (row.end - row.start) / 1000)
    const avgDur = durations.reduce((a, b) => a + b, 0) / durations.length
    const gaps =
      log.length < 2
        ? []
        : log.slice(1).map((row, i) => (row.start - log[i].start) / 60000)
    const avgGap = gaps.length ? gaps.reduce((a, b) => a + b, 0) / gaps.length : null
    const lastHour = log.filter((row) => Date.now() - row.start < 60 * 60 * 1000)
    const rule511 =
      lastHour.length >= 6 &&
      avgDur >= 50 &&
      avgGap != null &&
      avgGap <= 5
    return { avgDur, avgGap, rule511 }
  }, [log])

  return (
    <>
      <Seo title={t('tools.contractions')} description={t('tools.contractions')} path="/tools/contractions" />
      <Container className="max-w-2xl py-16">
        <Media src={art.src} alt={art.alt} className="mb-8 aspect-[16/9] w-full rounded-3xl object-cover" />
        <Heading as="h1">{t('tools.contractions')}</Heading>
        <Text muted className="mt-4">
          Time waves. This does not diagnose labour. Call your hospital with the pattern they asked you to report.
        </Text>
        <div className="mt-8 flex gap-3">
          {!start ? (
            <Button onClick={() => setStart(Date.now())}>Wave start</Button>
          ) : (
            <Button
              onClick={() => {
                const end = Date.now()
                setLog((rows) => [...rows, { start, end }])
                setStart(null)
              }}
            >
              Wave end
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => {
              if (log.length) {
                appendTracker('contractions', { log }, Boolean(user))
                toast('Contraction log saved')
              }
            }}
          >
            Save log
          </Button>
        </div>
        {stats ? (
          <div className="mt-6 rounded-2xl border border-line p-5">
            <p>
              Running average length {Math.round(stats.avgDur)}s
              {stats.avgGap != null ? ` · average start-to-start ${stats.avgGap.toFixed(1)} min` : ''}
            </p>
            {stats.rule511 ? (
              <p className="mt-4 rounded-xl bg-canvas p-4 text-sm text-navy">
                This notebook is near a pattern people often call the “5-1-1” guidance (waves about a minute long, about five minutes apart, lasting around an hour). That is information, not a medical directive. Contact your provider or hospital with the plan they already gave you.
              </p>
            ) : null}
          </div>
        ) : null}
        <SignInToSaveNote signedIn={Boolean(user)} />
      </Container>
    </>
  )
}

export function WeightToolPage() {
  const { user } = useAuth()
  const toast = useToast()
  const art = useCmsImage('tool_weight')
  const [rows, setRows] = useState<{ date: string; kg: number }[]>([])
  const [kg, setKg] = useState('')
  const [baseline, setBaseline] = useState('')

  useEffect(() => {
    const stored = listTracker('weight')
      .map((row) => ({ date: row.at, kg: Number(row.payload.kg) }))
      .filter((row) => Number.isFinite(row.kg))
    setRows(stored)
    const lastBase = stored[0]
    if (lastBase) setBaseline(String(lastBase.kg))
  }, [])

  const startKg = Number(baseline)
  const maxKg = Math.max(startKg || 0, ...rows.map((row) => row.kg), 1)
  const minKg = Math.min(startKg || maxKg, ...rows.map((row) => row.kg), maxKg)

  return (
    <>
      <Seo title="Weight log" description="Private weight log" path="/tools/weight" />
      <Container className="max-w-2xl py-16">
        <Media src={art.src} alt={art.alt} className="mb-8 aspect-[16/9] w-full rounded-3xl object-cover" />
        <Heading as="h1">Weight log</Heading>
        <Text muted className="mt-4">
          A private notebook. The shaded band is a commonly discussed total-gain range for many singleton pregnancies (about 11–16 kg across forty weeks). Your clinician’s range may differ. This is not a diagnosis.
        </Text>
        <Label htmlFor="base">Starting weight (kg), if you know it</Label>
        <Input id="base" value={baseline} onChange={(e) => setBaseline(e.target.value)} />
        <Label htmlFor="kg">Today (kg)</Label>
        <Input id="kg" value={kg} onChange={(e) => setKg(e.target.value)} />
        <Button
          className="mt-4"
          onClick={() => {
            const value = Number(kg)
            if (!Number.isFinite(value)) return
            appendTracker('weight', { kg: value, baseline: startKg || null }, Boolean(user))
            setRows((r) => [...r, { date: new Date().toISOString(), kg: value }])
            setKg('')
            toast('Weight saved')
          }}
        >
          Save
        </Button>
        {rows.length > 0 ? (
          <svg viewBox="0 0 320 160" className="mt-8 w-full rounded-2xl border border-line bg-white" role="img" aria-label="Weight over time">
            {Number.isFinite(startKg) && startKg > 0 ? (
              <rect x="0" y={160 - ((startKg + 16 - minKg) / (maxKg + 16 - minKg + 0.01)) * 140 - 10} width="320" height={((5) / (maxKg + 16 - minKg + 0.01)) * 140} fill="#d8f3ef" />
            ) : null}
            <polyline
              fill="none"
              stroke="#79409B"
              strokeWidth="2"
              points={rows
                .map((row, i) => {
                  const x = (i / Math.max(rows.length - 1, 1)) * 300 + 10
                  const y = 150 - ((row.kg - minKg) / (maxKg - minKg + 0.01)) * 130
                  return `${x},${y}`
                })
                .join(' ')}
            />
          </svg>
        ) : null}
        <ul className="mt-6 text-sm text-slate">
          {rows.map((row) => (
            <li key={row.date}>
              {row.date.slice(0, 10)} · {row.kg} kg
            </li>
          ))}
        </ul>
        <SignInToSaveNote signedIn={Boolean(user)} />
      </Container>
    </>
  )
}
