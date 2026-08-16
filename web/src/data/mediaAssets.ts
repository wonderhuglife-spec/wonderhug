export type MediaAssetKey =
  | 'hero_home'
  | 'journal_planning'
  | 'journal_garbh'
  | 'journal_postpartum'
  | 'journal_heat'
  | 'program_beej'
  | 'program_womb'
  | 'program_parenting'
  | 'tool_due'
  | 'tool_kicks'
  | 'tool_contractions'
  | 'tool_weight'
  | 'shop_journal'
  | 'shop_kitchen'
  | 'community'
  | 'practice'
  | 'faculty_seat'

export interface MediaAsset {
  key: MediaAssetKey
  label: string
  src: string
  alt: string
}

/** Default AI placeholders — every filename and alt is tagged so they are trivial to swap from Admin. */
export const DEFAULT_MEDIA_ASSETS: Record<MediaAssetKey, MediaAsset> = {
  hero_home: {
    key: 'hero_home',
    label: 'Homepage hero atmosphere',
    src: '/images/placeholder-ai-hero-home.png',
    alt: 'placeholder-ai- Warm coral living room light for the WonderHug homepage hero (temporary AI image).',
  },
  journal_planning: {
    key: 'journal_planning',
    label: 'Journal — preparing together',
    src: '/images/placeholder-ai-journal-planning.png',
    alt: 'placeholder-ai- Couple at a kitchen table at dusk, temporary AI illustration for a planning article.',
  },
  journal_garbh: {
    key: 'journal_garbh',
    label: 'Journal — Garbh Sanskar',
    src: '/images/placeholder-ai-journal-garbh.png',
    alt: 'placeholder-ai- Quiet window-side rest with music, temporary AI illustration for Garbh Sanskar.',
  },
  journal_postpartum: {
    key: 'journal_postpartum',
    label: 'Journal — fourth trimester',
    src: '/images/placeholder-ai-journal-postpartum.png',
    alt: 'placeholder-ai- Postpartum rest in a family home, temporary AI illustration.',
  },
  journal_heat: {
    key: 'journal_heat',
    label: 'Journal — Telangana heat',
    src: '/images/placeholder-ai-journal-heat.png',
    alt: 'placeholder-ai- Shaded courtyard and water pot, temporary AI illustration for heat and rest.',
  },
  program_beej: {
    key: 'program_beej',
    label: 'Programme — Beej Sanskar cover',
    src: '/images/placeholder-ai-program-beej.png',
    alt: 'placeholder-ai- Seeds and flowers in a clay bowl, temporary AI cover for Beej Sanskar.',
  },
  program_womb: {
    key: 'program_womb',
    label: 'Programme — Womb Care cover',
    src: '/images/placeholder-ai-program-womb.png',
    alt: 'placeholder-ai- Garden rest during pregnancy, temporary AI cover for Womb Care.',
  },
  program_parenting: {
    key: 'program_parenting',
    label: 'Programme — Super Parenting cover',
    src: '/images/placeholder-ai-program-parenting.png',
    alt: 'placeholder-ai- Parent holding an infant, temporary AI cover for Super Parenting.',
  },
  tool_due: {
    key: 'tool_due',
    label: 'Tool — due date',
    src: '/images/placeholder-ai-tool-due.png',
    alt: 'placeholder-ai- Calendar and lamp, temporary AI illustration for the due-date tool.',
  },
  tool_kicks: {
    key: 'tool_kicks',
    label: 'Tool — kick counter',
    src: '/images/placeholder-ai-tool-kicks.png',
    alt: 'placeholder-ai- Movement-count notebook, temporary AI illustration for the kick counter.',
  },
  tool_contractions: {
    key: 'tool_contractions',
    label: 'Tool — contraction timer',
    src: '/images/placeholder-ai-tool-contractions.png',
    alt: 'placeholder-ai- Clock and rest, temporary AI illustration for the contraction timer.',
  },
  tool_weight: {
    key: 'tool_weight',
    label: 'Tool — weight log',
    src: '/images/placeholder-ai-tool-weight.png',
    alt: 'placeholder-ai- Kitchen scale and notebook, temporary AI illustration for the weight log.',
  },
  shop_journal: {
    key: 'shop_journal',
    label: 'Shop — pregnancy journal',
    src: '/images/placeholder-ai-shop-journal.png',
    alt: 'placeholder-ai- Linen journal and jasmine, temporary AI product image.',
  },
  shop_kitchen: {
    key: 'shop_kitchen',
    label: 'Shop — kitchen cards',
    src: '/images/placeholder-ai-shop-kitchen.png',
    alt: 'placeholder-ai- Seasonal kitchen still life, temporary AI product image.',
  },
  community: {
    key: 'community',
    label: 'Community atmosphere',
    src: '/images/placeholder-ai-community.png',
    alt: 'placeholder-ai- Soft gathering of mothers, temporary AI illustration.',
  },
  practice: {
    key: 'practice',
    label: 'Practice library',
    src: '/images/placeholder-ai-practice.png',
    alt: 'placeholder-ai- Warm oil and lamp for Garbh Sanskar practice, temporary AI illustration.',
  },
  faculty_seat: {
    key: 'faculty_seat',
    label: 'Faculty seat atmosphere',
    src: '/images/placeholder-ai-faculty-seat.png',
    alt: 'placeholder-ai- Empty chair by a window, temporary AI faculty-seat image — not a real portrait.',
  },
}

export const MEDIA_ASSET_LIST = Object.values(DEFAULT_MEDIA_ASSETS)
