import { loc } from '@/lib/locale'
import type { HubPageContent } from '@/types/domain'

function hub(
  path: string,
  kicker: [string, string],
  title: [string, string],
  intro: [string, string],
  sections: [[string, string], [string, string]][],
  related: { href: string; label: [string, string] }[],
  seo: [string, string],
): HubPageContent {
  return {
    path,
    kicker: loc(kicker[0], kicker[1]),
    title: loc(title[0], title[1]),
    intro: loc(intro[0], intro[1]),
    seoTitle: loc(seo[0], title[1]),
    seoDescription: loc(intro[0].slice(0, 150), intro[1].slice(0, 150)),
    sections: sections.map(([h, b]) => ({ heading: loc(h[0], h[1]), body: loc(b[0], b[1]) })),
    related: related.map((r) => ({ href: r.href, label: loc(r.label[0], r.label[1]) })),
  }
}

export const HUB_PAGES: HubPageContent[] = [
  hub(
    '/pregnancy',
    ['Pregnancy', 'గర్భం'],
    ['Pregnancy with WonderHug', 'WonderHugతో గర్భం'],
    [
      'A companion for antenatal months in Telugu-speaking homes: week guides, Garbh Sanskar as practice, and birth preparation without scare stories.',
      'తెలుగు ఇళ్ల గర్భకాల సహచరి: వారపు గైడ్‌లు, సాధనగా గర్భ సంస్కారం, భయం లేని ప్రసవ సిద్ధత.',
    ],
    [
      [['What you will find', 'ఏమి ఉంటుంది'], ['Week-by-week notes, trimester maps, and tools. Education is labelled. Diagnosis stays with your clinician.', 'వారపు గమనికలు, త్రైమాసిక పటాలు, పనిముట్లు. నిర్ధారణ వైద్యునిది.']],
      [['What we will not do', 'ఏమి చేయము'], ['We will not predict labour, interpret scans, or claim rituals produce a particular child.', 'ప్రసవం ఊహించము, స్కాన్లు విశ్లేషించము, ఆచారాలు బిడ్డను తయారు చేస్తాయని చెప్పము.']],
    ],
    [
      { href: '/pregnancy/week-by-week', label: ['Week-by-week', 'వారం వారం'] },
      { href: '/garbh-sanskar', label: ['Garbh Sanskar', 'గర్భ సంస్కారం'] },
      { href: '/pregnancy/birth-preparation', label: ['Birth preparation', 'ప్రసవ సిద్ధత'] },
    ],
    ['Pregnancy guidance | WonderHug.Life', 'గర్భ మార్గదర్శకం'],
  ),
  hub(
    '/pregnancy/week-by-week',
    ['Pregnancy', 'గర్భం'],
    ['Week-by-week pregnancy notes', 'వారం వారం గర్భ గమనికలు'],
    [
      'Forty weeks of educational notes written for Indian calendars. Each week is unique. None of them replace an antenatal visit.',
      'భారతీయ క్యాలెండర్‌కు నలభై వారాల విద్యా గమనికలు. ప్రతి వారం వేరు. ఏదీ ఆంటినేటల్ సందర్శనకు ప్రత్యామ్నాయం కాదు.',
    ],
    [[['How to use this', 'ఎలా వాడాలి'], ['Open your week. If you do not know it, use the due-date tool. Bring unusual symptoms to a clinician the same day.', 'మీ వారం తెరవండి. తెలియకపోతే గడువు టూల్. అసాధారణ లక్షణాలు అదే రోజు వైద్యునికి.']]],
    [{ href: '/tools/due-date', label: ['Due date calculator', 'గడువు లెక్క'] }],
    ['Pregnancy week by week | WonderHug.Life', 'వారం వారం గర్భం'],
  ),
  hub(
    '/pregnancy/trimester',
    ['Pregnancy', 'గర్భం'],
    ['Pregnancy by trimester', 'త్రైమాసికాలుగా గర్భం'],
    [
      'First trimester often asks for rest. Second for rhythm. Third for logistics. Your body may ignore the textbook.',
      'మొదటిది విశ్రాంతి, రెండవది లయ, మూడవది లాజిస్టిక్స్. మీ శరీరం పుస్తకాన్ని పట్టించుకోకపోవచ్చు.',
    ],
    [[['A map', 'పటం'], ['Use trimester pages as orientation, then jump into the week that matches your due date.', 'త్రైమాసికం దిశ, తర్వాత మీ గడువు వారం.']]],
    [{ href: '/pregnancy/week-by-week', label: ['Weeks', 'వారాలు'] }],
    ['Pregnancy trimesters | WonderHug.Life', 'త్రైమాసికాలు'],
  ),
  hub(
    '/pregnancy/birth-preparation',
    ['Birth', 'ప్రసవం'],
    ['Birth preparation without scare stories', 'భయం లేని ప్రసవ సిద్ధత'],
    [
      'Preferences, a bag, a support person, and the contraction timer as a notebook. Hospitals decide medically.',
      'ప్రాధాన్యతలు, సంచి, తోడు, టైమర్ నోటుబుక్. వైద్య నిర్ణయాలు ఆసుపత్రివి.',
    ],
    [[['Worksheet', 'వర్క్‌షీట్'], ['Language you want to labour in, who may enter the room, and skin-to-skin hopes. Not a legal document.', 'ఏ భాషలో ప్రసవం, గదిలోకి ఎవరు, స్పర్శ ఆశలు. చట్టపత్రం కాదు.']]],
    [
      { href: '/tools/contractions', label: ['Contraction timer', 'సంకోచ టైమర్'] },
      { href: '/programs/womb-care', label: ['Womb Care programme', 'వూంబ్ కేర్'] },
    ],
    ['Birth preparation | WonderHug.Life', 'ప్రసవ సిద్ధత'],
  ),
  hub(
    '/garbh-sanskar',
    ['Garbh Sanskar', 'గర్భ సంస్కారం'],
    ['Garbh Sanskar as practice, not promise', 'హామీ కాకుండా సాధనగా గర్భ సంస్కారం'],
    [
      'Music, stories, rest and ritual have a long place in Telugu homes. WonderHug hosts them as daily practice. We do not claim IQ, looks, or temperament outcomes.',
      'సంగీతం, కథలు, విశ్రాంతి, ఆచారం తెలుగు ఇళ్లలో ఉన్నాయి. రోజువారీ సాధనగా ఇస్తాం. IQ, రూపం, స్వభావ హామీలు ఇవ్వము.',
    ],
    [
      [['The library', 'లైబ్రరీ'], ['Short sessions you can finish on a working day. Audio, when we host files, will be clearly labelled.', 'పని రోజున పూర్తయ్యే చిన్న సెషన్లు.']],
      [['Science beside tradition', 'సంప్రదాయం పక్కన శాస్త్రం'], ['Antenatal care is modern and clinical. Garbh Sanskar does not replace scans, vaccines, or medicines your doctor prescribes.', 'ఆంటినేటల్ కేర్ వైద్యం. స్కాన్లు, టీకాలు, మందులకు గర్భ సంస్కారం ప్రత్యామ్నాయం కాదు.']],
    ],
    [
      { href: '/practices', label: ['Practice library', 'సాధన లైబ్రరీ'] },
      { href: '/shop/garbh-sanskar-daily-pack', label: ['Daily pack', 'రోజువారీ ప్యాక్'] },
    ],
    ['Garbh Sanskar | WonderHug.Life', 'గర్భ సంస్కారం'],
  ),
  hub(
    '/pregnancy-planning',
    ['Planning', 'యోజన'],
    ['Pregnancy planning', 'గర్భ యోజన'],
    [
      'Before a test is positive: couple readiness, kitchen conversations, and Beej Sanskar as wellness — not an infertility clinic.',
      'టెస్ట్ పాజిటివ్ కాకముందు: జంట సిద్ధత, వంటింటి సంభాషణలు, వెల్నెస్‌గా బీజ సంస్కారం — వంధ్యత్వ క్లినిక్ కాదు.',
    ],
    [[['Start here', 'ఇక్కడ మొదలు'], ['Pick a journey stage, open the couple workbook, and decide what ready means in your home.', 'దశ ఎంచుకోండి, వర్క్‌బుక్ తెరవండి, మీ ఇంట్లో రెడీ అంటే ఏమిటో నిర్ణయించండి.']]],
    [
      { href: '/pregnancy-planning/nutrition', label: ['Nutrition', 'పోషకాహారం'] },
      { href: '/pregnancy-planning/lifestyle', label: ['Lifestyle', 'జీవనశైలి'] },
      { href: '/pregnancy-planning/couple-readiness', label: ['Couple readiness', 'జంట సిద్ధత'] },
      { href: '/programs/beej-sanskar', label: ['Beej Sanskar programme', 'బీజ సంస్కారం'] },
    ],
    ['Pregnancy planning | WonderHug.Life', 'గర్భ యోజన'],
  ),
  hub(
    '/pregnancy-planning/nutrition',
    ['Nutrition', 'పోషకాహారం'],
    ['Kitchen while planning', 'యోజనలో వంటిల్లు'],
    [
      'Seasonal Andhra and Telangana plates as culture. Not a therapeutic diet for PCOS, thyroid, or diabetes — those need a qualified professional.',
      'కాలానుగుణ ఆంధ్ర, తెలంగాణ భోజనం సంస్కృతి. PCOS/థైరాయిడ్ డైట్ కాదు.',
    ],
    [[['Education', 'విద్య'], ['Regular meals, hydration in the heat, and iron-rich foods you already cook. Reports belong with a clinician.', 'క్రమం, వేడిలో నీరు, మీరు వండే ఇనుము ఆహారం.']]],
    [{ href: '/shop/sattvic-kitchen-cards', label: ['Kitchen cards', 'వంటింటి కార్డులు'] }],
    ['Planning nutrition | WonderHug.Life', 'యోజన పోషకాహారం'],
  ),
  hub(
    '/pregnancy-planning/lifestyle',
    ['Lifestyle', 'జీవనశైలి'],
    ['Lifestyle and movement', 'జీవనశైలి మరియు కదలిక'],
    [
      'Sleep, walks, and fertility-support yoga as wellbeing. WonderHug does not attach pregnancy-success rates to exercise.',
      'నిద్ర, నడకలు, యోగా వెల్నెస్. వ్యాయామానికి గర్భ విజయ శాతాలు అంటించము.',
    ],
    [[['Limits', 'పరిమితులు'], ['Stop for pain or dizziness. Follow any activity restriction from your clinician.', 'నొప్పి, తలతిరగడం అయితే ఆపండి.']]],
    [{ href: '/practices', label: ['Practices', 'సాధనలు'] }],
    ['Planning lifestyle | WonderHug.Life', 'యోజన జీవనశైలి'],
  ),
  hub(
    '/pregnancy-planning/couple-readiness',
    ['Couple', 'జంట'],
    ['Couple readiness', 'జంట సిద్ధత'],
    [
      'Money, in-laws, leave and fear — without a passing grade. Written for Telugu-speaking households.',
      'డబ్బు, అత్తమామలు, సెలవు, భయం — పాస్ మార్కులు లేవు.',
    ],
    [[['Practice', 'సాధన'], ['Use the workbook. If talk becomes stuck, counsellor seats can be booked via WhatsApp when named professionals are listed.', 'వర్క్‌బుక్ వాడండి. నిలిచిపోతే WhatsApp ద్వారా కౌన్సెలర్ సీటు.']]],
    [{ href: '/shop/couple-readiness-workbook', label: ['Workbook', 'వర్క్‌బుక్'] }],
    ['Couple readiness | WonderHug.Life', 'జంట సిద్ధత'],
  ),
  hub(
    '/parenting',
    ['Parenting', 'పెంపకం'],
    ['Conscious parenting', 'స్పృహతో పెంపకం'],
    [
      'Attention and respect in Indian family contexts — language, festivals, grandparents. Not a branded method and not a promise about the child.',
      'భాష, పండుగలు, తాతమామలు. బ్రాండెడ్ పద్ధతి కాదు, బిడ్డ హామీ కాదు.',
    ],
    [[['Everyday', 'రోజువారీ'], ['Limits without shouting matches. Stories without ranking babies.', 'అరుపులు లేని పరిమితులు. పోటీ లేని కథలు.']]],
    [
      { href: '/parenting/newborn', label: ['Newborn', 'నవజాత'] },
      { href: '/parenting/baby-development', label: ['Development', 'అభివృద్ధి'] },
      { href: '/mental-wellness', label: ['Mental wellness', 'మానసిక వెల్నెస్'] },
    ],
    ['Parenting | WonderHug.Life', 'పెంపకం'],
  ),
  hub(
    '/parenting/newborn',
    ['Newborn', 'నవజాత'],
    ['Newborn days', 'నవజాత రోజులు'],
    [
      'Feeding, visitors, and rest. Breathing difficulty, poor feeding, or fever in a young infant needs in-person care immediately.',
      'పాలు, అతిథులు, విశ్రాంతి. శ్వాస కష్టం, తక్కువ పాలు, జ్వరం వెంటనే వైద్యం.',
    ],
    [[['Fourth trimester', 'నాలుగవ త్రైమాసికం'], ['You are still on a journey. Super Parenting is the structured programme if you want company.', 'మీరింకా ప్రయాణంలోనే. సాంగత్యం కావాలంటే సూపర్ పేరెంటింగ్.']]],
    [
      { href: '/programs/super-parenting', label: ['Super Parenting', 'సూపర్ పేరెంటింగ్'] },
      { href: '/shop/postpartum-rhythm-guide', label: ['Rhythm guide', 'లయ గైడ్'] },
    ],
    ['Newborn | WonderHug.Life', 'నవజాత'],
  ),
  hub(
    '/parenting/baby-development',
    ['Development', 'అభివృద్ధి'],
    ['Baby development ranges', 'బిడ్డ అభివృద్ధి పరిధులు'],
    [
      'Milestones are ranges, not races. Worry belongs with a paediatrician, not a comment thread.',
      'మైలురాళ్లు పరిధులు, పరుగులు కావు. ఆందోళన పీడియాట్రిషియన్‌ది.',
    ],
    [[['What we publish', 'మేము ప్రచురించేది'], ['Questions to take to a visit. Not a ranking of Telugu babies against Instagram.', 'సందర్శనకు ప్రశ్నలు. ఇన్‌స్టాగ్రామ్ పోటీ కాదు.']]],
    [{ href: '/parenting', label: ['Parenting', 'పెంపకం'] }],
    ['Baby development | WonderHug.Life', 'బిడ్డ అభివృద్ధి'],
  ),
  hub(
    '/mental-wellness',
    ['Mental wellness', 'మానసిక వెల్నెస్'],
    ['Emotional wellbeing on the journey', 'ప్రయాణంలో మానసిక వెల్నెస్'],
    [
      'Anxiety, grief after loss, and the loneliness of a joint family can all appear. WonderHug offers education and counsellor booking via WhatsApp — not emergency psychiatry.',
      'ఆందోళన, నష్టం, ఒంటరితనం. విద్య మరియు WhatsApp బుకింగ్ — అత్యవసర మానసిక చికిత్స కాదు.',
    ],
    [[['If you are not safe', 'సురక్షితం కాకపోతే'], ['If you may harm yourself or the baby, contact local emergency services and a clinician immediately.', 'మీకు లేదా బిడ్డకు హాని అయితే వెంటనే అత్యవసర సేవలు.']]],
    [{ href: '/experts', label: ['Counsellor seat', 'కౌన్సెలర్ సీటు'] }],
    ['Mental wellness | WonderHug.Life', 'మానసిక వెల్నెస్'],
  ),
  hub(
    '/postpartum',
    ['Postpartum', 'ప్రసవానంతరం'],
    ['Postpartum recovery', 'ప్రసవానంతర కోలుకోవడం'],
    [
      'The fourth trimester is still WonderHug’s job: rest, feeding pointers, and visitor boundaries for Indian homes.',
      'నాలుగవ త్రైమాసికం ఇంకా మా పని: విశ్రాంతి, పాలు, అతిథుల పరిమితులు.',
    ],
    [[['Bleeding and mood', 'రక్తం మరియు మనసు'], ['Heavy bleeding, fever, or mood that makes the home unsafe is clinical and urgent.', 'ఎక్కువ రక్తం, జ్వరం, అసురక్షిత మనసు — అత్యవసర వైద్యం.']]],
    [{ href: '/parenting/newborn', label: ['Newborn hub', 'నవజాత'] }],
    ['Postpartum | WonderHug.Life', 'ప్రసవానంతరం'],
  ),
]

export function hubByPath(path: string): HubPageContent | undefined {
  return HUB_PAGES.find((item) => item.path === path)
}
