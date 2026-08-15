import type { Tool } from '@/types/domain'

export const TOOLS: Tool[] = [
  {
    id: 'tool-week',
    slug: 'week-guide',
    name: 'Pregnancy week guide',
    description: 'A hub for week-by-week education. Individual week pages will publish as copy is reviewed.',
    href: '/pregnancy/week-by-week',
    stageFit: ['pregnant', 'birth_prep'],
  },
  {
    id: 'tool-checklist',
    slug: 'planning-checklist',
    name: 'Planning checklist',
    description: 'A shared list for appointments, nutrition conversations and household rhythms. Not a medical protocol.',
    href: '/pregnancy-planning',
    stageFit: ['planning', 'ttc'],
  },
  {
    id: 'tool-birth',
    slug: 'birth-preferences',
    name: 'Birth preferences worksheet',
    description: 'Prompts to discuss with your care team. WonderHug does not replace a hospital birth plan.',
    href: '/pregnancy/birth-preparation',
    stageFit: ['pregnant', 'birth_prep'],
  },
  {
    id: 'tool-postpartum',
    slug: 'postpartum-rhythm',
    name: 'Postpartum rhythm',
    description: 'Rest, feeding and visitor boundaries for the first weeks at home.',
    href: '/parenting/newborn',
    stageFit: ['new_parent'],
  },
  {
    id: 'tool-journal',
    slug: 'journey-journal',
    name: 'Journey journal',
    description: 'Private notes that can later sync to your WonderHug profile when accounts are enabled.',
    href: '/start',
    stageFit: ['planning', 'ttc', 'pregnant', 'birth_prep', 'new_parent', 'parenting'],
  },
]
