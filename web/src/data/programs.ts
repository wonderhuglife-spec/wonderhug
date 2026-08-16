import { loc } from '@/lib/locale'
import { DEFAULT_MEDIA_ASSETS } from '@/data/mediaAssets'
import type { Program, ProgramLesson, ProgramModule } from '@/types/domain'

const AUDIO = '/media/placeholder-ai-lesson.mp3'
const VIDEO = '/media/placeholder-ai-lesson.mp4'
const PACK = '/media/placeholder-ai-lesson.mp3'

function mod(id: string, order: number, titleEn: string, titleTe: string, bodyEn: string, bodyTe: string, quiz?: ProgramModule['quiz']): ProgramModule {
  return { id, displayOrder: order, title: loc(titleEn, titleTe), body: loc(bodyEn, bodyTe), quiz }
}

function lesson(
  id: string,
  slug: string,
  moduleId: string,
  order: number,
  kind: ProgramLesson['kind'],
  titleEn: string,
  titleTe: string,
  bodyEn: string,
  bodyTe: string,
  durationSeconds: number,
  mediaUrl: string | null = null,
): ProgramLesson {
  return {
    id,
    slug,
    moduleId,
    displayOrder: order,
    kind,
    title: loc(titleEn, titleTe),
    body: loc(bodyEn, bodyTe),
    mediaUrl,
    resourceUrl: kind === 'text' ? PACK : mediaUrl,
    durationSeconds,
  }
}

