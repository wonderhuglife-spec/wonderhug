import { loc } from '@/lib/locale'
import type { CommunityGroup, CommunityPost } from '@/types/domain'

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    id: 'grp-planning',
    slug: 'planning-pregnancy',
    name: loc('Planning pregnancy', 'గర్భ యోజన'),
    description: loc('A quiet room for couples preparing. Daily chat lives on WhatsApp.', 'యోజనలో ఉన్న జంటల నిశ్శబ్ద గది. రోజువారీ చాట్ WhatsAppలో.'),
    journeyStages: ['planning'],
  },
  {
    id: 'grp-ttc',
    slug: 'trying-to-conceive',
    name: loc('Trying to conceive', 'గర్భం కోసం ప్రయత్నం'),
    description: loc('Companionship for the wait. Clinic protocols stay with your clinic.', 'వేచి ఉండే సాంగత్యం. ప్రోటోకాల్స్ క్లినిక్‌వి.'),
    journeyStages: ['ttc'],
  },
  {
    id: 'grp-pregnancy',
    slug: 'pregnancy',
    name: loc('Pregnancy', 'గర్భం'),
    description: loc('Week-to-week threads with moderation.', 'పర్యవేక్షణతో వారపు చర్చ.'),
    journeyStages: ['pregnant', 'birth_prep'],
  },
  {
    id: 'grp-garbh',
    slug: 'garbh-sanskar',
    name: loc('Garbh Sanskar', 'గర్భ సంస్కారం'),
    description: loc('Practice questions, not outcome claims.', 'సాధన ప్రశ్నలు, ఫలిత హామీలు కావు.'),
    journeyStages: ['pregnant', 'planning'],
  },
  {
    id: 'grp-new',
    slug: 'new-parents',
    name: loc('New parents', 'కొత్త తల్లిదండ్రులు'),
    description: loc('Fourth-trimester company.', 'నాలుగవ త్రైమాసిక సాంగత్యం.'),
    journeyStages: ['new_parent'],
  },
  {
    id: 'grp-breastfeeding',
    slug: 'breastfeeding',
    name: loc('Breastfeeding', 'పాలివ్వడం'),
    description: loc('Peer support plus lactation faculty booking.', 'సాటి సహాయం మరియు లాక్టేషన్ బుకింగ్.'),
    journeyStages: ['new_parent'],
  },
  {
    id: 'grp-dev',
    slug: 'baby-development',
    name: loc('Baby development', 'బిడ్డ అభివృద్ధి'),
    description: loc('Ranges, not races.', 'పరిధులు, పరుగులు కావు.'),
    journeyStages: ['new_parent', 'parenting'],
  },
  {
    id: 'grp-parenting',
    slug: 'parenting',
    name: loc('Parenting', 'పెంపకం'),
    description: loc('Joint families, festivals, language.', 'ఉమ్మడి కుటుంబాలు, పండుగలు, భాష.'),
    journeyStages: ['parenting'],
  },
]

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    groupSlug: 'planning-pregnancy',
    title: loc('How we pace family conversations', 'కుటుంబ సంభాషణలు ఎలా నడపాలి'),
    body: loc(
      'WonderHug note: you do not owe anyone a timeline. If a relative asks every week, a single sentence — “we will share when there is news” — is enough. Clinical advice stays with your doctor.',
      'WonderHug గమనిక: టైమ్‌లైన్ ఎవరికీ బాకీ కాదు. ప్రతి వారం అడిగితే ఒక వాక్యం చాలు. వైద్య సలహా వైద్యునిది.',
    ),
    authorLabel: 'WonderHug care desk',
    isExpertAnswer: true,
    createdAt: '2026-07-02T09:00:00.000Z',
  },
  {
    id: 'p2',
    groupSlug: 'garbh-sanskar',
    title: loc('One raga is enough', 'ఒక రాగం చాలు'),
    body: loc(
      'You do not need a two-hour playlist. Fifteen minutes of music you already love, at a volume that lets you sleep, is a complete practice.',
      'రెండు గంటల ప్లేజాబితా అవసరం లేదు. మీకు ఇష్టమైన పదిహేను నిమిషాల సంగీతం పూర్తి సాధన.',
    ),
    authorLabel: 'Garbh Sanskar faculty',
    isExpertAnswer: true,
    createdAt: '2026-07-08T09:00:00.000Z',
  },
  {
    id: 'p3',
    groupSlug: 'pregnancy',
    title: loc('Heat, water, rest', 'వేడి, నీరు, విశ్రాంతి'),
    body: loc(
      'Telangana summer is a real pregnancy topic. Cotton, water, and permission to cancel a function are ordinary wisdom, not a medical protocol.',
      'తెలంగాణ వేసవి నిజమైన గర్భ అంశం. చాంది, నీరు, ఫంక్షన్ రద్దు — సాధారణ తెలివి, ప్రోటోకాల్ కాదు.',
    ),
    authorLabel: 'WonderHug care desk',
    isExpertAnswer: true,
    createdAt: '2026-07-18T09:00:00.000Z',
  },
]
