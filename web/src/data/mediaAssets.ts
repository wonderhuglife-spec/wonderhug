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

/** Family photographs matched to pregnancy, birth prep, and parenting — tagged so CMS can swap official assets. */
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
    src: '/images/placeholder-ai-journal-planning.png',
    alt: 'A couple planning pregnancy together over chai and a notebook at the kitchen table.',
  },
  journal_garbh: {
    key: 'journal_garbh',
    label: 'Journal — Garbh Sanskar',
    src: '/images/placeholder-ai-journal-garbh.png',
    alt: 'A pregnant woman resting by a window with music and a lamp for Garbh Sanskar practice.',
  },
  journal_postpartum: {
    key: 'journal_postpartum',
    label: 'Journal — fourth trimester',
    src: '/images/placeholder-ai-journal-postpartum.png',
    alt: 'A new parent holding a sleeping newborn at home in the fourth trimester.',
  },
  journal_heat: {
    key: 'journal_heat',
    label: 'Journal — rest in the heat',
    src: '/images/placeholder-ai-journal-heat.png',
    alt: 'A pregnant woman resting in a shaded courtyard with water nearby.',
  },
  program_beej: {
    key: 'program_beej',
    label: 'Programme — Beej Sanskar cover',
    src: '/images/placeholder-ai-program-beej.png',
    alt: 'A couple sitting together with flowers and fruit while preparing to conceive.',
  },
  program_womb: {
    key: 'program_womb',
    label: 'Programme — Womb Care cover',
    src: '/images/placeholder-ai-program-womb.png',
    alt: 'A pregnant woman resting in a home courtyard with a hand on her belly.',
  },
  program_parenting: {
    key: 'program_parenting',
    label: 'Programme — Super Parenting cover',
    src: '/images/placeholder-ai-program-parenting.png',
    alt: 'A parent playing on the floor with a toddler while a baby rests nearby.',
  },
  tool_due: {
    key: 'tool_due',
    label: 'Tool — due date',
    src: '/images/placeholder-ai-tool-due.png',
    alt: 'A family calendar and pregnancy journal used to estimate a due date.',
  },
  tool_kicks: {
    key: 'tool_kicks',
    label: 'Tool — kick counter',
    src: '/images/placeholder-ai-tool-kicks.png',
    alt: 'A pregnant parent’s hands resting on their belly while counting baby movements.',
  },
  tool_contractions: {
    key: 'tool_contractions',
    label: 'Tool — contraction timer',
    src: '/images/placeholder-ai-tool-contractions.png',
    alt: 'A couple preparing for birth with a clock and notebook beside the bed.',
  },
  tool_weight: {
    key: 'tool_weight',
    label: 'Tool — weight log',
    src: '/images/placeholder-ai-tool-weight.png',
    alt: 'Home kitchen food for pregnancy, with a small notebook for a private weight log.',
  },
  shop_journal: {
    key: 'shop_journal',
    label: 'Shop — pregnancy journal',
    src: '/images/placeholder-ai-shop-journal.png',
    alt: 'A printable pregnancy journal on a desk beside a family calendar.',
  },
  shop_kitchen: {
    key: 'shop_kitchen',
    label: 'Shop — kitchen cards',
    src: '/images/placeholder-ai-shop-kitchen.png',
    alt: 'A home kitchen plate and kitchen cards for pregnancy meals.',
  },
  community: {
    key: 'community',
    label: 'Community atmosphere',
    src: '/images/placeholder-ai-community.png',
    alt: 'Mothers and babies sitting together in a bright community room.',
  },
  practice: {
    key: 'practice',
    label: 'Practice library',
    src: '/images/placeholder-ai-practice.png',
    alt: 'Quiet Garbh Sanskar rest with music, oil, and a lamp at home.',
  },
  faculty_seat: {
    key: 'faculty_seat',
    label: 'Faculty seat atmosphere',
    src: '/images/placeholder-ai-faculty-seat.png',
    alt: 'An empty consultation chair by a window — a faculty seat, not a verified portrait.',
  },
}

export const MEDIA_ASSET_LIST = Object.values(DEFAULT_MEDIA_ASSETS)
