class CatalogProduct {
  const CatalogProduct({
    required this.slug,
    required this.name,
    required this.nameTe,
    required this.description,
    required this.descriptionTe,
    required this.pricePaise,
  });
  final String slug;
  final String name;
  final String nameTe;
  final String description;
  final String descriptionTe;
  final int pricePaise;
}

const catalogProducts = [
  CatalogProduct(
    slug: 'garbh-sanskar-daily-pack',
    name: 'Garbh Sanskar daily pack',
    nameTe: 'గర్భ సంస్కార ప్యాక్',
    description: '28-day audio and journaling sequence. Cultural practice, not a developmental guarantee.',
    descriptionTe: '28 రోజుల ఆడియో మరియు జర్నల్. సాంస్కృతిక సాధన.',
    pricePaise: 49900,
  ),
  CatalogProduct(
    slug: 'pregnancy-journal',
    name: 'Pregnancy journal',
    nameTe: 'గర్భ జర్నల్',
    description: 'Weekly pages for mood, food and clinician questions. PDF for home printing.',
    descriptionTe: 'మూడ్, ఆహారం, ప్రశ్నలు. ఇంట్లో ముద్రించే PDF.',
    pricePaise: 29900,
  ),
  CatalogProduct(
    slug: 'couple-readiness-workbook',
    name: 'Couple workbook',
    nameTe: 'జంట వర్క్‌బుక్',
    description: 'A short couple workbook for planning pregnancy together.',
    descriptionTe: 'కలిసి యోజన చేసే చిన్న వర్క్‌బుక్.',
    pricePaise: 19900,
  ),
  CatalogProduct(
    slug: 'postpartum-rhythm-guide',
    name: 'Postpartum rhythm',
    nameTe: 'ప్రసవానంతర లయ',
    description: 'Fourth-trimester rest, visitors and feeding pointers.',
    descriptionTe: 'నాలుగవ త్రైమాసికం: విశ్రాంతి, అతిథులు, పాలు.',
    pricePaise: 24900,
  ),
];

class CatalogLesson {
  const CatalogLesson({
    required this.slug,
    required this.title,
    required this.titleTe,
    required this.kind,
    required this.body,
    required this.mediaUrl,
  });
  final String slug;
  final String title;
  final String titleTe;
  final String kind;
  final String body;
  final String mediaUrl;
}

class CatalogProgram {
  const CatalogProgram({
    required this.slug,
    required this.name,
    required this.nameTe,
    required this.summary,
    required this.pricePaise,
    required this.lessons,
  });
  final String slug;
  final String name;
  final String nameTe;
  final String summary;
  final int pricePaise;
  final List<CatalogLesson> lessons;
}

const catalogPrograms = [
  CatalogProgram(
    slug: 'beej-sanskar',
    name: 'Beej Sanskar programme',
    nameTe: 'బీజ సంస్కార కార్యక్రమం',
    summary: 'Four weeks for couples preparing for conception.',
    pricePaise: 249900,
    lessons: [
      CatalogLesson(
        slug: 'week-1-shared-rhythm',
        title: 'Evening check-in',
        titleTe: 'సాయంత్రం సంభాషణ',
        kind: 'video',
        body: 'Ten unhurried minutes. Not a fertility score.',
        mediaUrl: 'https://wonderhug.life/media/placeholder-ai-lesson.mp4',
      ),
      CatalogLesson(
        slug: 'week-2-kitchen',
        title: 'Kitchen conversation',
        titleTe: 'వంటిల్లు సంభాషణ',
        kind: 'audio',
        body: 'Seasonal plates as culture.',
        mediaUrl: 'https://wonderhug.life/media/placeholder-ai-lesson.mp3',
      ),
    ],
  ),
  CatalogProgram(
    slug: 'womb-care',
    name: 'Womb Care programme',
    nameTe: 'వూంబ్ కేర్ కార్యక్రమం',
    summary: 'Trimester-aware education and Garbh Sanskar practice.',
    pricePaise: 499900,
    lessons: [
      CatalogLesson(
        slug: 'first-trimester-rest',
        title: 'Rest without apology',
        titleTe: 'క్షమాపణ లేని విశ్రాంతి',
        kind: 'video',
        body: 'Rest is allowed. This is not a clinic.',
        mediaUrl: 'https://wonderhug.life/media/placeholder-ai-lesson.mp4',
      ),
    ],
  ),
  CatalogProgram(
    slug: 'super-parenting',
    name: 'Super Parenting programme',
    nameTe: 'సూపర్ పేరెంటింగ్ కార్యక్రమం',
    summary: 'Postpartum recovery and joint-family parenting.',
    pricePaise: 349900,
    lessons: [
      CatalogLesson(
        slug: 'first-14-days',
        title: 'Visitors and rest',
        titleTe: 'సందర్శకులు, విశ్రాంతి',
        kind: 'video',
        body: 'Closing the door without a speech.',
        mediaUrl: 'https://wonderhug.life/media/placeholder-ai-lesson.mp4',
      ),
    ],
  ),
];
