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
