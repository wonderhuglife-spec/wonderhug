import { loc } from '@/lib/locale'
import { DEFAULT_MEDIA_ASSETS } from '@/data/mediaAssets'
import type { ToolDef } from '@/types/domain'

export const TOOLS: ToolDef[] = [
  {
    id: 'tool-due',
    slug: 'due-date',
    name: loc('Due date calculator', 'ప్రసవ తేదీ లెక్క'),
    description: loc('Estimate a due date from the last period (Naegele). An estimate, not a deadline.', 'చివరి రుతువు నుంచి గడువు. అంచనా, గడువు కాదు.'),
    href: '/tools/due-date',
    stageFit: ['planning', 'ttc', 'pregnant'],
    image: DEFAULT_MEDIA_ASSETS.tool_due.src,
    imageAlt: DEFAULT_MEDIA_ASSETS.tool_due.alt,
  },
  {
    id: 'tool-kicks',
    slug: 'kicks',
    name: loc('Kick counter', 'తన్నుల లెక్క'),
    description: loc('A notebook for movement sessions. Use the method your clinician taught you.', 'కదలిక సెషన్ల నోటుబుక్. వైద్యుడు నేర్పిన పద్ధతి.'),
    href: '/tools/kicks',
    stageFit: ['pregnant', 'birth_prep'],
    image: DEFAULT_MEDIA_ASSETS.tool_kicks.src,
    imageAlt: DEFAULT_MEDIA_ASSETS.tool_kicks.alt,
  },
  {
    id: 'tool-contractions',
    slug: 'contractions',
    name: loc('Contraction timer', 'సంకోచ టైమర్'),
    description: loc('Time waves. This does not diagnose labour.', 'తరంగాల సమయం. ప్రసవ నిర్ధారణ కాదు.'),
    href: '/tools/contractions',
    stageFit: ['pregnant', 'birth_prep'],
    image: DEFAULT_MEDIA_ASSETS.tool_contractions.src,
    imageAlt: DEFAULT_MEDIA_ASSETS.tool_contractions.alt,
  },
  {
    id: 'tool-week',
    slug: 'week-guide',
    name: loc('Pregnancy week guide', 'గర్భ వారపు గైడ్'),
    description: loc('Open the note that matches your week.', 'మీ వారపు గమనిక తెరవండి.'),
    href: '/pregnancy/week-by-week',
    stageFit: ['pregnant', 'birth_prep'],
    image: DEFAULT_MEDIA_ASSETS.journal_garbh.src,
    imageAlt: DEFAULT_MEDIA_ASSETS.journal_garbh.alt,
  },
  {
    id: 'tool-weight',
    slug: 'weight',
    name: loc('Weight log', 'బరువు నమోదు'),
    description: loc('A private log. Trends belong with your clinician, not with shame.', 'గోప్య నమోదు. ధోరణులు వైద్యునివి.'),
    href: '/tools/weight',
    stageFit: ['pregnant', 'new_parent'],
    image: DEFAULT_MEDIA_ASSETS.tool_weight.src,
    imageAlt: DEFAULT_MEDIA_ASSETS.tool_weight.alt,
  },
]