const quizRhythm: ProgramModule['quiz'] = {
  question: loc('A complete evening check-in is:', 'పూర్తి సాయంత్రం సంభాషణ:'),
  options: [
    loc('A scored fertility protocol', 'స్కోరు పెట్టే ఫర్టిలిటీ ప్రోటోకాల్'),
    loc('About ten unhurried minutes together', 'కలిసి పది నిమిషాలు, తొందర లేకుండా'),
    loc('A promise about the child’s future', 'బిడ్డ భవిష్యత్తు హామీ'),
  ],
  answerIndex: 1,
  explanation: loc('WonderHug programmes are wellness education. They do not score fertility or promise outcomes.', 'WonderHug వెల్నెస్ విద్య. ఫర్టిలిటీ స్కోరు లేదు, ఫలిత హామీ లేదు.'),
}

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
      'Beej Sanskar on WonderHug is a wellness programme. It does not treat infertility and does not quote success rates. You will receive weekly education, a practice pack, and WhatsApp prompts. Clinical tests stay with your doctor. Faculty for this seat is named after WonderHug verifies credentials.',
      'WonderHugలో బీజ సంస్కారం వెల్నెస్ కార్యక్రమం. వంధ్యత్వ చికిత్స కాదు, విజయ శాతాలు లేవు. వారపు విద్య, సాధన ప్యాక్, WhatsApp ప్రాంప్ట్‌లు. పరీక్షలు మీ వైద్యునితోనే.',
    ),
    pricePaise: 249900,
    durationWeeks: 4,
    level: 'beginner',
    coverImage: DEFAULT_MEDIA_ASSETS.program_beej.src,
    coverImageAlt: DEFAULT_MEDIA_ASSETS.program_beej.alt,
    instructorSlug: 'garbh-sanskar-guide',
    instructorName: 'Garbh Sanskar faculty',
    journeyStages: ['planning', 'ttc'],
    goals: ['couple', 'nutrition', 'garbh_sanskar'],
    modules: [
      mod('beej-m1', 1, 'Week 1 — Shared rhythm', 'వారం 1 — ఉమ్మడి లయ', 'Sleep, screens and a 10-minute evening check-in.', 'నిద్ర, స్క్రీన్లు, పది నిమిషాల సాయంత్రం సంభాషణ.', quizRhythm),
      mod('beej-m2', 2, 'Week 2 — Kitchen', 'వారం 2 — వంటిల్లు', 'Seasonal plates and what belongs with a dietitian.', 'కాలానుగుణ భోజనం; డైటీషియన్‌కు ఏది చెందుతుంది.'),
      mod('beej-m3', 3, 'Week 3 — Couple readiness', 'వారం 3 — జంట సిద్ధత', 'Family pressure, leave, and money without score-keeping.', 'కుటుంబ ఒత్తిడి, సెలవు, డబ్బు — స్కోరు లేకుండా.'),
      mod(
        'beej-m4',
        4,
        'Week 4 — Quiet practice',
        'వారం 4 — నిశ్శబ్ద సాధన',
        'A simple mantra or song if it is part of your home, or silence if it is not.',
        'మీ ఇంటి భాగమైతే మంత్రం లేదా పాట; కాకపోతే నిశ్శబ్దం.',
      ),
    ],
    lessons: [
      lesson('beej-l1', 'week-1-shared-rhythm', 'beej-m1', 1, 'video', 'Evening check-in', 'సాయంత్రం సంభాషణ', 'A short video on how to keep ten minutes without turning it into a performance.', 'పది నిమిషాలు ప్రదర్శన కాకుండా ఉంచడం.', 360, VIDEO),
      lesson('beej-l2', 'week-1-sleep', 'beej-m1', 2, 'text', 'Sleep and screens', 'నిద్ర, స్క్రీన్లు', 'Write down a lights-out window you can both keep on work nights. This is not a medical sleep protocol.', 'పని రాత్రులకు ఇద్దరూ పాటించగల వెలుతురు ఆపే సమయం రాయండి.', 480),
      lesson('beej-l3', 'week-2-kitchen', 'beej-m2', 1, 'audio', 'Kitchen conversation', 'వంటిల్లు సంభాషణ', 'Audio: seasonal plates as culture. Clinical diets stay with a licensed dietitian.', 'ఆడియో: కాలానుగుణ భోజనం సంస్కృతి. క్లినికల్ డైట్ డైటీషియన్‌ది.', 540, AUDIO),
      lesson('beej-l4', 'week-3-readiness', 'beej-m3', 1, 'text', 'Leave, money, relatives', 'సెలవు, డబ్బు, బంధువులు', 'A worksheet: what you will say, and what you will not score.', 'వర్క్‌షీట్: ఏమి చెబుతారు, ఏమి స్కోరు పెట్టరు.', 600),
      lesson('beej-l5', 'week-4-quiet', 'beej-m4', 1, 'audio', 'Quiet practice', 'నిశ్శబ్ద సాధన', 'Optional song or silence. Neither produces a guaranteed child.', 'పాట లేదా నిశ్శబ్దం. ఏదీ హామీ బిడ్డను ఇవ్వదు.', 600, AUDIO),
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
      'Womb Care follows your week when you share a due date. It never replaces antenatal visits. Garbh Sanskar is hosted as practice, not as a promise about the child’s future. Named faculty publishes after verification.',
      'గడువు తేదీ ఇస్తే వూంబ్ కేర్ మీ వారాన్ని అనుసరిస్తుంది. ఆంటినేటల్ సందర్శనలకు ప్రత్యామ్నాయం కాదు. గర్భ సంస్కారం సాధనగా — బిడ్డ భవిష్యత్తు హామీగా కాదు.',
    ),
    pricePaise: 499900,
    durationWeeks: 12,
    level: 'all',
    coverImage: DEFAULT_MEDIA_ASSETS.program_womb.src,
    coverImageAlt: DEFAULT_MEDIA_ASSETS.program_womb.alt,
    instructorSlug: 'garbh-sanskar-guide',
    instructorName: 'Garbh Sanskar faculty',
    journeyStages: ['pregnant', 'birth_prep'],
    goals: ['garbh_sanskar', 'prepare_birth', 'reduce_anxiety'],
    modules: [
      mod(
        'womb-m1',
        1,
        'Settling the first trimester',
        'మొదటి త్రైమాసికం',
        'Rest, nausea conversations, and when to call your clinician.',
        'విశ్రాంతి, వికారం, వైద్యునికి ఎప్పుడు కాల్ చేయాలి.',
        {
          question: loc('If you cannot keep fluids down, you should:', 'ద్రవాలు నిలవకపోతే:'),
          options: [
            loc('Only wait for the next programme video', 'తదుపరి వీడియో కోసం వేచి ఉండండి'),
            loc('Contact your clinician — this programme is not a clinic', 'వైద్యునికి సంప్రదించండి — ఈ కార్యక్రమం క్లినిక్ కాదు'),
            loc('Increase mantra length', 'మంత్రం పొడవు పెంచండి'),
          ],
          answerIndex: 1,
          explanation: loc('WonderHug does not treat dehydration or diagnose pregnancy complications.', 'WonderHug నిర్జలీకరణ చికిత్స లేదా సమస్యల నిర్ధారణ చేయదు.'),
        },
      ),
      mod('womb-m2', 2, 'Middle months practice', 'మధ్య నెలల సాధన', 'Music, storytelling, and walks that fit a working day.', 'పని రోజుకు సరిపోయే సంగీతం, కథలు, నడకలు.'),
      mod('womb-m3', 3, 'Birth preferences', 'ప్రసవ ప్రాధాన్యతలు', 'A worksheet to take to your hospital — not a legal plan.', 'ఆసుపత్రికి తీసుకెళ్లే వర్క్‌షీట్ — చట్టపరమైన ప్లాన్ కాదు.'),
    ],
    lessons: [
      lesson('womb-l1', 'first-trimester-rest', 'womb-m1', 1, 'video', 'Rest without apology', 'క్షమాపణ లేని విశ్రాంతి', 'Video: how to name rest to a joint family without turning it into a debate.', 'వీడియో: ఉమ్మడి కుటుంబంలో విశ్రాంతిని చెప్పడం.', 420, VIDEO),
      lesson('womb-l2', 'when-to-call', 'womb-m1', 2, 'text', 'When this is not the right room', 'ఇది సరైన గది కానప్పుడు', 'Bleeding, fainting, and fluids you cannot keep down belong with a clinician.', 'రక్తస్రావం, తల తిరగడం, ద్రవాలు నిలవకపోవడం వైద్యునివి.', 300),
      lesson('womb-l3', 'middle-nada', 'womb-m2', 1, 'audio', 'Nāda for a working day', 'పని రోజు నాదం', 'Ten minutes of sound or silence. Not a developmental guarantee.', 'పది నిమిషాల సవ్వడి లేదా నిశ్శబ్దం. అభివృద్ధి హామీ కాదు.', 600, AUDIO),
      lesson('womb-l4', 'birth-worksheet', 'womb-m3', 1, 'text', 'Birth preference worksheet', 'ప్రసవ ప్రాధాన్యతలు', 'Print and take to your hospital. This is not a legal birth plan.', 'ముద్రించి ఆసుపత్రికి తీసుకెళ్లండి. చట్టపరమైన ప్లాన్ కాదు.', 480, PACK),
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
      'Super Parenting is a six-week companion after birth. Emergency symptoms are always off-platform. Lactation and paediatric decisions belong with verified professionals. Named faculty publishes after verification.',
      'సూపర్ పేరెంటింగ్ ప్రసవం తర్వాత ఆరు వారాల సహచరి. అత్యవసర లక్షణాలు ప్లాట్‌ఫారమ్ బయటనే. పాలు మరియు శిశువైద్యం నిపుణులతో.',
    ),
    pricePaise: 349900,
    durationWeeks: 6,
    level: 'beginner',
    coverImage: DEFAULT_MEDIA_ASSETS.program_parenting.src,
    coverImageAlt: DEFAULT_MEDIA_ASSETS.program_parenting.alt,
    instructorSlug: 'parenting-faculty',
    instructorName: 'Parenting faculty',
    journeyStages: ['new_parent', 'parenting'],
    goals: ['postpartum_recovery', 'reduce_anxiety'],
    modules: [
      mod('super-m1', 1, 'The first 14 days', 'మొదటి 14 రోజులు', 'Rest, visitors, and what is urgent.', 'విశ్రాంతి, సందర్శకులు, అత్యవసరం ఏమిటి.'),
      mod('super-m2', 2, 'Feeding questions', 'పాల ప్రశ్నలు', 'How to brief a lactation consultant — not a feeding protocol.', 'లాక్టేషన్ కన్సల్టెంట్‌కు ఎలా చెప్పాలి — ప్రోటోకాల్ కాదు.'),
      mod('super-m3', 3, 'Joint-family parenting', 'ఉమ్మడి కుటుంబ పెంపకం', 'Language, grandparents, and limits without a fight.', 'భాష, తాతమామలు, గొడవ లేని పరిమితులు.', {
        question: loc('A feeding protocol on this programme would be:', 'ఇక్కడ పాల ప్రోటోకాల్:'),
        options: [
          loc('Outside our scope — brief a professional instead', 'మా పరిధి బయట — నిపుణుడికి చెప్పండి'),
          loc('A guaranteed supply plan', 'హామీ సరఫరా ప్రణాళిక'),
          loc('A replacement for paediatric care', 'శిశువైద్యానికి ప్రత్యామ్నాయం'),
        ],
        answerIndex: 0,
        explanation: loc('WonderHug hosts questions and rest, not clinical feeding plans.', 'WonderHug ప్రశ్నలు, విశ్రాంతి — క్లినికల్ పాల ప్రణాళిక కాదు.'),
      }),
    ],
    lessons: [
      lesson('super-l1', 'first-14-days', 'super-m1', 1, 'video', 'Visitors and rest', 'సందర్శకులు, విశ్రాంతి', 'Video: closing the door without a speech.', 'వీడియో: ప్రసంగం లేకుండా తలుపు మూయడం.', 400, VIDEO),
      lesson('super-l2', 'urgent-signs', 'super-m1', 2, 'text', 'What is urgent', 'అత్యవసరం ఏమిటి', 'Heavy bleeding, fever, thoughts of harm: hospital, not the lesson player.', 'అధిక రక్తస్రావం, జ్వరం, హాని ఆలోచనలు: ఆసుపత్రి.', 240),
      lesson('super-l3', 'brief-lactation', 'super-m2', 1, 'audio', 'Briefing a consultant', 'కన్సల్టెంట్‌కు చెప్పడం', 'Audio: what to write down before a lactation visit.', 'ఆడియో: లాక్టేషన్ సందర్శనకు ముందు ఏమి రాయాలి.', 480, AUDIO),
      lesson('super-l4', 'joint-family', 'super-m3', 1, 'text', 'Limits without a fight', 'గొడవ లేని పరిమితులు', 'Language for grandparents that does not script a confrontation.', 'తాతమామల కోసం భాష — గొడవ స్క్రిప్ట్ కాదు.', 540),
    ],
    isPublished: true,
  },
]

export function programBySlug(slug: string) {
  return PROGRAMS.find((item) => item.slug === slug && item.isPublished)
}

export function lessonBySlug(program: Program, lessonSlug: string) {
  return program.lessons.find((item) => item.slug === lessonSlug)
}
