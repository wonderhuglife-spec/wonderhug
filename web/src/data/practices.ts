import { loc } from '@/lib/locale'
import type { Practice } from '@/types/domain'

export const PRACTICES: Practice[] = [
  {
    id: 'pr-morning-quiet',
    slug: 'morning-quiet',
    title: loc('Morning quiet (10 minutes)', 'ఉదయం నిశ్శబ్దం (10 నిమిషాలు)'),
    description: loc(
      'Sit, feel the breath, and place a hand on the belly if that is comfortable. No mantra required.',
      'కూర్చోండి, శ్వాసను గమనించండి. సౌకర్యంగా ఉంటే చేయి బొజ్జపై. మంత్రం తప్పనిసరి కాదు.',
    ),
    durationMinutes: 10,
    mediaType: 'guide',
    trimester: 'any',
  },
  {
    id: 'pr-nad',
    slug: 'evening-nada',
    title: loc('Evening nāda — one raga or lullaby', 'సాయంత్రం నాదం — ఒక రాగం లేదా జోల'),
    description: loc(
      'Play one piece of Carnatic or folk music you already love. Garbh Sanskar here means attention, not a playlist that claims IQ outcomes.',
      'మీకు ఇష్టమైన కర్ణాటక లేదా జానపద పాట ఒకటి. ఇక్కడ గర్భ సంస్కారం శ్రద్ధ — IQ హామీ కాదు.',
    ),
    durationMinutes: 15,
    mediaType: 'audio',
    trimester: 'any',
  },
  {
    id: 'pr-story',
    slug: 'story-to-the-womb',
    title: loc('A story to the womb', 'గర్భానికి ఒక కథ'),
    description: loc(
      'Read a short Telugu or English story aloud. Partners can take turns. Stop if you feel tired.',
      'చిన్న తెలుగు లేదా ఆంగ్ల కథ బిగ్గరగా చదవండి. జంటగా మార్చుకోవచ్చు. అలసితే ఆపండి.',
    ),
    durationMinutes: 12,
    mediaType: 'guide',
    trimester: '2',
  },
  {
    id: 'pr-walk',
    slug: 'twilight-walk',
    title: loc('Twilight walk', 'సంధ్యా నడక'),
    description: loc(
      'Ten to twenty minutes if your clinician has not restricted walking. Notice trees, not step-count trophies.',
      'వైద్యుడు నడకను నిషేధించకపోతే పది-ఇరవై నిమిషాలు. అడుగుల ట్రోఫీ కాదు.',
    ),
    durationMinutes: 20,
    mediaType: 'guide',
    trimester: '2',
  },
  {
    id: 'pr-oil',
    slug: 'warm-oil-rest',
    title: loc('Warm oil and rest', 'నూనె నిమర్లు మరియు విశ్రాంతి'),
    description: loc(
      'A cultural rest practice in many Telugu homes. Use oils you already trust; skip if your clinician has advised against massage.',
      'చాలా తెలుగు ఇళ్ల సాంప్రదాయం. మీరు నమ్మే నూనె; వైద్యుడు మసాజ్ వద్దంటే వదలండి.',
    ),
    durationMinutes: 20,
    mediaType: 'guide',
    trimester: '3',
  },
]
