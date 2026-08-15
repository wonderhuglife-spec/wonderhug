import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TOOLS } from '@/data/tools'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { dueDateFromLmp, gestationalWeek, parseIsoDate } from '@/utils/dueDate'

export function ToolsPage() {
  const locale = currentLocale()
  return (
    <>
      <Seo title="Tools" description="Due date, kicks, contractions." path="/tools" />
      <Container className="py-16">
        <Heading as="h1">Tools</Heading>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {TOOLS.map((tool) => (
            <li key={tool.id} className="py-8">
              <Link to={tool.href} className="font-serif text-3xl hover:text-teal-dark">
                {pick(tool.name, locale)}
              </Link>
              <p className="mt-3 max-w-2xl text-slate">{pick(tool.description, locale)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export function DueDateToolPage() {
  const { t } = useTranslation()
  const [lmp, setLmp] = useState('')
  const parsed = parseIsoDate(lmp)
  const due = parsed ? dueDateFromLmp(parsed) : null
  const week = parsed ? gestationalWeek(parsed) : null
  return (
    <>
      <Seo title={t('tools.due')} description={t('tools.due')} path="/tools/due-date" />
      <Container className="max-w-xl py-16">
        <Heading as="h1">{t('tools.due')}</Heading>
        <Text muted className="mt-4">
          Naegele’s rule adds 280 days to the first day of the last period. It is an estimate. Your clinician’s dating scan wins.
        </Text>
        <Label htmlFor="lmp">Last period date</Label>
        <Input id="lmp" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} />
        {due ? (
          <p className="mt-6 text-lg" data-testid="due-result">
            Estimated due date: {due.toISOString().slice(0, 10)} · about week {week}
          </p>
        ) : null}
      </Container>
    </>
  )
}

export function KickToolPage() {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState<number | null>(null)
  return (
    <>
      <Seo title={t('tools.kicks')} description={t('tools.kicks')} path="/tools/kicks" />
      <Container className="max-w-xl py-16">
        <Heading as="h1">{t('tools.kicks')}</Heading>
        <Text muted className="mt-4">
          A notebook. Use the method your clinician taught (often a count-to-10 window). This is not an alarm.
        </Text>
        <p className="mt-8 font-serif text-5xl" data-testid="kick-count">
          {count}
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            onClick={() => {
              if (!started) setStarted(Date.now())
              setCount((n) => n + 1)
            }}
          >
            Count a movement
          </Button>
          <Button variant="secondary" onClick={() => { setCount(0); setStarted(null) }}>
            Reset
          </Button>
        </div>
        {started ? <p className="mt-4 text-sm text-slate">Session started {new Date(started).toLocaleTimeString()}</p> : null}
      </Container>
    </>
  )
}

export function ContractionToolPage() {
  const { t } = useTranslation()
  const [start, setStart] = useState<number | null>(null)
  const [log, setLog] = useState<{ start: number; end: number }[]>([])
  const last = log[log.length - 1]
  const gap = useMemo(() => {
    if (log.length < 2) return null
    return Math.round((log[log.length - 1].start - log[log.length - 2].start) / 60000)
  }, [log])
  return (
    <>
      <Seo title={t('tools.contractions')} description={t('tools.contractions')} path="/tools/contractions" />
      <Container className="max-w-xl py-16">
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
                setLog((rows) => [...rows, { start, end: Date.now() }])
                setStart(null)
              }}
            >
              Wave end
            </Button>
          )}
        </div>
        {last ? (
          <p className="mt-6">
            Last length {Math.round((last.end - last.start) / 1000)}s
            {gap != null ? ` · start-to-start ${gap} min` : ''}
          </p>
        ) : null}
      </Container>
    </>
  )
}

export function WeightToolPage() {
  const [rows, setRows] = useState<{ date: string; kg: string }[]>([])
  const [kg, setKg] = useState('')
  return (
    <>
      <Seo title="Weight log" description="Private weight log" path="/tools/weight" />
      <Container className="max-w-xl py-16">
        <Heading as="h1">Weight log</Heading>
        <Text muted className="mt-4">
          Stored on this device until you sign in. Trends belong with your clinician.
        </Text>
        <Label htmlFor="kg">Kilograms</Label>
        <Input id="kg" value={kg} onChange={(e) => setKg(e.target.value)} />
        <Button
          className="mt-4"
          onClick={() => {
            if (!kg) return
            setRows((r) => [...r, { date: new Date().toISOString(), kg }])
            setKg('')
          }}
        >
          Save
        </Button>
        <ul className="mt-6">
          {rows.map((row) => (
            <li key={row.date}>
              {row.date.slice(0, 10)} · {row.kg} kg
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
