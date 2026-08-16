-- Development seed only. Do not treat as real clinicians or testimonials.
-- Experts remain unlisted (is_listed = false) so they are not publicly readable via RLS.

insert into public.community_groups (slug, name, description, is_published)
values
  ('planning-pregnancy', 'Planning Pregnancy', 'A quiet room for couples preparing.', true),
  ('trying-to-conceive', 'Trying to Conceive', 'Companionship for the wait.', true),
  ('pregnancy', 'Pregnancy', 'Week-to-week conversation with moderation.', true),
  ('new-parents', 'New Parents', 'Fourth-trimester company.', true),
  ('breastfeeding', 'Breastfeeding', 'Peer support plus pointers to lactation experts.', true),
  ('baby-development', 'Baby Development', 'Milestones discussed as ranges, not races.', true),
  ('parenting', 'Parenting', 'Conscious parenting in Indian family contexts.', true)
on conflict (slug) do nothing;
