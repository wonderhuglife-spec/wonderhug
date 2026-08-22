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
  | 'chapter_learning'
  | 'chapter_preparing'

export interface MediaAsset {
  key: MediaAssetKey
  label: string
  src: string
  alt: string
}

/**
 * Photoreal family photographs — CMS can still swap any slot.
 * Tagged placeholder-ai- in docs until an official shoot (Indian home, Garbh Sanskar
 * or pregnancy-planning context — not generic yoga stock). Do not point components at Unsplash.
 */
export const DEFAULT_MEDIA_ASSETS: Record<MediaAssetKey, MediaAsset> = {
  hero_home: {
    key: 'hero_home',
    label: 'Homepage hero — expecting together',
    src: '/images/photo-hero-home.png',
    alt: 'An expecting couple sitting together in a sunlit family living room.',
  },
  journal_planning: {
    key: 'journal_planning',
    label: 'Journal — preparing together',
    src: '/images/photo-planning.png',
    alt: 'A couple planning pregnancy together over a notebook at the kitchen table.',
  },
  journal_garbh: {
    key: 'journal_garbh',
    label: 'Journal — Garbh Sanskar',
    src: '/images/photo-garbh-rest.png',
    alt: 'A pregnant woman resting in a home courtyard with quiet music nearby.',
  },
  journal_postpartum: {
    key: 'journal_postpartum',
    label: 'Journal — fourth trimester',
    src: '/images/photo-newborn.png',
    alt: 'A new parent holding a sleeping newborn at home in the fourth trimester.',
  },
  journal_heat: {
    key: 'journal_heat',
    label: 'Journal — rest in the heat',
    src: '/images/photo-garbh-rest.png',
    alt: 'A pregnant woman resting in a shaded courtyard.',
  },
  program_beej: {
    key: 'program_beej',
    label: 'Programme — Beej Sanskar cover',
    src: '/images/photo-planning.png',
    alt: 'A couple sitting together while preparing to conceive.',
  },
  program_womb: {
    key: 'program_womb',
    label: 'Programme — Womb Care cover',
    src: '/images/photo-garbh-rest.png',
    alt: 'A pregnant woman resting in a home courtyard with a hand on her belly.',
  },
  program_parenting: {
    key: 'program_parenting',
    label: 'Programme — Super Parenting cover',
    src: '/images/photo-chapter-parenting.png',
    alt: 'A parent with a toddler and a baby at home.',
  },
  tool_due: {
    key: 'tool_due',
    label: 'Tool — due date',
    src: '/images/photo-chapter-preparing.png',
    alt: 'A pregnant woman preparing at home before birth.',
  },
  tool_kicks: {
    key: 'tool_kicks',
    label: 'Tool — kick counter',
    src: '/images/photo-garbh-rest.png',
    alt: 'A pregnant woman resting with a hand on her belly.',
  },
  tool_contractions: {
    key: 'tool_contractions',
    label: 'Tool — contraction timer',
    src: '/images/photo-first-birth.png',
    alt: 'A couple packing a hospital bag together before first birth.',
  },
  tool_weight: {
    key: 'tool_weight',
    label: 'Tool — weight log',
    src: '/images/photo-planning.png',
    alt: 'A couple keeping pregnancy notes at the kitchen table.',
  },
  shop_journal: {
    key: 'shop_journal',
    label: 'Shop — pregnancy journal',
    src: '/images/photo-planning.png',
    alt: 'Pregnancy notes and a journal on a family table.',
  },
  shop_kitchen: {
    key: 'shop_kitchen',
    label: 'Shop — kitchen cards',
    src: '/images/photo-planning.png',
    alt: 'A kitchen table with fruit and pregnancy planning notes.',
  },
  community: {
    key: 'community',
    label: 'Community atmosphere',
    src: '/images/photo-chapter-connecting.png',
    alt: 'Mothers and babies sitting together in a bright community room.',
  },
  practice: {
    key: 'practice',
    label: 'Practice library',
    src: '/images/photo-garbh-rest.png',
    alt: 'Quiet Garbh Sanskar rest at home.',
  },
  faculty_seat: {
    key: 'faculty_seat',
    label: 'Faculty seat atmosphere',
    src: '/images/faculty-seat.png',
    alt: 'An empty consultation chair by a window — a faculty seat, not a verified portrait.',
  },
  chapter_learning: {
    key: 'chapter_learning',
    label: 'Chapter — learning a programme together',
    src: '/images/photo-chapter-learning.png',
    alt: 'A couple watching a wellness lesson together at home.',
  },
  chapter_preparing: {
    key: 'chapter_preparing',
    label: 'Chapter — preparing for birth',
    src: '/images/photo-first-birth.png',
    alt: 'A couple packing a small hospital bag at home.',
  },
}

export const MEDIA_ASSET_LIST = Object.values(DEFAULT_MEDIA_ASSETS)
