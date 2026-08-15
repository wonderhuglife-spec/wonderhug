import type { HubPageContent } from '@/types/domain'

export const HUB_PAGES: HubPageContent[] = [
  {
    path: '/pregnancy',
    title: 'Pregnancy',
    seoTitle: 'Pregnancy guidance | WonderHug.Life',
    seoDescription:
      'Educational pregnancy support from WonderHug.Life — week hubs, Garbh Sanskar as practice, and birth preparation without fear.',
    kicker: 'Pregnancy',
    intro:
      'A companion for the months of pregnancy: practical education, cultural practices offered without guarantees, and pointers to clinicians when care decisions arise.',
    sections: [
      {
        heading: 'What you will find',
        body: 'Week-by-week and trimester hubs, birth-preparation worksheets, and articles that distinguish education from personal medical advice.',
      },
      {
        heading: 'What we will not do',
        body: 'We will not diagnose symptoms, predict labour, or claim that any ritual or diet produces a particular baby.',
      },
    ],
    related: [
      { label: 'Week-by-week hub', href: '/pregnancy/week-by-week' },
      { label: 'Trimester overview', href: '/pregnancy/trimester' },
      { label: 'Birth preparation', href: '/pregnancy/birth-preparation' },
    ],
  },
  {
    path: '/pregnancy/week-by-week',
    title: 'Week-by-week pregnancy',
    seoTitle: 'Pregnancy week by week | WonderHug.Life',
    seoDescription: 'A hub for WonderHug week-by-week pregnancy education. Individual weeks publish after review.',
    kicker: 'Pregnancy',
    intro:
      'Forty thin pages would not help anyone. This hub will grow into reviewed weekly notes. Until those notes exist, use it as an orientation — not a complete medical timeline.',
    sections: [
      {
        heading: 'How weeks will work',
        body: 'Each published week will name its author, reviewer and last-reviewed date. Unpublished weeks stay off the sitemap.',
      },
    ],
    related: [
      { label: 'Pregnancy hub', href: '/pregnancy' },
      { label: 'Trimester overview', href: '/pregnancy/trimester' },
    ],
  },
  {
    path: '/pregnancy/trimester',
    title: 'Pregnancy by trimester',
    seoTitle: 'Pregnancy trimesters | WonderHug.Life',
    seoDescription: 'Educational overview of pregnancy trimesters from WonderHug.Life.',
    kicker: 'Pregnancy',
    intro:
      'Trimesters are a common way to organise questions. Energy, appetite and anxiety shift. WonderHug will keep trimester writing general and clinician-aligned.',
    sections: [
      {
        heading: 'A map, not a rulebook',
        body: 'Your pregnancy may not match a textbook trimester story. Bring unusual symptoms to your care team.',
      },
    ],
    related: [
      { label: 'Pregnancy hub', href: '/pregnancy' },
      { label: 'Week-by-week hub', href: '/pregnancy/week-by-week' },
    ],
  },
  {
    path: '/pregnancy/birth-preparation',
    title: 'Birth preparation',
    seoTitle: 'Birth preparation | WonderHug.Life',
    seoDescription: 'Calm birth-preparation education from WonderHug.Life — preferences, support and recovery.',
    kicker: 'Pregnancy',
    intro:
      'Preparing for birth can mean packing a bag, naming a support person, and talking through preferences. It does not require consuming frightening content.',
    sections: [
      {
        heading: 'Preferences worksheet',
        body: 'Use our worksheet as a conversation with your hospital or midwife. It is not a legal birth plan and does not guarantee a particular delivery.',
      },
    ],
    related: [
      { label: 'Tools', href: '/tools' },
      { label: 'Pregnancy hub', href: '/pregnancy' },
    ],
  },
  {
    path: '/pregnancy-planning',
    title: 'Pregnancy planning',
    seoTitle: 'Pregnancy planning | WonderHug.Life',
    seoDescription: 'Pregnancy planning education from WonderHug.Life — nutrition, lifestyle and couple readiness.',
    kicker: 'Pregnancy planning',
    intro:
      'Before conception, WonderHug offers planning activities, fertility-support education and couple practices. None of this is a fertility clinic.',
    sections: [
      {
        heading: 'Start here',
        body: 'Choose a journey stage, skim the planning checklist, and decide together what “ready” means in your home — not on a timeline set by relatives.',
      },
    ],
    related: [
      { label: 'Nutrition', href: '/pregnancy-planning/nutrition' },
      { label: 'Lifestyle', href: '/pregnancy-planning/lifestyle' },
      { label: 'Couple readiness', href: '/pregnancy-planning/couple-readiness' },
    ],
  },
  {
    path: '/pregnancy-planning/nutrition',
    title: 'Nutrition while planning',
    seoTitle: 'Pregnancy planning nutrition | WonderHug.Life',
    seoDescription: 'General nutrition education for pregnancy planning. Not a personal diet prescription.',
    kicker: 'Pregnancy planning',
    intro:
      'Kitchen habits matter to how people feel. WonderHug’s nutrition writing is general education for Indian households — not a therapeutic diet for PCOS, thyroid, or other conditions.',
    sections: [
      {
        heading: 'Education, not a meal chart',
        body: 'If you have a diagnosed condition, nutrition belongs with a qualified professional who has your reports.',
      },
    ],
    related: [{ label: 'Pregnancy planning', href: '/pregnancy-planning' }],
  },
  {
    path: '/pregnancy-planning/lifestyle',
    title: 'Lifestyle and movement',
    seoTitle: 'Pregnancy planning lifestyle | WonderHug.Life',
    seoDescription: 'Lifestyle and fertility-support yoga education from WonderHug.Life.',
    kicker: 'Pregnancy planning',
    intro:
      'Sleep, walks and fertility-support yoga are offered as wellbeing practices. WonderHug does not attach pregnancy-success rates to exercise.',
    sections: [
      {
        heading: 'Move within your own limits',
        body: 'Stop and speak to a clinician if movement causes pain, dizziness, or if you have been advised to restrict activity.',
      },
    ],
    related: [{ label: 'Pregnancy planning', href: '/pregnancy-planning' }],
  },
  {
    path: '/pregnancy-planning/couple-readiness',
    title: 'Couple readiness',
    seoTitle: 'Couple readiness | WonderHug.Life',
    seoDescription: 'Conversation prompts for couples planning pregnancy, from WonderHug.Life.',
    kicker: 'Pregnancy planning',
    intro:
      'Readiness is emotional as much as practical. These prompts help partners talk about money, in-laws, leave and fear — without assigning blame.',
    sections: [
      {
        heading: 'A practice, not a score',
        body: 'There is no passing grade. If conversations become stuck or painful, counsellor support may help — when verified professionals are listed.',
      },
    ],
    related: [{ label: 'Pregnancy planning', href: '/pregnancy-planning' }],
  },
  {
    path: '/parenting',
    title: 'Parenting',
    seoTitle: 'Conscious parenting | WonderHug.Life',
    seoDescription: 'Parenting guidance from WonderHug.Life for newborn days through growing children.',
    kicker: 'Parenting',
    intro:
      'Conscious parenting on WonderHug means attention and respect — not a branded method, and not a promise that your child will turn out a certain way.',
    sections: [
      {
        heading: 'Everyday, not performative',
        body: 'We will write about language, limits, festivals and family complexity in Indian homes.',
      },
    ],
    related: [
      { label: 'Newborn', href: '/parenting/newborn' },
      { label: 'Baby development', href: '/parenting/baby-development' },
    ],
  },
  {
    path: '/parenting/newborn',
    title: 'Newborn days',
    seoTitle: 'Newborn parenting | WonderHug.Life',
    seoDescription: 'Educational orientation for newborn care from WonderHug.Life.',
    kicker: 'Parenting',
    intro:
      'The first weeks are often about feeding, sleep fragments and visitors. WonderHug’s newborn hub stays modest: what to ask, where to get help, how to protect rest.',
    sections: [
      {
        heading: 'Urgent care is off-site',
        body: 'Breathing difficulty, poor feeding, fever in a young infant, or a parent who cannot stay safe needs in-person care immediately.',
      },
    ],
    related: [{ label: 'Parenting', href: '/parenting' }],
  },
  {
    path: '/parenting/baby-development',
    title: 'Baby development',
    seoTitle: 'Baby development | WonderHug.Life',
    seoDescription: 'Development ranges and questions — not milestone races — from WonderHug.Life.',
    kicker: 'Parenting',
    intro:
      'Development happens in ranges. WonderHug will not rank babies. Use this hub to learn which questions to take to a pediatrician.',
    sections: [
      {
        heading: 'Ranges, not races',
        body: 'If something worries you, a pediatric visit is the right next step — not a comment thread.',
      },
    ],
    related: [{ label: 'Parenting', href: '/parenting' }],
  },
]

export function hubByPath(path: string): HubPageContent | undefined {
  return HUB_PAGES.find((hub) => hub.path === path)
}
