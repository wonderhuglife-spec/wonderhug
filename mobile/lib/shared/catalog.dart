class CatalogProduct {
  const CatalogProduct({
    required this.slug,
    required this.name,
    required this.nameTe,
    required this.pricePaise,
  });
  final String slug;
  final String name;
  final String nameTe;
  final int pricePaise;
}

const catalogProducts = [
  CatalogProduct(slug: 'garbh-sanskar-daily-pack', name: 'Garbh Sanskar daily pack', nameTe: 'గర్భ సంస్కార ప్యాక్', pricePaise: 49900),
  CatalogProduct(slug: 'pregnancy-journal', name: 'Pregnancy journal', nameTe: 'గర్భ జర్నల్', pricePaise: 29900),
  CatalogProduct(slug: 'couple-readiness-workbook', name: 'Couple workbook', nameTe: 'జంట వర్క్‌బుక్', pricePaise: 19900),
  CatalogProduct(slug: 'postpartum-rhythm-guide', name: 'Postpartum rhythm', nameTe: 'ప్రసవానంతర లయ', pricePaise: 24900),
];
