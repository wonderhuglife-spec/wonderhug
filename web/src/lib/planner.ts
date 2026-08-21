import { PROGRAMS } from '@/data/programs'
import type { Program } from '@/types/domain'

export type PlannerStatus = 'planning' | 'pregnant' | 'parenting'
export type PlannerDuration = 'until_delivery' | 'three_months' | 'monthly'

export const PLANNER_FEATURES: Record<PlannerStatus, string[]> = {
  planning: [
    'Weekly couple worksheets on leave, money and relatives',
    'Kitchen conversations — not a fertility diet',
    'Quiet evening practice you can keep on work nights',
    'WhatsApp prompts. No scores. No success rates',
  ],
  pregnant: [
    'Trimester-aware education that follows a due date you share',
    'Garbh Sanskar as daily practice, not a promise about the child',
    'Birth-preference worksheet to take to your hospital',
    'Clear notes on when this is not the right room — call a clinician',
  ],
  parenting: [
    'First fourteen days: rest, visitors, what is urgent',
    'How to brief a lactation professional — not a feeding protocol',
    'Language for joint-family limits without a scripted fight',
    'Emergency signs stay off-platform and with a hospital',
  ],
}

export function programForPlanner(status: PlannerStatus): Program {
  const slug = status === 'planning' ? 'beej-sanskar' : status === 'pregnant' ? 'womb-care' : 'super-parenting'
  const program = PROGRAMS.find((item) => item.slug === slug && item.isPublished)
  if (!program) throw new Error(`Missing programme for planner status ${status}`)
  return program
}

export function emiPaise(totalPaise: number, parts = 3) {
  return Math.ceil(totalPaise / parts)
}

export function durationLabel(duration: PlannerDuration) {
  if (duration === 'until_delivery') return 'Until delivery'
  if (duration === 'three_months') return '3 months'
  return 'Monthly'
}
