import type { Program, ProgramLesson } from '@/types/domain'
import { programAccessFromOrders } from '@/services/checkout'
import { supabase } from '@/lib/supabase'
import { PROGRAMS } from '@/data/programs'

const PROGRESS_KEY = 'wonderhug.lessonProgress'
const ENROLL_KEY = 'wonderhug.enrollments'

export interface LessonProgress {
  lessonId: string
  positionSeconds: number
  completedAt: string | null
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') as T ?? fallback
  } catch {
    return fallback
  }
}

export function localEnrollments(): string[] {
  const extra = readJson<string[]>(ENROLL_KEY, [])
  return [...new Set([...programAccessFromOrders(), ...extra])]
}

export function enrollLocal(programSlug: string) {
  const next = [...new Set([...localEnrollments(), programSlug])]
  localStorage.setItem(ENROLL_KEY, JSON.stringify(next))
}

export function isEnrolled(programSlug: string) {
  return localEnrollments().includes(programSlug)
}

export function loadProgress(): Record<string, LessonProgress> {
  return readJson<Record<string, LessonProgress>>(PROGRESS_KEY, {})
}

export function saveProgress(lessonId: string, patch: Partial<LessonProgress>) {
  const all = loadProgress()
  const prev = all[lessonId] ?? { lessonId, positionSeconds: 0, completedAt: null }
  const next = { ...prev, ...patch, lessonId }
  all[lessonId] = next
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all))
  if (supabase) {
    void supabase.from('lesson_progress').upsert({
      lesson_id: lessonId,
      position_seconds: next.positionSeconds,
      completed_at: next.completedAt,
    })
  }
  return next
}

export function programProgress(program: Program) {
  const all = loadProgress()
  const total = program.lessons.length || 1
  const done = program.lessons.filter((lesson) => all[lesson.id]?.completedAt).length
  return { done, total, ratio: done / total }
}

export function allLessonsComplete(program: Program) {
  const { done, total } = programProgress(program)
  return done >= total && total > 0
}

export function nextLesson(program: Program, current?: ProgramLesson) {
  const sorted = [...program.lessons].sort((a, b) => a.displayOrder - b.displayOrder)
  if (!current) return sorted[0]
  const idx = sorted.findIndex((item) => item.id === current.id)
  return sorted[idx + 1] ?? null
}

export function programsForLearn() {
  return PROGRAMS.filter((item) => item.isPublished)
}
