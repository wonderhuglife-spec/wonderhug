'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from '@/lib/navigation'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Media } from '@/components/media/Media'
import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { lessonBySlug, programBySlug } from '@/data/programs'
import { EXPERTS } from '@/data/experts'
import {
  allLessonsComplete,
  isEnrolled,
  loadProgress,
  programProgress,
  saveProgress,
} from '@/services/lms'
import { downloadCertificatePdf } from '@/lib/certificatePdf'
import { Reveal } from '@/components/motion/Reveal'

export function LearnPlayerPage({
  programSlug,
  lessonSlug,
}: {
  programSlug: string
  lessonSlug?: string
}) {
  const program = programBySlug(programSlug)
  const locale = currentLocale()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [enrolled, setEnrolled] = useState(false)
  const lesson = program && lessonSlug ? lessonBySlug(program, lessonSlug) : program?.lessons[0]
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (program) setEnrolled(isEnrolled(program.slug))
  }, [program])

  useEffect(() => {
    setTick((n) => n + 1)
  }, [lesson?.id, enrolled])

  useEffect(() => {
    if (!lesson || !enrolled) return
    const saved = loadProgress()[lesson.id]
    const el = mediaRef.current
    if (el && saved?.positionSeconds) {
      el.currentTime = saved.positionSeconds
    }
  }, [lesson, enrolled])

  const progress = program ? programProgress(program) : { done: 0, total: 1, ratio: 0 }
  const complete = program ? allLessonsComplete(program) : false

  const modules = useMemo(() => {
    if (!program) return []
    return [...program.modules].sort((a, b) => a.displayOrder - b.displayOrder)
  }, [program])

  if (!program) {
    return (
      <Container className="py-20">
        <EmptyState title="Programme not found" description="" />
      </Container>
    )
  }

  const name = pick(program.name, locale)
  const expert = EXPERTS.find((item) => item.slug === program.instructorSlug)

  return (
    <>
      <Seo title={`${name} — learn`} description={pick(program.summary, locale)} path={`/learn/${program.slug}`} />
      <Container className="py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple">Learning</p>
        <Heading as="h1" className="mt-3">
          {lesson ? pick(lesson.title, locale) : name}
        </Heading>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-canvas" aria-label="Programme progress">
          <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${Math.round(progress.ratio * 100)}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate">
          {progress.done} / {progress.total} lessons
        </p>

        {!enrolled ? (
          <div className="mt-10 rounded-3xl border border-line bg-white p-8">
            <Text muted>
              Lessons open after enrolment. Demo checkout stores access on this device; a signed-in account syncs to Supabase when keys are present.
            </Text>
            {!user ? (
              <p className="mt-3 text-sm text-slate">
                <Link to="/signin" className="underline">
                  Sign in
                </Link>{' '}
                to keep progress across devices.
              </p>
            ) : null}
            <ButtonLink className="mt-6" to={`/programs/${program.slug}`}>
              View programme and enrol
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <nav aria-label="Curriculum" className="rounded-3xl border border-line bg-white p-4">
                {modules.map((mod) => (
                  <div key={mod.id} className="mb-4">
                    <p className="px-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-dark">{pick(mod.title, locale)}</p>
                    <ul className="mt-2" key={tick}>
                      {program.lessons
                        .filter((item) => item.moduleId === mod.id)
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                        .map((item) => {
                          const done = Boolean(loadProgress()[item.id]?.completedAt)
                          return (
                            <li key={item.id}>
                              <Link
                                to={`/learn/${program.slug}/${item.slug}`}
                                className={`block rounded-xl px-3 py-2 text-sm hover:bg-teal-soft ${item.id === lesson?.id ? 'bg-teal-soft font-medium text-purple' : 'text-ink'}`}
                              >
                                {pick(item.title, locale)}
                                {done ? ' · done' : ''}
                              </Link>
                            </li>
                          )
                        })}
                    </ul>
                    {mod.quiz ? <ModuleQuiz moduleId={mod.id} quiz={mod.quiz} /> : null}
                  </div>
                ))}
              </nav>
            </aside>
            <div className="lg:col-span-8">
              {lesson ? (
                <Reveal>
                  {lesson.kind === 'video' && lesson.mediaUrl ? (
                    <video
                      key={lesson.id}
                      ref={(el) => {
                        mediaRef.current = el
                      }}
                      className="aspect-video w-full rounded-3xl bg-navy"
                      controls
                      src={lesson.mediaUrl}
                      poster={program.coverImage}
                      onTimeUpdate={(event) => saveProgress(lesson.id, { positionSeconds: Math.floor(event.currentTarget.currentTime) })}
                    />
                  ) : null}
                  {lesson.kind === 'audio' && lesson.mediaUrl ? (
                    <div className="rounded-3xl border border-line bg-white p-6">
                      <Media src={program.coverImage} alt={program.coverImageAlt} className="mb-4 aspect-[16/9] w-full rounded-2xl object-cover" />
                      <audio
                        key={lesson.id}
                        ref={(el) => {
                          mediaRef.current = el
                        }}
                        className="w-full"
                        controls
                        src={lesson.mediaUrl}
                        onTimeUpdate={(event) => saveProgress(lesson.id, { positionSeconds: Math.floor(event.currentTarget.currentTime) })}
                      />
                    </div>
                  ) : null}
                  {lesson.kind === 'text' ? (
                    <Media src={program.coverImage} alt={program.coverImageAlt} className="mb-6 aspect-[16/9] w-full rounded-3xl object-cover" />
                  ) : null}
                  {pick(lesson.body, locale)
                    .split('\n\n')
                    .map((para) => (
                      <p key={para.slice(0, 24)} className="mt-5 text-lg leading-relaxed text-ink">
                        {para}
                      </p>
                    ))}
                  {lesson.resourceUrl ? (
                    <p className="mt-4">
                      <a className="underline" href={lesson.resourceUrl} download>
                        Downloadable resource
                      </a>
                    </p>
                  ) : null}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      onClick={() => {
                        saveProgress(lesson.id, { completedAt: new Date().toISOString() })
                        toast('Lesson marked complete')
                        setTick((n) => n + 1)
                      }}
                    >
                      Mark complete
                    </Button>
                    {complete ? (
                      <Button
                        variant="teal"
                        onClick={() => {
                          downloadCertificatePdf({
                            programName: name,
                            userName: user?.email || user?.phone || 'WonderHug learner',
                            date: new Date().toISOString().slice(0, 10),
                          })
                          toast('Certificate downloaded')
                        }}
                      >
                        Download certificate
                      </Button>
                    ) : null}
                    <Button variant="secondary" onClick={() => navigate(`/programs/${program.slug}`)}>
                      Programme page
                    </Button>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        )}
        {expert ? (
          <p className="mt-10 text-sm text-slate">
            Faculty seat:{' '}
            <Link to={`/experts/${expert.slug}`} className="underline">
              {expert.name}
            </Link>
            . Named credentials publish after verification.
          </p>
        ) : null}
        <aside className="mt-8 rounded-2xl bg-canvas p-6 text-sm text-slate">{MEDICAL_DISCLAIMER}</aside>
      </Container>
    </>
  )
}

function ModuleQuiz({
  moduleId,
  quiz,
}: {
  moduleId: string
  quiz: NonNullable<import('@/types/domain').ProgramModule['quiz']>
}) {
  const locale = currentLocale()
  const [choice, setChoice] = useState<number | null>(null)
  return (
    <div className="mt-3 rounded-2xl bg-canvas p-3 text-sm" data-testid={`quiz-${moduleId}`}>
      <p className="font-medium">{pick(quiz.question, locale)}</p>
      <ul className="mt-2 space-y-1">
        {quiz.options.map((option, index) => (
          <li key={option.en}>
            <button
              type="button"
              className="w-full rounded-lg px-2 py-1 text-left hover:bg-white"
              onClick={() => setChoice(index)}
            >
              {pick(option, locale)}
            </button>
          </li>
        ))}
      </ul>
      {choice != null ? (
        <p className="mt-2 text-slate">
          {choice === quiz.answerIndex ? 'That matches the programme note. ' : 'Not quite — '}
          {pick(quiz.explanation, locale)}
        </p>
      ) : null}
    </div>
  )
}
