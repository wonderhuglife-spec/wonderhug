import { loc } from '@/lib/locale'
import type { Program } from '@/types/domain'

export const PROGRAMS: Program[] = [
  {
    id: 'prog-beej',
    slug: 'beej-sanskar',
    name: loc('Beej Sanskar programme', 'బీజ సంస్కార కార్యక్రమం'),
    summary: loc(
      'Four weeks for couples preparing for conception: rhythm, nutrition conversations, and gentle Garbh Sanskar-adjacent practices.',
      'గర్భానికి సిద్ధమవుతున్న జంటలకు నాలుగు వారాలు: లయ, పోషకాహార సంభాషణలు, మృదువైన సాధన.',
    ),
    description: loc(
      'Beej Sanskar on WonderHug is a wellness programme. It does not treat infertility and does not quote success rates. You will receive weekly live education (when scheduled), a practice pack, and WhatsApp prompts. Clinical tests stay with your doctor.',
      'WonderHugలో బీజ సంస్కారం వెల్నెస్ కార్యక్రమం. వంధ్యత్వ చికిత్స కాదు, విజయ శాతాలు లేవు. వారపు విద్య, సాధన ప్యాక్, WhatsApp ప్రాంప్ట్‌లు. పరీక్షలు మీ వైద్యునితోనే.',
    ),
    pricePaise: 249900,
    durationWeeks: 4,
    journeyStages: ['planning', 'ttc'],
    goals: ['couple', 'nutrition', 'garbh_sanskar'],
    modules: [
      {
        title: loc('Week 1 — Shared rhythm', 'వారం 1 — ఉమ్మడి లయ'),
        body: loc('Sleep, screens and a 10-minute evening check-in.', 'నిద్ర, స్క్రీన్లు, పది నిమిషాల సాయంత్రం సంభాషణ.'),
      },
      {
        title: loc('Week 2 — Kitchen', 'వారం 2 — వంటిల్లు'),
        body: loc('Seasonal plates and what belongs with a dietitian.', 'కాలానుగుణ భోజనం; డైటీషియన్‌కు ఏది చెందుతుంది.'),
      },
      {
        title: loc('Week 3 — Couple readiness', 'వారం 3 — జంట సిద్ధత'),
        body: loc('Family pressure, leave, and money without score-keeping.', 'కుటుంబ ఒత్తిడి, సెలవు, డబ్బు — స్కోరు లేకుండా.'),
      },
      {
        title: loc('Week 4 — Quiet practice', 'వారం 4 — నిశ్శబ్ద సాధన'),
        body: loc('A simple mantra or song if it is part of your home, or silence if it is not.', 'మీ ఇంటి భాగమైతే మంత్రం లేదా పాట; కాకపోతే నిశ్శబ్దం.'),
      },
    ],
    isPublished: true,
  },
  {
    id: 'prog-womb',
    slug: 'womb-care',
    name: loc('Womb Care programme', 'వూంబ్ కేర్ కార్యక్రమం'),
    summary: loc(
      'Trimester-aware education, Garbh Sanskar practice, and birth-preference conversations across pregnancy.',
      'గర్భకాలం అంతా త్రైమాసిక విద్య, గర్భ సంస్కార సాధన, ప్రసవ ప్రాధాన్యతలు.',
    ),
    description: loc(
      'Womb Care follows your week when you share a due date. It never replaces antenatal visits. Garbh Sanskar is hosted as practice, not as a promise about the child’s future.',
      'గడువు తేదీ ఇస్తే వూంబ్ కేర్ మీ వారాన్ని అనుసరిస్తుంది. ఆంటినేటల్ సందర్శనలకు ప్రత్యామ్నాయం కాదు. గర్భ సంస్కారం సాధనగా — బిడ్డ భవిష్యత్తు హామీగా కాదు.',
    ),
    pricePaise: 499900,
    durationWeeks: 12,
    journeyStages: ['pregnant', 'birth_prep'],
    goals: ['garbh_sanskar', 'prepare_birth', 'reduce_anxiety'],
    modules: [
      {
        title: loc('Settling the first trimester', 'మొదటి త్రైమాసికం'),
        body: loc('Rest, nausea conversations, and when to call your clinician.', 'విశ్రాంతి, వికారం, వైద్యునికి ఎప్పుడు కాల్ చేయాలి.'),
      },
      {
        title: loc('Middle months practice', 'మధ్య నెలల సాధన'),
        body: loc('Music, storytelling, and walks that fit a working day.', 'పని రోజుకు సరిపోయే సంగీతం, కథలు, నడకలు.'),
      },
      {
        title: loc('Birth preferences', 'ప్రసవ ప్రాధాన్యతలు'),
        body: loc('A worksheet to take to your hospital — not a legal plan.', 'ఆసుపత్రికి తీసుకెళ్లే వర్క్‌షీట్ — చట్టపరమైన ప్లాన్ కాదు.'),
      },
    ],
    isPublished: true,
  },
  {
    id: 'prog-super',
    slug: 'super-parenting',
    name: loc('Super Parenting programme', 'సూపర్ పేరెంటింగ్ కార్యక్రమం'),
    summary: loc(
      'Postpartum recovery, feeding support pointers, and early parenting in joint families.',
      'ప్రసవానంతర కోలుకోవడం, పాలివ్వడం, ఉమ్మడి కుటుంబాల్లో మొదటి పెంపకం.',
    ),
    description: loc(
      'Super Parenting is a six-week companion after birth. Emergency symptoms are always off-platform. Lactation and paediatric decisions belong with verified professionals.',
      'సూపర్ పేరెంటింగ్ ప్రసవం తర్వాత ఆరు వారాల సహచరి. అత్యవసర లక్షణాలు ప్లాట్‌ఫారమ్ బయటనే. పాలు మరియు శిశువైద్యం నిపుణులతో.',
    ),
    pricePaise: 349900,
    durationWeeks: 6,
    journeyStages: ['new_parent', 'parenting'],
    goals: ['postpartum_recovery', 'reduce_anxiety'],
    modules: [
      {
        title: loc('The first 14 days', 'మొదటి 14 రోజులు'),
        body: loc('Rest, visitors, and what is urgent.', 'విశ్రాంతి, సందర్శకులు, అత్యవసరం ఏమిటి.'),
      },
      {
        title: loc('Feeding questions', 'పాల ప్రశ్నలు'),
        body: loc('How to brief a lactation consultant — not a feeding protocol.', 'లాక్టేషన్ కన్సల్టెంట్‌కు ఎలా చెప్పాలి — ప్రోటోకాల్ కాదు.'),
      },
      {
        title: loc('Joint-family parenting', 'ఉమ్మడి కుటుంబ పెంపకం'),
        body: loc('Language, grandparents, and limits without a fight.', 'భాష, తాతమామలు, గొడవ లేని పరిమితులు.'),
      },
    ],
    isPublished: true,
  },
]
