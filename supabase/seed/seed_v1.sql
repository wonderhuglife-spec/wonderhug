-- Seed commerce + CMS keys for local development

insert into public.products (slug, name, name_te, description, price_paise, category, journey_stages, goals, is_digital, is_published)
values
  ('garbh-sanskar-daily-pack', 'Garbh Sanskar daily practice pack', 'గర్భ సంస్కార ప్యాక్', '28-day audio and journaling sequence.', 49900, 'digital', '{pregnant,planning}', '{garbh_sanskar}', true, true),
  ('pregnancy-journal', 'Printable pregnancy journal', 'గర్భ జర్నల్', 'Weekly pages for mood and questions.', 29900, 'digital', '{pregnant}', '{reduce_anxiety}', true, true),
  ('couple-readiness-workbook', 'Couple readiness workbook', 'జంట వర్క్‌బుక్', 'Conversation prompts for Telugu households.', 19900, 'digital', '{planning,ttc}', '{couple}', true, true)
on conflict (slug) do nothing;

insert into public.programs (slug, name, name_te, summary, description, price_paise, duration_weeks, journey_stages, goals, is_published)
values
  ('beej-sanskar', 'Beej Sanskar programme', 'బీజ సంస్కారం', 'Four weeks for couples preparing.', 'Wellness, not an infertility clinic.', 249900, 4, '{planning,ttc}', '{couple,nutrition}', true),
  ('womb-care', 'Womb Care programme', 'వూంబ్ కేర్', 'Trimester-aware education.', 'Garbh Sanskar as practice, not a promise.', 499900, 12, '{pregnant,birth_prep}', '{garbh_sanskar,prepare_birth}', true),
  ('super-parenting', 'Super Parenting programme', 'సూపర్ పేరెంటింగ్', 'Fourth trimester companion.', 'Recovery and feeding pointers.', 349900, 6, '{new_parent,parenting}', '{postpartum_recovery}', true)
on conflict (slug) do nothing;
