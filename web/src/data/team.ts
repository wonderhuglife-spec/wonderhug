import { loc } from '@/lib/locale'

export interface TeamMember {
  id: string
  name: string
  role: { en: string; te: string }
  description: { en: string; te: string }
  portrait: string
}

export const TEAM: TeamMember[] = [
  {
    id: 'team-founding',
    name: 'WonderHug founding team',
    role: loc('Founding & product', 'స్థాపన మరియు ప్రోడక్ట్'),
    description: loc(
      'The people shipping website, app and WhatsApp operations. Official names and portraits appear when WonderHug provides brand photography.',
      'వెబ్, యాప్, WhatsApp నడిపేవారు. అధికారిక పేర్లు, ఫోటోలు బ్రాండ్ ఫోటోగ్రఫీ వచ్చినప్పుడు.',
    ),
    portrait: '/images/portrait-placeholder.svg',
  },
  {
    id: 'team-clinical',
    name: 'Clinical advisory',
    role: loc('External clinical review', 'బాహ్య వైద్య సమీక్ష'),
    description: loc(
      'Articles can name a reviewer when one is assigned. Until named clinicians are verified, faculty seats book through the WhatsApp desk.',
      'సమీక్షకుడు ఉన్నప్పుడు వ్యాసాలు పేరు పెడతాయి. అప్పటి వరకు WhatsApp డెస్క్.',
    ),
    portrait: '/images/portrait-placeholder.svg',
  },
  {
    id: 'team-community',
    name: 'Community & AiSensy desk',
    role: loc('WhatsApp community of 50,000+ mothers', '50,000+ తల్లుల WhatsApp సమూహం'),
    description: loc(
      'Moderation and daily prompts run through AiSensy. This is the living community; website rooms are the quieter archive.',
      'పర్యవేక్షణ AiSensy ద్వారా. సజీవ సమూహం ఇది; వెబ్ గదులు నిశ్శబ్ద ఆర్కైవ్.',
    ),
    portrait: '/images/portrait-placeholder.svg',
  },
  {
    id: 'team-content',
    name: 'Editorial',
    role: loc('Education & Telugu voice', 'విద్య మరియు తెలుగు స్వరం'),
    description: loc(
      'Bilingual education that distinguishes practice from diagnosis. Named editors publish with the logo pack.',
      'సాధనను నిర్ధారణ నుంచి వేరు చేసే ద్విభాషా విద్య.',
    ),
    portrait: '/images/portrait-placeholder.svg',
  },
]
